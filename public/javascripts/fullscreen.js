function set_fullscreen () {
  $('#container-application').get(0).requestFullscreen();
}

$("#to-fullscreen").click(set_fullscreen);
