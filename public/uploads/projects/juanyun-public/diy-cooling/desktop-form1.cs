using System;
using System.IO.Ports;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using System.Windows.Forms;
using LibreHardwareMonitor.Hardware;

namespace CPUwenduhuoqu
{
    public partial class Form1 : Form
    {
        private SerialPort serialPort;
        private int timerCounter = 0;
        private float? cpuTemperature = null;
        private float? gpuTemperature = null;
        private System.Windows.Forms.Timer updateTimer;

        public Form1()
        {
            InitializeComponent();
        }

        public class UpdateVisitor : IVisitor
        {
            public void VisitComputer(IComputer computer) => computer.Traverse(this);

            public void VisitHardware(IHardware hardware)
            {
                hardware.Update();
                foreach (IHardware subHardware in hardware.SubHardware)
                {
                    subHardware.Accept(this);
                }
            }

            public void VisitSensor(ISensor sensor) { }
            public void VisitParameter(IParameter parameter) { }
        }

        private void Monitor()
        {
            try
            {
                Computer computer = new Computer
                {
                    IsCpuEnabled = true,
                    IsGpuEnabled = true
                };

                computer.Open();
                computer.Accept(new UpdateVisitor());

                foreach (IHardware hardware in computer.Hardware)
                {
                    foreach (ISensor sensor in hardware.Sensors)
                    {
                        if (sensor.SensorType == SensorType.Temperature)
                        {
                            if (hardware.HardwareType == HardwareType.Cpu)
                            {
                                cpuTemperature = sensor.Value.HasValue ? (float?)Math.Round(sensor.Value.Value, 1) : (float?)null;
                                cpuTempLabel.Invoke(new Action(() => cpuTempLabel.Text = $"CPU Temp: {cpuTemperature} °C"));
                            }
                            else if (hardware.HardwareType == HardwareType.GpuAmd || hardware.HardwareType == HardwareType.GpuNvidia)
                            {
                                gpuTemperature = sensor.Value.HasValue ? (float?)Math.Round(sensor.Value.Value, 1) : (float?)null;
                                gpuTempLabel.Invoke(new Action(() => gpuTempLabel.Text = $"GPU Temp: {gpuTemperature} °C"));
                            }
                        }
                    }
                }

                computer.Close();
            }
            catch (Exception ex)
            {
                // Log or handle the error
                Console.WriteLine($"Error in Monitor: {ex.Message}");
            }
        }

        private void SendDataToSerialPort(string data)
        {
            try
            {
                if (serialPort != null && serialPort.IsOpen)
                {
                    serialPort.WriteLine(data);
                }
            }
            catch (Exception ex)
            {
                // Log or handle the error
                Console.WriteLine($"Error sending data to serial port: {ex.Message}");
                // Optionally, try to reconnect or notify the user
            }
        }

        private void Form1_Load(object sender, EventArgs e)
        {
            updateTimer = new System.Windows.Forms.Timer
            {
                Interval = 5000 // 5 seconds
            };
            updateTimer.Tick += new EventHandler(UpdateTimer_Tick);
            updateTimer.Start();

            RefreshSerialPorts();
        }

        private void UpdateTimer_Tick(object sender, EventArgs e)
        {
            Task.Run(() => Monitor());

            Task.Run(() =>
            {
                if (timerCounter % 2 == 0)
                {
                    // Send CPU temperature
                    if (cpuTemperature.HasValue)
                    {
                        SendDataToSerialPort($"CPU{cpuTemperature.Value.ToString("F1")}");
                    }
                }
                else
                {
                    // Send GPU temperature
                    if (gpuTemperature.HasValue)
                    {
                        SendDataToSerialPort($"GPU{gpuTemperature.Value.ToString("F1")}");
                    }
                }

                timerCounter++;
            });
        }

        private void RefreshSerialPorts()
        {
            comboBoxSerialPorts.Items.Clear();
            comboBoxSerialPorts.Items.AddRange(SerialPort.GetPortNames());
        }

        private void buttonConnect_Click(object sender, EventArgs e)
        {
            if (serialPort != null && serialPort.IsOpen)
            {
                serialPort.Close();
            }

            if (comboBoxSerialPorts.SelectedItem != null)
            {
                serialPort = new SerialPort(comboBoxSerialPorts.SelectedItem.ToString())
                {
                    BaudRate = 115200
                };

                try
                {
                    serialPort.Open();
                    labelConnectionStatus.Text = "Connected";
                }
                catch (Exception ex)
                {
                    MessageBox.Show($"Error: {ex.Message}");
                    labelConnectionStatus.Text = "Disconnected";
                }
            }
        }
    }
}
