# Local Font Assets

This directory keeps self-hosted display fonts and their license records. Barlow Condensed is used by shared English display surfaces. `/notes` uses a deliberately small ZCOOL QingKe HuangYou subset for Chinese headings and note titles; body text continues to use the system UI stack.

## ZCOOL QingKe HuangYou Notes subset

- Upstream project: `https://github.com/googlefonts/zcool-qingke-huangyou`
- License: SIL Open Font License 1.1, preserved in `OFL-ZCOOL-QingKe-HuangYou.txt`
- Runtime asset: `ZCOOLQingKeHuangYou-NotesSubset.woff2`
- Exact source text for the subset: `ZCOOLQingKeHuangYou-NotesSubset.txt`

When a new public note title needs a glyph that is absent from the subset, obtain `ZCOOLQingKeHuangYou-Regular.ttf` from the official upstream repository outside this checkout, record the upstream revision in `docs/session-log.md`, and run the following commands from `app/fonts/`. Do not commit the full upstream TTF. FontTools and Brotli are maintenance-only prerequisites and are not application runtime dependencies:

```bash
python -m pip install fonttools brotli
ZCOOL_SOURCE_TTF=/absolute/path/to/ZCOOLQingKeHuangYou-Regular.ttf
test -f "$ZCOOL_SOURCE_TTF"
pyftsubset "$ZCOOL_SOURCE_TTF" \
  --text-file=ZCOOLQingKeHuangYou-NotesSubset.txt \
  --output-file=ZCOOLQingKeHuangYou-NotesSubset.woff2 \
  --flavor=woff2 \
  --layout-features='*' \
  --no-hinting \
  --desubroutinize
```

Run `npm run lint`, `npm run typecheck`, and a bilingual `/notes` browser pass after regeneration. Check every changed Chinese title at mobile and desktop widths before replacing the committed subset.
