/// <reference types="vite/client" />

// Add CSS module type declarations
declare module "*.css" {
  const content: string;
  export default content;
}