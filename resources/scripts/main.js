import "jquery";
import Brainify from "./brain/brain.js";
import {AudioPlayers} from "./audio/index.js";

$('html').addClass('hidden');

const audio = new AudioPlayers();

fetch("/resources/data/brain.json")
    .then(response => response.json())
    .then(jsonObject => {
        Brainify(jsonObject, "#big-brain",
            {width: 1000, height: 1000, mainBackground: "#3FB8AF", responsive: true});
        Brainify(jsonObject, "#little-brain",
            {width: 180, height: 180, mainBackground: "#FF3D7F"});
    });

$(document).ready(() => {
    $('html').removeClass('hidden');
});