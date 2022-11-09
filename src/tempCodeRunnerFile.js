    if (y < -(height / width) * x + height && y > (height / width) * x) {
        styleMood.backgroundColor = "#3144b7"; //blue
        styleMood.color = "#9cf0e1";
      } //blue
      if (y < (height / width) * x && y < -(height / width) * x + height) {
        styleMood.backgroundColor = "#8bf677"; // green
        styleMood.color = "#7f14ff";
      } //green
      if (y > -(height / width) * x + height && y < (height / width) * x) {
        styleMood.backgroundColor = "#fff914"; //yellow
        styleMood.color = "#d9006a";
      } //yellow
      if (y > -(height / width) * x + height && y > (height / width) * x) {
        styleMood.backgroundColor = "#ff4e2a"; //red
        styleMood.color = "#290740";
      } //red