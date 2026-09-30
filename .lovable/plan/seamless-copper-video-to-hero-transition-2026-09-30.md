# Seamless Copper Video-to-Hero Transition

## Goal
Create a seven-second copper manufacturing sequence that ends cleanly in the existing “Empowering Transformation” banner, without the current glow, framing, or colour jump.

## Plan
1. Recreate the motion as a controlled seven-second industrial sequence: glowing copper moving through machinery, cooling to its natural polished colour, and settling into finished conductor coils.
2. Direct the final camera position, factory lighting, copper colour, and composition toward the existing “Empowering Transformation” image.
3. Blend the final portion into the exact banner image rather than relying on two independently generated frames:
   - Reduce the copper glow gradually during the closing seconds.
   - Hold the final composition steady.
   - Crossfade the last 0.8–1.0 seconds into the original banner image.
4. Replace the current short hero clip and synchronize the slide change with the full seven-second sequence.
5. Keep the headline and calls to action stable through the transition so only the background evolves.
6. Verify the complete sequence on desktop and mobile, including reduced-motion fallback, autoplay, image crop, and absence of a flash or visible jump.

## Technical details
- Preserve the original banner image as the transition’s exact destination frame.
- Export an optimized web MP4 with consistent 16:9 framing and colour treatment.
- Retain the existing image fallback for browsers or visitors that do not play motion.
