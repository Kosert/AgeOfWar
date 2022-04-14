import { Scene } from "phaser";

export class Todo {

    changeColor(scene: Scene) {
        var originalTexture = scene.textures.get("Tommy");
        var source = originalTexture.getSourceImage();
        var frames = originalTexture.getFramesFromTextureSource(0, false);
    
        var newTexture = scene.textures.createCanvas(
          "TommyNew",
          source.width,
          source.height
        );
    
        var context = newTexture.getContext()//.getSourceImage().//.getContext("2d");
    
        //context.drawImage(source, 0, 0);
    
        var pixels = context.getImageData(0, 0, source.width, source.height);
    
        for (var i = 0; i < pixels.data.length / 4; i++) {
          this.processPixel(pixels.data, i * 4);
        }
    
        context.putImageData(pixels, 0, 0);
    
        newTexture.refresh();
    
        for (const frame of frames) {
          newTexture.add(
            frame.name,
            0,
            frame.cutX,
            frame.cutY,
            frame.width,
            frame.height
          );
        }
      }
    
      processPixel(data, index) {
        var r = data[index];
        var g = data[index + 1];
        var b = data[index + 2];
    
        if (r === 0 && g === 0 && b === 0) {
          return;
        }
    
        var color = Phaser.Display.Color.RGBToString(r, g, b);
        var replace = [
          ["#a42336", "#cc97ff"],
          ["#58223f", "#a768cB"]
        ];
    
        for (const colors of replace) {
          if (color === colors[0]) {
            var rgb = Phaser.Display.Color.HexStringToColor(colors[1]);
    
            data[index] = rgb.red;
            data[index + 1] = rgb.green;
            data[index + 2] = rgb.blue;
          }
        }
      }
}
