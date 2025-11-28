import { GoogleGenAI } from "@google/genai";
import * as fs from "node:fs";
import * as path from "node:path";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const GLOBAL_STYLE = `
Sci-fi anime style illustration, cyberpunk aesthetic inspired by Ghost in the Shell and Steins;Gate.
Neon colors with deep blues, purples, and cyan accents. Clean lines, detailed backgrounds.
Hong Kong futuristic cityscape elements where appropriate - neon signs, dense buildings, Victoria Harbour.
Professional quality, suitable for academic presentation. No text or letters in the image.
High resolution, cinematic composition.
`;

interface ImageSpec {
  aspectRatio: "16:9" | "1:1" | "4:3";
  prompt: string;
}

const IMAGES: Record<string, ImageSpec> = {
  "01_title": {
    aspectRatio: "16:9",
    prompt: `
      Panoramic view of futuristic Hong Kong skyline at night from Victoria Peak.
      Neon-lit skyscrapers with holographic displays. In the night sky, glowing quantum
      particles and wave function patterns float like aurora borealis. Entangled photon
      pairs connected by ethereal light beams streak across the harbor. The scene blends
      traditional Hong Kong density with sci-fi quantum visualization. Dramatic, awe-inspiring.
    `,
  },
  "02_security": {
    aspectRatio: "16:9",
    prompt: `
      Split scene showing cyber threat visualization. On left: a mysterious hooded anime
      hacker character with glowing red eyes sitting before multiple holographic screens
      showing encrypted data streams. On right: a glowing blue quantum shield/lock symbol
      protecting data. Hong Kong cityscape in background. Tension between threat and protection.
    `,
  },
  "03_classical_crypto": {
    aspectRatio: "16:9",
    prompt: `
      Visual metaphor for classical cryptography vulnerability. A massive traditional padlock
      made of golden metal, but with visible cracks. Behind it, a looming quantum computer
      represented as a glowing crystalline structure with qubits orbiting it. The quantum
      computer casts ominous light on the crumbling padlock. Futuristic Hong Kong lab setting.
    `,
  },
  "04_qkd_concept": {
    aspectRatio: "16:9",
    prompt: `
      Visualization of quantum key distribution concept. A single photon represented as a
      glowing orb with wave-particle duality visualization travels through fiber optic cables
      that glow with internal light. When observed by a detector (anime-style eye symbol),
      the photon state changes - shown with transformation effect. Clean, educational feel.
    `,
  },
  "05_entanglement": {
    aspectRatio: "16:9",
    prompt: `
      Two anime scientist characters - Alice (female, blue hair, lab coat) and Bob (male,
      silver hair, lab coat) - standing on opposite sides of Hong Kong harbour. Between them,
      a pair of entangled photons connected by a glowing quantum link that bridges the water.
      The entanglement visualized as intertwined light spirals. Victoria Harbour and city lights
      in background. Sense of connection across distance.
    `,
  },
  "06_bell_inequality": {
    aspectRatio: "16:9",
    prompt: `
      Abstract visualization of the Bell test. Two measurement stations with anime-style
      scientists operating detector devices. Between them, entangled particles being measured.
      The scene shows correlation patterns as flowing energy streams. A dramatic moment of
      measurement with light effects. Dramatic lighting, scientific discovery mood.
    `,
  },
  "07_bell_meaning": {
    aspectRatio: "16:9",
    prompt: `
      Conceptual visualization of what Bell violation means. Classical hidden variables shown
      as fading puppet strings being cut - they cannot explain the correlations. In contrast,
      genuine quantum entanglement shown as brilliant interconnected light. Two particles
      defy local realism, shown through impossible simultaneous effects. Mysterious, profound.
    `,
  },
  "08_device_independence": {
    aspectRatio: "16:9",
    prompt: `
      Two black box devices with question marks and warning symbols - representing untrusted
      devices. One shows a hidden backdoor being exposed with red warning lights. The other
      is surrounded by Bell test verification glow (blue/green), showing it's verified secure.
      Contrast between "trust the device" vs "trust the physics". Cybersecurity meets quantum.
    `,
  },
  "09_diqkd_protocol": {
    aspectRatio: "16:9",
    prompt: `
      Full DI-QKD protocol visualization. Alice and Bob (anime scientists) on opposite ends
      of the Hong Kong skyline, each with black-box devices. Entangled photons stream between
      them through the night sky. Secret key bits materialize as golden binary code between
      them. Eve (shadowy figure) watches from below but cannot intercept. Triumphant, secure.
    `,
  },
  "10_security_proof": {
    aspectRatio: "16:9",
    prompt: `
      Visualization of monogamous correlations. Alice and Bob strongly connected by thick,
      bright entanglement beam. Eve (mysterious dark figure) tries to connect but her beam
      is weak, fading, broken. Mathematical concept that "if Alice-Bob are maximally correlated,
      Eve gets nothing" shown through visual strength of connections. Quantum exclusivity.
    `,
  },
  "11_challenges": {
    aspectRatio: "16:9",
    prompt: `
      Anime-style obstacle course representing DI-QKD challenges. Hurdles labeled with
      technical challenges: high efficiency detector (precise measuring device), loophole-free
      test (complete sphere of detection), distance limitations (stretching gap). A determined
      scientist character running through the course. Current achievement marker glowing.
      Future goal: satellite shown in distance. Optimistic despite challenges.
    `,
  },
  "12_conclusion": {
    aspectRatio: "16:9",
    prompt: `
      Hopeful future vision of Hong Kong as a quantum-secured smart city. Quantum networks
      visualized as glowing mesh connecting all buildings. Satellites overhead providing
      global quantum links. Citizens going about their lives under the protection of
      quantum-secured communications. Sunrise colors mixing with neon. Optimistic, futuristic,
      the dawn of the quantum communication era. Inspiring and hopeful ending.
    `,
  },
};

