#!/usr/bin/env bash
set -euo pipefail
OUT="C:/Users/user/PycharmProjects/Menchly/public/images/generated"
mkdir -p "$OUT"

gen() {
  local name="$1"
  local prompt="$2"
  echo "== $name =="
  local json
  json=$(higgsfield generate create gpt_image_2_5 --json \
    --prompt "$prompt" \
    --aspect-ratio 3:2 --quality high --resolution 2k --wait --wait-timeout 8m)
  local url
  url=$(echo "$json" | grep -o '"result_url": *"[^"]*"' | sed -E 's/.*"([^"]+)"$/\1/')
  if [ -z "$url" ]; then
    echo "FAILED $name"
    echo "$json"
    return 1
  fi
  curl -sL "$url" -o "$OUT/$name.png"
  echo "saved $name.png"
}

gen "service-positioning" "Editorial documentary photograph: a well-dressed man in his 40s walking on a city street at night, checking a smartphone held at chest height, screen unreadable and angled away, surrounded by soft blue and amber bokeh city lights, shallow depth of field, 35mm film grain, cinematic moody blue color grade, empty dark space in the lower third of the frame for overlay, no text, no logos, no readable screens, no watermark"

gen "service-authority" "Editorial documentary photograph: a focused woman in her 40s studying a laptop and printed pages at a dark table in a quiet modern office at night, cool blue ambient light with a single warm desk lamp, reflections on glass walls behind her, shallow depth of field, 35mm film grain, moody desaturated blue color grade, negative space on the right side of the frame for overlay, no text, no logos, no readable screens, no watermark"

gen "market-ask-ai" "Editorial documentary photograph, vertical close composition: a woman's hand holding a smartphone at chest height, the screen's cool blue glow softly lighting her face from below, blurred night city lights in the background, shallow depth of field, 35mm film grain, moody cinematic blue color grade, empty dark space in the lower third for overlay, no text, no logos, no readable screens, no watermark"

gen "cta-advisor" "Editorial documentary photograph: a senior advisor in his 50s with grey hair and a dark navy suit, seated in a quiet private meeting room at night, leaning forward attentively, cool deep navy blue ambient light with a single warm accent light, out-of-focus silhouette of a second person in the foreground, shallow depth of field, 35mm film grain, moody desaturated navy color grade, no text, no logos, no readable screens, no watermark"

echo "ALL DONE"
