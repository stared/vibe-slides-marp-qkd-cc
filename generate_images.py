#!/usr/bin/env python3
"""
Generate anime-style images for DI-QKD presentation using Nano Banana Pro (Gemini 3 Pro Image).
Uses sci-fi anime aesthetic with Hong Kong elements.
"""

import os
import sys
from google import genai
from google.genai import types

# Initialize client - uses GOOGLE_API_KEY environment variable
client = genai.Client()

# Global style prompt for consistency across all images
GLOBAL_STYLE = """
Sci-fi anime style illustration, cyberpunk aesthetic inspired by Ghost in the Shell and Steins;Gate.
Neon colors with deep blues, purples, and cyan accents. Clean lines, detailed backgrounds.
Hong Kong futuristic cityscape elements where appropriate - neon signs, dense buildings, Victoria Harbour.
Professional quality, suitable for academic presentation. No text or letters in the image.
High resolution, cinematic composition.
"""

# Image specifications: filename -> (aspect_ratio, specific scene description)
# aspect_ratio: "16:9" for full backgrounds, "1:1" or "4:3" for side images
IMAGES = {
    "01_title": ("16:9", """
        Panoramic view of futuristic Hong Kong skyline at night from Victoria Peak.
        Neon-lit skyscrapers with holographic displays. In the night sky, glowing quantum
        particles and wave function patterns float like aurora borealis. Entangled photon
        pairs connected by ethereal light beams streak across the harbor. The scene blends
        traditional Hong Kong density with sci-fi quantum visualization. Dramatic, awe-inspiring.
    """),

    "02_security": ("16:9", """
        Split scene showing cyber threat visualization. On left: a mysterious hooded anime
        hacker character with glowing red eyes sitting before multiple holographic screens
        showing encrypted data streams. On right: a glowing blue quantum shield/lock symbol
        protecting data. Hong Kong cityscape in background. Tension between threat and protection.
    """),

    "03_classical_crypto": ("16:9", """
        Visual metaphor for classical cryptography vulnerability. A massive traditional padlock
        made of golden metal, but with visible cracks. Behind it, a looming quantum computer
        represented as a glowing crystalline structure with qubits orbiting it. The quantum
        computer casts ominous light on the crumbling padlock. Futuristic Hong Kong lab setting.
    """),

    "04_qkd_concept": ("16:9", """
        Visualization of quantum key distribution concept. A single photon represented as a
        glowing orb with wave-particle duality visualization travels through fiber optic cables
        that glow with internal light. When observed by a detector (anime-style eye symbol),
        the photon state changes - shown with transformation effect. Clean, educational feel.
    """),

    "05_entanglement": ("16:9", """
        Two anime scientist characters - Alice (female, blue hair, lab coat) and Bob (male,
        silver hair, lab coat) - standing on opposite sides of Hong Kong harbour. Between them,
        a pair of entangled photons connected by a glowing quantum link that bridges the water.
        The entanglement visualized as intertwined light spirals. Victoria Harbour and city lights
        in background. Sense of connection across distance.
    """),

    "06_bell_inequality": ("16:9", """
        Abstract visualization of the Bell test. Two measurement stations with anime-style
        scientists operating detector devices. Between them, entangled particles being measured.
        The scene shows correlation patterns as flowing energy streams. A dramatic moment of
        measurement with light effects. Dramatic lighting, scientific discovery mood.
    """),

    "07_bell_meaning": ("16:9", """
        Conceptual visualization of what Bell violation means. Classical hidden variables shown
        as fading puppet strings being cut - they cannot explain the correlations. In contrast,
        genuine quantum entanglement shown as brilliant interconnected light. Two particles
        defy local realism, shown through impossible simultaneous effects. Mysterious, profound.
    """),

    "08_device_independence": ("16:9", """
        Two black box devices with question marks and warning symbols - representing untrusted
        devices. One shows a hidden backdoor being exposed with red warning lights. The other
        is surrounded by Bell test verification glow (blue/green), showing it's verified secure.
        Contrast between "trust the device" vs "trust the physics". Cybersecurity meets quantum.
    """),

    "09_diqkd_protocol": ("16:9", """
        Full DI-QKD protocol visualization. Alice and Bob (anime scientists) on opposite ends
        of the Hong Kong skyline, each with black-box devices. Entangled photons stream between
        them through the night sky. Secret key bits materialize as golden binary code between
        them. Eve (shadowy figure) watches from below but cannot intercept. Triumphant, secure.
    """),

    "10_security_proof": ("16:9", """
        Visualization of monogamous correlations. Alice and Bob strongly connected by thick,
        bright entanglement beam. Eve (mysterious dark figure) tries to connect but her beam
        is weak, fading, broken. Mathematical concept that "if Alice-Bob are maximally correlated,
        Eve gets nothing" shown through visual strength of connections. Quantum exclusivity.
    """),

    "11_challenges": ("16:9", """
        Anime-style obstacle course representing DI-QKD challenges. Hurdles labeled with
        technical challenges: high efficiency detector (precise measuring device), loophole-free
        test (complete sphere of detection), distance limitations (stretching gap). A determined
        scientist character running through the course. Current achievement marker glowing.
        Future goal: satellite shown in distance. Optimistic despite challenges.
    """),

    "12_conclusion": ("16:9", """
        Hopeful future vision of Hong Kong as a quantum-secured smart city. Quantum networks
        visualized as glowing mesh connecting all buildings. Satellites overhead providing
        global quantum links. Citizens going about their lives under the protection of
        quantum-secured communications. Sunrise colors mixing with neon. Optimistic, futuristic,
        the dawn of the quantum communication era. Inspiring and hopeful ending.
    """)
}


