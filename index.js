document.addEventListener("keydown", function(event) {
  let leftPoints = document.getElementById("left-points").innerHTML.trim();
  let rightPoints = document.getElementById("right-points").innerHTML.trim();
  console.log(event.keyCode);
  if (event.keyCode === 82) { // keyCode == "r"
    document.getElementById("left-points").innerHTML = "0";
    document.getElementById("right-points").innerHTML = "0";
  }

  if (event.keyCode === 65) { // keyCode == "a"
    if (leftPoints === "0") {
      document.getElementById("left-points").innerHTML = "15";
    } else if (leftPoints === "15") {
      document.getElementById("left-points").innerHTML = "30";
    } else if (leftPoints === "30") {
      document.getElementById("left-points").innerHTML = "40";
    } else if (leftPoints === "40") {
      if (rightPoints === "30" || rightPoints === "15" || rightPoints === "0") {
        document.getElementById("left-points").innerHTML = "winner";
      } else if (rightPoints === "AD"){
        document.getElementById("left-points").innerHTML = "AD";
        document.getElementById("right-points").innerHTML = "40";
      } else if (rightPoints === "40") {
        document.getElementById("left-points").innerHTML = "AD";
      }
    } else if (leftPoints === "AD") {
      document.getElementById("left-points").innerHTML = "winner";
    }
  }

  if (event.keyCode === 83) { // keyCode == "s"
    if (rightPoints === "0") {
      document.getElementById("right-points").innerHTML = "15";
    }
    else if (rightPoints === "15") {
      document.getElementById("right-points").innerHTML = "30";
    }
    else if (rightPoints === "30") {
      document.getElementById("right-points").innerHTML = "40";
    }
    else if (rightPoints === "40") {
      if (leftPoints === "30" || leftPoints === "15" || leftPoints === "0") {
        document.getElementById("right-points").innerHTML = "winner";
      } else if (leftPoints === "AD"){
        document.getElementById("right-points").innerHTML = "AD";
        document.getElementById("left-points").innerHTML = "40";
      } else if (leftPoints === "40") {
        document.getElementById("right-points").innerHTML = "AD";
      }
    } else if (rightPoints === "AD") {
      document.getElementById("right-points").innerHTML = "winner";
    }
  }
})
