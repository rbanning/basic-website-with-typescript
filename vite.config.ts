import fs from 'fs';
import path from 'path';

import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/basic-website-with-typescript/',
  build: {
    rollupOptions: {
      input: getHtmlEntryPoints(__dirname),
    },
    outDir: 'dist',
  },
  plugins: [
    tailwindcss(),
  ],
});

//NOTE: this function will search for all html files in the ROOT directory and does not look in subdirectories
function getHtmlEntryPoints(srcPath: string){
  const ignore = ['node_modules', 'dist', 'public', 'src'];

  const result: Record<string,string> = {};

  function traverseDir(current: string) {
     const files = fs.readdirSync(current);
     files.forEach((file) => {
       const fullFilePath = path.join(current, file);
       if (fs.statSync(fullFilePath).isDirectory()) {
          //only go into directories that not in the ignore list (and don't start with a dot);
          if (!file.startsWith('.') && !ignore.includes(file)) {            
            traverseDir(fullFilePath);
          }
       } else if (file.endsWith('.html')) {
         const name = path.relative(srcPath, fullFilePath);
         result[name] = fullFilePath;
       }
     });
  }
 
  traverseDir(srcPath);

  console.log(">>> Entry Points: ", result);
  return result;
}