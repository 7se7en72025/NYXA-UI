"use client";

import { CodeBlock } from "@/components/code-block";

export default function CliPage() {
  return (
    <div>
      <h1
        style={{
          fontSize: 32,
          fontWeight: 700,
          color: "#fff",
          fontFamily: "inherit",
          margin: "0 0 8px",
          letterSpacing: "-0.02em",
        }}
      >
        CLI
      </h1>

      <p
        style={{
          fontSize: 15,
          color: "#888",
          fontFamily: "inherit",
          marginBottom: 32,
          lineHeight: 1.6,
        }}
      >
        Installing Kata UI with the shadcn CLI
      </p>

      <h2
        style={{
          fontSize: 18,
          fontWeight: 600,
          color: "#fff",
          fontFamily: "inherit",
          marginBottom: 12,
        }}
      >
        Initialization
      </h2>

      <p
        style={{
          fontSize: 14,
          color: "#888",
          fontFamily: "inherit",
          marginBottom: 12,
          lineHeight: 1.7,
        }}
      >
        Use the <code style={{ color: "#bbb", background: "#1a1a1a", padding: "2px 6px", borderRadius: 4, fontSize: 13 }}>init</code> command to initialize a new shadcn project before adding registry components.
      </p>

      <CodeBlock code="npx shadcn@latest init" tabs={["npm", "pnpm", "yarn", "bun"]} />

      <CodeBlock
        code={`Which style would you like to use? New York
Which color would you like to use as base color? Zinc
Do you want to use CSS variables for colors? yes`}
      />

      <h2
        style={{
          fontSize: 18,
          fontWeight: 600,
          color: "#fff",
          fontFamily: "inherit",
          marginBottom: 12,
          marginTop: 32,
        }}
      >
        Add components
      </h2>

      <p
        style={{
          fontSize: 14,
          color: "#888",
          fontFamily: "inherit",
          marginBottom: 12,
          lineHeight: 1.7,
        }}
      >
        Use the <code style={{ color: "#bbb", background: "#1a1a1a", padding: "2px 6px", borderRadius: 4, fontSize: 13 }}>add</code> command with the Kata UI registry URL from any component page.
      </p>

      <CodeBlock
        code="npx shadcn@latest add https://kata-ui.vercel.app/r/animated-rays.json"
        tabs={["npm", "pnpm", "yarn", "bun"]}
      />

      <CodeBlock
        code={`Usage: shadcn add [options] [components...]

add a component to your project

Arguments:
  components        the components to add or a url to the component.

Options:
  -y, --yes         skip confirmation prompt
  -o, --overwrite   overwrite existing files
  -c, --cwd <cwd>   the working directory
  -p, --path <path> the path to add the component to
  -h, --help        display help for command`}
      />

      <h2
        style={{
          fontSize: 18,
          fontWeight: 600,
          color: "#fff",
          fontFamily: "inherit",
          marginBottom: 12,
          marginTop: 32,
        }}
      >
        Monorepo
      </h2>

      <p
        style={{
          fontSize: 14,
          color: "#888",
          fontFamily: "inherit",
          marginBottom: 12,
          lineHeight: 1.7,
        }}
      >
        In a monorepo, pass the workspace path with <code style={{ color: "#bbb", background: "#1a1a1a", padding: "2px 6px", borderRadius: 4, fontSize: 13 }}>-c</code> or <code style={{ color: "#bbb", background: "#1a1a1a", padding: "2px 6px", borderRadius: 4, fontSize: 13 }}>--cwd</code>.
      </p>

      <CodeBlock
        code="npx shadcn@latest add https://kata-ui.vercel.app/r/animated-rays.json -c ./apps/web"
        tabs={["npm", "pnpm", "yarn", "bun"]}
      />

      <h2
        style={{
          fontSize: 18,
          fontWeight: 600,
          color: "#fff",
          fontFamily: "inherit",
          marginBottom: 12,
          marginTop: 32,
        }}
      >
        Namespaced registry
      </h2>

      <p
        style={{
          fontSize: 14,
          color: "#888",
          fontFamily: "inherit",
          marginBottom: 12,
          lineHeight: 1.7,
        }}
      >
        If you prefer short component names, add a registry alias to <code style={{ color: "#bbb", background: "#1a1a1a", padding: "2px 6px", borderRadius: 4, fontSize: 13 }}>components.json</code>.
      </p>

      <CodeBlock
        filename="components.json"
        code={`{
  "registries": {
    "@kataui": "https://kata-ui.vercel.app/r/{name}.json"
  }
}`}
      />

      <CodeBlock
        code="npx shadcn@latest add @kataui/animated-rays"
        tabs={["npm", "pnpm", "yarn", "bun"]}
      />
    </div>
  );
}
