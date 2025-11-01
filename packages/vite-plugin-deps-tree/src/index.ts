import type { Plugin } from "vite";

export interface DepsTreeOptions {
  outputPath?: string;
  includeDevDeps?: boolean;
}

export function depsTree(options: DepsTreeOptions = {}): Plugin {
  const { outputPath = "deps-tree.json" } = options;

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

      this.emitFile({
        type: "asset",
        fileName: outputPath,
        source: JSON.stringify(depsTree, null, 2),
      });

      console.log(`Dependency tree saved to ${outputPath}`);
    },
  };
}

export default depsTree;