async function generateImage(name: string, spec: ImageSpec): Promise<boolean> {
  const fullPrompt = `${GLOBAL_STYLE}\n\nSpecific scene:\n${spec.prompt.trim()}`;

  console.log(`\n${"=".repeat(60)}`);
  console.log(`Generating: ${name} (aspect ratio: ${spec.aspectRatio})`);
  console.log(`${"=".repeat(60)}`);

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-image-preview",
      contents: fullPrompt,
      config: {
        responseModalities: ["IMAGE"],
        imageConfig: {
          aspectRatio: spec.aspectRatio,
        },
      },
    });

    const parts = response.candidates?.[0]?.content?.parts;
    if (parts) {
      for (const part of parts) {
        if (part.inlineData) {
          const imageData = Buffer.from(part.inlineData.data!, "base64");
          const filepath = path.join("images", `${name}.png`);
          fs.writeFileSync(filepath, imageData);
          console.log(`Saved: ${filepath}`);
          return true;
        } else if (part.text) {
          console.log(`Text response: ${part.text.slice(0, 200)}...`);
        }
      }
    }

    console.log(`Warning: No image generated for ${name}`);
    return false;
  } catch (error) {
    console.error(`Error generating ${name}:`, error);
    return false;
  }
}

async function main() {
  fs.mkdirSync("images", { recursive: true });

  const args = process.argv.slice(2);

  if (args.length > 0) {
    const target = args[0];
    if (target in IMAGES) {
      const success = await generateImage(target, IMAGES[target]);
      process.exit(success ? 0 : 1);
    } else {
      console.log(`Unknown image: ${target}`);
      console.log(`Available: ${Object.keys(IMAGES).join(", ")}`);
      process.exit(1);
    }
  }

  const results: Record<string, boolean> = {};
  for (const [name, spec] of Object.entries(IMAGES)) {
    results[name] = await generateImage(name, spec);
  }

  console.log(`\n${"=".repeat(60)}`);
  console.log("SUMMARY");
  console.log(`${"=".repeat(60)}`);
  const successful = Object.values(results).filter(Boolean).length;
  console.log(`Generated: ${successful}/${Object.keys(IMAGES).length} images`);

  if (successful < Object.keys(IMAGES).length) {
    console.log("\nFailed images:");
    for (const [name, success] of Object.entries(results)) {
      if (!success) {
        console.log(`  - ${name}`);
      }
    }
  }
}

main();
