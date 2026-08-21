# Local Font Assets

This directory keeps self-hosted display fonts and their license records. Barlow Condensed is used by shared English display surfaces. Chinese `/notes` headings and note titles now use the explicit shared CJK system stack used by Media title surfaces; body text continues to use the system UI stack.

## Archived ZCOOL QingKe HuangYou Notes subset

- Upstream project: `https://github.com/googlefonts/zcool-qingke-huangyou`
- License: SIL Open Font License 1.1, preserved in `OFL-ZCOOL-QingKe-HuangYou.txt`
- Former runtime asset: `ZCOOLQingKeHuangYou-NotesSubset.woff2`
- Exact source text for the subset: `ZCOOLQingKeHuangYou-NotesSubset.txt`

These files preserve the provenance of the earlier `v0.9.0` Notes treatment and are not loaded by the current runtime. The historical regeneration procedure is retained below only for reproducing that design; new note titles do not require subset maintenance. To reproduce it, obtain `ZCOOLQingKeHuangYou-Regular.ttf` from the official upstream repository outside this checkout, record the upstream revision in `docs/session-log.md`, and run the following commands from `app/fonts/`. Do not commit the full upstream TTF. FontTools and Brotli are maintenance-only prerequisites and are not application runtime dependencies:

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

If the historical subset is ever regenerated, run `npm run lint`, `npm run typecheck`, and a bilingual `/notes` browser pass. Check every changed Chinese title at mobile and desktop widths before replacing the archived subset.
