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

gen "service-authority" "Editorial documentary photograph: a fanned-out stack of printed press clippings, editorial magazine pages and newspaper articles on a dark wood table under a single warm brass desk lamp, a fountain pen resting across the top page, deep navy shadows surrounding the small pool of warm light, shallow depth of field, 35mm film grain, moody blue-and-amber color grade, no legible headlines or text, empty dark space at the top of the frame for overlay, no logos, no watermark"

gen "service-positioning" "Editorial documentary photograph: interior of a private aviation lounge at dusk, a well-dressed man in a navy suit seated in a cream leather armchair beside a large window, checking a smartphone held at chest height, a private jet visible softly out of focus on the tarmac through the glass, cool blue dusk light mixing with warm interior lamps, shallow depth of field, 35mm film grain, moody cinematic color grade, empty dark space in the lower third for overlay, no text, no logos, no readable screen, no watermark"

gen "service-monitoring" "Editorial documentary photograph: a dark control-room style office at night, two people in silhouette standing before a bank of large wall-mounted screens glowing with abstract soft blue waveform and flowing graph shapes, no legible text or numbers on the screens, reflections on a polished dark floor, shallow depth of field, 35mm film grain, moody deep blue color grade, empty dark space at the bottom of the frame for overlay, no logos, no watermark"

echo "ALL DONE"
