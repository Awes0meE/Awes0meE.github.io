#include "../Inc/svc_ui.h"

#include "../../BSP_drivers/Inc/bsp_encoder.h"
#include "../../BSP_drivers/Inc/bsp_key.h"
#include "../../BSP_drivers/Inc/bsp_oled.h"
#include "../Inc/svc_control.h"
#include "../Inc/svc_sensor.h"

typedef enum
{
    UI_PAGE_CTRL = 0,
    UI_PAGE_TEMP
} ui_page_t;

typedef enum
{
    UI_SEL_PWM = 0,
    UI_SEL_EEV
} ui_sel_t;

static ui_page_t s_page = UI_PAGE_CTRL;
static ui_sel_t s_sel = UI_SEL_PWM;

static char* buf_put_char(char *dst, char *end, char ch)
{
    if (dst < end)
    {
        *dst++ = ch;
    }
    return dst;
}

static char* buf_put_str(char *dst, char *end, const char *src)
{
    while ((*src != '\0') && (dst < end))
    {
        *dst++ = *src++;
    }
    return dst;
}

static char* buf_put_u32(char *dst, char *end, uint32_t value)
{
    char tmp[10];
    uint32_t idx = 0U;

    do
    {
        tmp[idx++] = (char)('0' + (value % 10U));
        value /= 10U;
    } while ((value > 0U) && (idx < (sizeof(tmp) / sizeof(tmp[0]))));

    while ((idx > 0U) && (dst < end))
    {
        *dst++ = tmp[--idx];
    }

    return dst;
}

static void buf_terminate(char *buf, int len, char *dst)
{
    if (len <= 0)
    {
        return;
    }

    if (dst >= (buf + len))
    {
        buf[len - 1] = '\0';
    }
    else
    {
        *dst = '\0';
    }
}

static void fmt_1dp(char *buf, int len, float v)
{
    int neg = 0;
    char *dst = buf;
    char *end;
    int scaled;
    int ip;
    int fp;

    if (len <= 0)
    {
        return;
    }

    end = buf + len - 1;

    if (v < 0.0f)
    {
        neg = 1;
        v = -v;
    }

    scaled = (int)(v * 10.0f + 0.5f);
    ip = scaled / 10;
    fp = scaled % 10;

    if (neg)
    {
        dst = buf_put_char(dst, end, '-');
    }

    dst = buf_put_u32(dst, end, (uint32_t)ip);
    dst = buf_put_char(dst, end, '.');
    dst = buf_put_char(dst, end, (char)('0' + fp));
    buf_terminate(buf, len, dst);
}

static void build_ctrl_line0(char *buf, int len, uint8_t run_enable)
{
    char *dst = buf;
    char *end;

    if (len <= 0)
    {
        return;
    }

    end = buf + len - 1;
    dst = buf_put_str(dst, end, "CTRL ");
    dst = buf_put_str(dst, end, run_enable ? "RUN" : "STOP");
    buf_terminate(buf, len, dst);
}

static void build_rpm_line(char *buf, int len, uint32_t rpm)
{
    char *dst = buf;
    char *end;

    if (len <= 0)
    {
        return;
    }

    end = buf + len - 1;
    dst = buf_put_str(dst, end, "RPM:");
    dst = buf_put_u32(dst, end, rpm);
    buf_terminate(buf, len, dst);
}

static void build_value_line(char *buf, int len, char prefix, const char *label, const char *value, char suffix)
{
    char *dst = buf;
    char *end;

    if (len <= 0)
    {
        return;
    }

    end = buf + len - 1;
    dst = buf_put_char(dst, end, prefix);
    dst = buf_put_str(dst, end, label);
    dst = buf_put_str(dst, end, value);
    if (suffix != '\0')
    {
        dst = buf_put_char(dst, end, suffix);
    }
    buf_terminate(buf, len, dst);
}

void SVC_UI_Init(void)
{
    s_page = UI_PAGE_CTRL;
    s_sel = UI_SEL_PWM;
}

void SVC_UI_Task10ms(void)
{
    bsp_key_evt_t evt = BSP_Key_Scan10ms();
    int16_t enc_delta = BSP_Encoder_GetDetentDelta();

    if (evt == BSP_KEY_EVT_LONG)
    {
        s_page = (s_page == UI_PAGE_CTRL) ? UI_PAGE_TEMP : UI_PAGE_CTRL;
    }
    else if (evt == BSP_KEY_EVT_SHORT)
    {
        if (s_page == UI_PAGE_CTRL)
        {
            s_sel = (s_sel == UI_SEL_PWM) ? UI_SEL_EEV : UI_SEL_PWM;
        }
    }

    if (!SVC_Control_IsEEVHomed()) return;
    if (s_page != UI_PAGE_CTRL) return;
    if (enc_delta == 0) return;

    if (s_sel == UI_SEL_PWM)
    {
        SVC_Control_AdjustCompDutyPct((float)enc_delta * 1.0f);
    }
    else
    {
        /* 1 detent = 1 pulse = 0.2% */
        SVC_Control_AdjustEEVPulse(enc_delta);
    }
}

void SVC_UI_Task500ms(void)
{
    char l0[24] = {0};
    char l1[24] = {0};
    char l2[24] = {0};
    char l3[24] = {0};

    char s1[12];
    char s2[12];
    char s3[12];

    if (!SVC_Control_IsEEVHomed())
    {
        BSP_OLED_Draw4Lines("INIT", "EEV HOMING", "WAIT", "");
        return;
    }

    if (s_page == UI_PAGE_CTRL)
    {
        build_ctrl_line0(l0, sizeof(l0), SVC_Control_GetCompRunEnable());
        build_rpm_line(l1, sizeof(l1), SVC_Control_GetCompRPM());

        fmt_1dp(s1, sizeof(s1), SVC_Control_GetCompDutyPct());
        fmt_1dp(s2, sizeof(s2), SVC_Control_GetEEVOpenPct());

        build_value_line(l2, sizeof(l2), (s_sel == UI_SEL_PWM) ? '>' : ' ', "PWM:", s1, '%');
        build_value_line(l3, sizeof(l3), (s_sel == UI_SEL_EEV) ? '>' : ' ', "EEV:", s2, '%');
    }
    else
    {
        build_value_line(l0, sizeof(l0), 'T', "EMP", "", '\0');

        if (SVC_Sensor_GetDHTOk())
        {
            fmt_1dp(s1, sizeof(s1), SVC_Sensor_GetDHTTemp());
            build_value_line(l1, sizeof(l1), 'D', "HT:", s1, 'C');
        }
        else
        {
            build_value_line(l1, sizeof(l1), 'D', "HT:", "--.-", 'C');
        }

        fmt_1dp(s2, sizeof(s2), SVC_Sensor_GetNTC1Temp());
        fmt_1dp(s3, sizeof(s3), SVC_Sensor_GetNTC2Temp());

        build_value_line(l2, sizeof(l2), 'N', "1 :", s2, 'C');
        build_value_line(l3, sizeof(l3), 'N', "2 :", s3, 'C');
    }

    BSP_OLED_Draw4Lines(l0, l1, l2, l3);
}
