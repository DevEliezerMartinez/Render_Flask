var temp_btn;
let last = 0;
let num = 0;
let speed = 0.7;
var steering_max_rotation = 900;
var steering_max_rotation_set;
const velocidadMaxima = 120; // Velocidad máxima en km/h
var steeringwheel = {};
var current_values = {};
var steering_timestamp = -1;

var divElement = document.getElementById('speed');
var interval = setInterval(function() {
  const gas = divElement.textContent
  var steering = current_values.steering;
  var brake = current_values.break;
  var gear = $(".gear").html();
  
  // Crear el objeto JSON con la información
  const data = {
    steering: steering,
    gas: gas,
    brake: brake,
    gear: gear
  };
  // Realizar una solicitud AJAX a tu ruta Flask
  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/obtener-valor', true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onreadystatechange = function() {
  };
  xhr.send(JSON.stringify(data));
}, 150); // 3000 milisegundos = 3 segundos

function mapRange(value, inMin, inMax, outMin, outMax) {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

function changeGear(buttonValue) {
  $(".gear").html(buttonValue);
}

function game(time) {
  steering_max_rotation_set = parseInt($("#settings_rotation").val());

  // Resets the pressed Dpad button to prevent quickly repeated button press
  let timeInSecond = time / 1000;
  if (timeInSecond - last >= speed) {
    last = timeInSecond;
    temp_btn = '';
  }
  var gp = navigator.getGamepads();
  gp.forEach(function (val, key) {
    if (
      val &&
      val.id.includes("Wheel") &&
      steering_timestamp != val.timestamp
    ) {
      var dpad_val;
      steering_timestamp = val.timestamp;
      const pad = {
        steering: val.axes[0],
        gas: val.axes[2],
        break: val.axes[5],
        clutch: val.axes[1],
        dpad: dpad_val,
        buttons: {
          1: val.buttons[12].pressed,
          2: val.buttons[13].pressed,
          3: val.buttons[14].pressed,
          4: val.buttons[15].pressed,
          5: val.buttons[16].pressed,
          6: val.buttons[17].pressed,
          R: val.buttons[18].pressed,
        },
      };

      steeringwheel = {
        steering: steering_max_rotation * pad.steering * 0.5,
        steering_procent:
          (steering_max_rotation * pad.steering * 0.5) /
          (steering_max_rotation_set / 2) *
          100,
        steering_procent_50:
          50 +
          ((steering_max_rotation * pad.steering * 0.5) /
            (steering_max_rotation_set / 2) *
            50),
        gas: (100 -
          Math.round(((pad.gas + 1) / 2) * 100)) / 100,
        break: (100 -
          Math.round(((pad.break + 1) / 2) * 100)) / 100,
        clutch: (100 -
          Math.round(((pad.clutch + 1) / 2) * 100)) / 100,
      };

      // For Demo purposes
      $(".steering_amount").val(steeringwheel.steering_procent_50 / 100);
      $(".wheel").css('transform', `rotate(${steeringwheel.steering}deg)`);
      if (steeringwheel.steering_procent) {
        $(".steering_value").text(steeringwheel.steering_procent.toFixed(2));
      } else {
        $(".steering_value").text("0");
      }
      const velocidadMapped = Math.round(
        mapRange(current_values.gas, 1, -1, 0, velocidadMaxima)
      );
      $(".speed").html(velocidadMapped);
      current_values = {
        steering: pad.steering,
        gas: pad.gas,
        break: pad.break,
        clutch: pad.clutch,
      };
      // Returns Dpad button presses
      Object.entries(pad.buttons).forEach((btn_val) => {
        const entry_key = btn_val[0];
        const entry_val = btn_val[1];
        if (entry_val == true) {
          btn_press(entry_key);
          temp_btn = entry_key;
        }
      });
    }
  });
  window.requestAnimationFrame(game);
}

game();

function btn_press(btn) {
  if (btn != temp_btn) {
    changeGear(btn);
  }
}

// WIP
window.addEventListener("gamepaddisconnected", (event) => {
  console.log("A gamepad disconnected:");
  debug1.html(event.gamepad);
});

function size(){
  var element = document.getElementById("trans");
   element.classList.toggle("size");
   console.log("click");
}