import type { Plugin } from "vite";

export interface DepsTreeOptions {
  outputPath?: string;
  includeDevDeps?: boolean;
  server?: boolean;
  port?: number;
}

export function depsTree(options: DepsTreeOptions = {}): Plugin {
  const {
    outputPath = "deps-tree.json",
    server = false,
    port = 3002,
  } = options;

  let depsTreeData: any = null;

  return {
    name: "vite-plugin-deps-tree",
    buildStart() {
      console.log("Analyzing dependency tree...");
    },
    generateBundle() {
      const depsTree = [...this.getModuleIds()].reduce((tree, id) => {
        const moduleInfo = this.getModuleInfo(id);
        if (moduleInfo) {
          tree[id] = {
            dependencies: moduleInfo.importedIds,
            dynamicDependencies: moduleInfo.dynamicallyImportedIds,
          };
        }
        return tree;
      }, {} as Record<string, any>);

      depsTreeData = depsTree;

      this.emitFile({
        type: "asset",
        fileName: outputPath,
        source: JSON.stringify(depsTree, null, 2),
      });

      if (server) {
        startServer(port, depsTreeData);
      }
    },
  };
}

function startServer(port: number, depsTreeData: any) {
  try {
    const http = eval('require')("http");
    const server = http.createServer((req: any, res: any) => {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(depsTreeData, null, 2));
    });
    server.listen(port, () => {
      console.log(`Deps tree server running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
  }
}

export default depsTree;
