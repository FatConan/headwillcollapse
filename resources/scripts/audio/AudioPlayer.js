import {BaseClass} from "malicacid";

export default class AudioPlayer extends BaseClass{
    constructor(audioWrapper){
        super();
        this.audioWrapper = audioWrapper;
        this.$audioWrapper = $(audioWrapper);
        this.audio = this.$audioWrapper.find("audio")[0];
        this.$timeline = this.$audioWrapper.find(".timeline");
        this.$playerButton = this.$audioWrapper.find(".play");
        this.$muteButton = this.$audioWrapper.find(".mute")
        this.$timeSpan = this.$audioWrapper.find(".time");
        this.$durationSpan = this.$audioWrapper.find(".duration");

        this.$timeSpan.text("--:--:--");
        this.$durationSpan.text("--:--:--");
        this.addListeners();
    }

    addListeners(){
        const toggleAudio = (e, args) => {
            this.toggleAudio();
        };

        const toggleSound = (e, args) => {
            this.toggleSound();
        };

        const changeTimelinePosition = (e, args) => {
            this.changeTimelinePosition();
        };

        const audioEnded = (e, args) => {
            this.audioEnded();
        };

        const changeSeek = (e, args) => {
            let data = e.detail;
            let x = data.e.offsetX;
            let width = this.$timeline.width();
            let pos = Math.min(Math.max((x * 100.0) / width, 0), 100);
            this.changeSeek(pos);
        };

        this.eventHandler.addListenerOnEvent("audioPlayer:timeline", this.audioWrapper, changeSeek);
        this.eventHandler.addListenerOnEvent("audioPlayer:play", this.audioWrapper, toggleAudio);
        this.eventHandler.addListenerOnEvent("audioPlayer:sound", this.audioWrapper, toggleSound);

        this.audio.addEventListener("ended", audioEnded);
        this.audio.addEventListener("timeupdate", changeTimelinePosition);
    }

    toggleAudio(){
        if(this.audio.paused){
            this.audio.play();
            this.$playerButton.addClass("paused");
            this.$playerButton.text("Pause");
            this.$playerButton.prop("title", "Pause");
        }else{
            this.audio.pause();
            this.$playerButton.removeClass("paused");
            this.$playerButton.text("Play");
            this.$playerButton.prop("title", "Play");
        }
    }

    toggleSound(){
        this.audio.muted = !this.audio.muted;
        if(this.audio.muted){
            this.$muteButton.addClass("muted");
            this.$muteButton.text("Unmute");
            this.$muteButton.prop("title", "Unmute");
        }else{
            this.$muteButton.removeClass("muted");
            this.$muteButton.text("Mute");
            this.$muteButton.prop("title", "Mute");
        }
    }

    formatTime(providedSeconds){
        let dateObj = new Date(providedSeconds * 1000);
        let hours = dateObj.getUTCHours();
        let minutes = dateObj.getUTCMinutes();
        let seconds = dateObj.getSeconds();

        let timeString = hours.toString().padStart(2, '0')
            + ':' + minutes.toString().padStart(2, '0')
            + ':' + seconds.toString().padStart(2, '0');
        return timeString;
    }

    changeTimelinePosition(){
        let percentagePosition = (100.0 * this.audio.currentTime) / this.audio.duration;
        this.$timeline.css("backgroundSize", `${percentagePosition}% 100%`);
        this.$timeSpan.text(this.formatTime(this.audio.currentTime));
        this.$durationSpan.text(this.formatTime(this.audio.duration));
    }

    audioEnded(){
        this.$playerButton.removeClass("paused");
        this.$playerButton.text("Play");
        this.$playerButton.prop("title", "Play");
    }

    changeSeek(pos){
        this.audio.currentTime = (pos * this.audio.duration) / 100.0;
    }
}