def generate_image(name: str, aspect_ratio: str, specific_prompt: str) -> bool:
    """Generate a single image using Nano Banana Pro."""
    full_prompt = f"{GLOBAL_STYLE}\n\nSpecific scene:\n{specific_prompt.strip()}"

    print(f"\n{'='*60}")
    print(f"Generating: {name} (aspect ratio: {aspect_ratio})")
    print(f"{'='*60}")

    try:
        response = client.models.generate_content(
            model="gemini-3-pro-image-preview",
            contents=[full_prompt],
            config=types.GenerateContentConfig(
                response_modalities=['IMAGE'],
                image_config=types.ImageConfig(
                    aspect_ratio=aspect_ratio
                )
            )
        )

        for part in response.parts:
            if part.inline_data is not None:
                image = part.as_image()
                filepath = f"images/{name}.png"
                image.save(filepath)
                print(f"Saved: {filepath}")
                return True
            elif part.text is not None:
                print(f"Text response: {part.text[:200]}...")

        print(f"Warning: No image generated for {name}")
        return False

    except Exception as e:
        print(f"Error generating {name}: {e}")
        return False


def main():
    """Generate all images for the presentation."""
    os.makedirs("images", exist_ok=True)

    # Check if specific image requested
    if len(sys.argv) > 1:
        target = sys.argv[1]
        if target in IMAGES:
            aspect_ratio, prompt = IMAGES[target]
            success = generate_image(target, aspect_ratio, prompt)
            sys.exit(0 if success else 1)
        else:
            print(f"Unknown image: {target}")
            print(f"Available: {', '.join(IMAGES.keys())}")
            sys.exit(1)

    # Generate all images
    results = {}
    for name, (aspect_ratio, prompt) in IMAGES.items():
        results[name] = generate_image(name, aspect_ratio, prompt)

    # Summary
    print(f"\n{'='*60}")
    print("SUMMARY")
    print(f"{'='*60}")
    successful = sum(1 for v in results.values() if v)
    print(f"Generated: {successful}/{len(IMAGES)} images")

    if successful < len(IMAGES):
        print("\nFailed images:")
        for name, success in results.items():
            if not success:
                print(f"  - {name}")


if __name__ == "__main__":
    main()
