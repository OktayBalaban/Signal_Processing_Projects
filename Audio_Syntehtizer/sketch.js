var input_cutoff;
var input_resonance;
var input_wetness_lp
var input_output_level_lp
var input_reverb_duration
var input_decay_rate
var reverbDuration;
var decayRate;
var input_wetness_r
var input_output_level_r
var input_attack;
var input_knee;
var input_release;
var input_ratio;
var input_threshold;
var input_wetness_dc;
var input_output_level_dc;
var input_distortion;
var input_oversample;
var input_wetness_wd
var input_output_level_wd
var track;
var input_volume;
var originalAudio;
var outputAudio;
var fft;
var spectrum_in;
var spectrum_out;


function preload()
{
    soundFormats('mp3')
    track = loadSound('/Laurence.mp3');
    originalAudio = new p5.MediaElement(track);
    track.disconnect()
    lowPassFilter = new p5.LowPass()
    waveshaperDistorion = new p5.Distortion()
    dynamicCompressor = new p5.Compressor()
    reverb = new p5.Reverb(output = outputAudio)

}

function setup()
{
    createCanvas(1024,800);
    background(0);
    

   // BUTTONS //
    button_pause = createButton('PAUSE');
    button_pause.position(5, 5);
    button_pause.size(115, 40);
    button_pause.mousePressed(pauseButton);

    button_play = createButton('PLAY');
    button_play.position(155, 5);
    button_play.size(115, 40);
    button_play.mousePressed(playButton);

    button_stop = createButton('STOP');
    button_stop.position(305, 5);
    button_stop.size(115, 40);
    button_stop.mousePressed(stopButton);

    button_skip_start = createButton('SKIP TO START');
    button_skip_start.position(455, 5);
    button_skip_start.size(115, 40);
    button_skip_start.mousePressed(skipStartButton);

    button_skip_end = createButton('SKIP TO END');
    button_skip_end.position(605, 5);
    button_skip_end.size(115, 40);
    button_skip_end.mousePressed(skipEndButton);

    button_loop = createButton('LOOP');
    button_loop.position(755, 5);
    button_loop.size(115, 40);
    button_loop.mousePressed(loopButton);

    button_record = createButton('RECORD');
    button_record.position(905, 5);
    button_record.size(115, 40);
    button_record.mousePressed(recordButton);

    // SPECTRUM
    fft_in = new p5.FFT();
    fft_out = new p5.FFT();


    // LOW-PASS FILTER //
    rect(25, 75, 250, 300);
    text("LOW-PASS FILTER", 85, 100);

    // Cutoff
    text('Cutoff Frequency', 45, 142);
    input_cutoff = createInput(100);
    input_cutoff.position(155, 125);
    input_cutoff.size(55, 20);

    // Resonance
    text('Resonance', 75, 182);
    input_resonance = createInput(5);
    input_resonance.position(155, 165);
    input_resonance.size(55, 20);

    // Dry-Wet
    text('Dry/Wet', 67, 352);
    input_wetness_lp = createSlider(0, 1, 0.5, 0.01);
    input_wetness_lp.position(25, 255);
    input_wetness_lp.style('transform: rotate(270deg)');

    // Dry-Wet
    text('Output Level', 155, 352);
    input_output_level_lp = createSlider(0, 1, 0.5, 0.01);
    input_output_level_lp.position(125, 255);
    input_output_level_lp.style('transform: rotate(270deg)');



    // REVERB //
    rect(25, 400, 250, 370);
    text("REVERB", 125, 425);

    // Reverb Duration
    text('Reverb Duration', 50, 472);
    input_reverb_duration = createInput(2);
    input_reverb_duration.position(155, 455);
    input_reverb_duration.size(55, 20);

    // Decay Rate
    text('Decay Rate', 75, 512);
    input_decay_rate = createInput(3);
    input_decay_rate.position(155, 495);
    input_decay_rate.size(55, 20);

    // Dry-Wet
    text('Dry/Wet', 67, 682);
    input_wetness_r = createSlider(0, 1, 0.5, 0.01);
    input_wetness_r.position(25, 585);
    input_wetness_r.style('transform: rotate(270deg)');

    // Dry-Wet
    text('Output Level', 155, 682);
    input_output_level_r = createSlider(0, 1, 0.5, 0.01);
    input_output_level_r.position(125, 585);
    input_output_level_r.style('transform: rotate(270deg)');

    // Reverse
    button_reverse = createButton('REVERSE');
    button_reverse.position(90, 710);
    button_reverse.size(115, 40);



    // DYNAMIC COMPRESSOR
    rect(325, 75, 500, 350);
    text("DYNAMIC COMPRESSOR", 500, 100);

    // Attack
    text('Attack', 345, 142);
    input_attack = createInput(.003);
    input_attack.position(395, 125);
    input_attack.size(55, 20);

    // Knee
    text('Knee', 510, 142);
    input_knee = createInput(30);
    input_knee.position(555, 125);
    input_knee.size(55, 20);

    // Release
    text('Release', 665, 142);
    input_release = createInput(0.25);
    input_release.position(725, 125);
    input_release.size(55, 20);

    // Ratio
    text('Ratio', 435, 202);
    input_ratio = createInput(12);
    input_ratio.position(480, 185);
    input_ratio.size(55, 20);

    // Ratio
    text('Threshold', 605, 202);
    input_threshold = createInput(-24);
    input_threshold.position(675, 185);
    input_threshold.size(55, 20);

    // Dry-Wet
    text('Dry/Wet', 477, 402);
    input_wetness_dc = createSlider(0, 1, 0.5, 0.01);
    input_wetness_dc.position(433, 305);
    input_wetness_dc.style('transform: rotate(270deg)');

    // Dry-Wet
    text('Output Level', 625, 402);
    input_output_level_dc = createSlider(0, 1, 0.5, 0.01);
    input_output_level_dc.position(595, 305);
    input_output_level_dc.style('transform: rotate(270deg)');



    // WAVESHAPER DISTORTION
    rect(325, 455, 250, 315);
    text("WAVESHAPER DISTORTION", 370, 480);

    // Distortion
    text('Distortion Amount', 345, 522);
    input_distortion = createInput(0.1);
    input_distortion.position(455, 505);
    input_distortion.size(55, 20);

    // Oversample
    text('Oversample', 375, 562);
    input_oversample = createSelect(0.1);
    input_oversample.option('none');
    input_oversample.option('2x');
    input_oversample.option('4x');
    input_oversample.position(455, 545);
    input_oversample.size(55, 20);

    // Dry-Wet
    text('Dry/Wet', 367, 752);
    input_wetness_wd = createSlider(0, 1, 0.5, 0.01);
    input_wetness_wd.position(325, 655);
    input_wetness_wd.style('transform: rotate(270deg)');

    // Dry-Wet
    text('Output Level', 455, 752);
    input_output_level_wd = createSlider(0, 1, 0.5, 0.01);
    input_output_level_wd.position(425, 655);
    input_output_level_wd .style('transform: rotate(270deg)');

    
    
    // MASTER VOLUME
    rect(850, 75, 150, 220);
    text("MASTER VOLUME", 870, 100);

    // Master Volume
    text('Volume', 900, 272);
    input_volume= createSlider(0, 1, 0.2, 0.01);
    input_volume.position(855, 175);
    input_volume.style('transform: rotate(270deg)');

    processEffects()
}

function draw()
{
    track.setVolume(input_volume.value())

    // EFFECTS

    // Low Pass Filter
    input_cutoff.changed(processEffects);
    input_resonance.changed(processEffects);
    lowPassFilter.drywet(input_wetness_lp.value());
    lowPassFilter.amp(input_output_level_lp.value());

    // Waveshape Distortion
    input_distortion.changed(processEffects)
    input_oversample.changed(processEffects)
    waveshaperDistorion.drywet(input_wetness_wd.value())
    waveshaperDistorion.amp(input_output_level_wd.value())

    // DynamicCompressor
    input_attack.changed(processEffects)
    input_knee.changed(processEffects)
    input_release.changed(processEffects)
    input_ratio.changed(processEffects)
    input_threshold.changed(processEffects)
    dynamicCompressor.drywet(input_wetness_dc.value())
    dynamicCompressor.amp(input_output_level_dc.value())

    // Reverb
    input_decay_rate.changed(processEffects);
    input_reverb_duration.changed(processEffects);
    reverb.drywet(input_wetness_r.value());
    reverb.amp(input_output_level_r.value());

    // Input Spectrum
    spectrum_in = fft_in.analyze();

    noStroke();
    fill(255);
    rect(599, 474, 400, 125);
    fill(255, 0, 0);
    for (let i = 0; i < spectrum_in.length; i++)
    {
        let x = map(i * 4, 0, spectrum_in.length, 0, 200);
        let h = -125 + map(spectrum_in[i], 0, 255, 125, 0);
        rect(600 + x, 599, 200/spectrum_in.length, h);
    }

    // Output Spectrum
    spectrum_out = fft_out.analyze();

    noStroke();
    fill(255);
    rect(599, 625, 400, 125);
    fill(255, 0, 0);
    for (let i = 0; i < spectrum_out.length; i++)
    {
        let x = map(i * 4, 0, spectrum_out.length, 0, 200);
        let h = -125 + map(spectrum_out[i], 0, 255, 125, 0);
        rect(600 + x, 749, 200/spectrum_out.length, h);
    }

}


// BUTTON EVENTS
// Play
function playButton()
{
    if (track.isPlaying() == false)
    {
        track.play();
    }
}

// Pause
function pauseButton()
{
    track.pause();
}

// Stop
function stopButton()
{
    track.stop();
}

// Skip to Start
function skipStartButton()
{

    // Do not let the track start while not playing
    if (track.isPlaying() == false)
    {      
        track.jump(0)
        track.pause()
    }
    // If already is playing, start immediatly
    else
    {
        track.jump(0)
    }
}

// Skip to End
function skipEndButton()
{
    // Do not let the track start while not playing
    if (track.isPlaying() == false)
    {      
        track.jump(track.duration)
        track.pause()
    }
    // If already is playing, start immediatly after jumping to the end
    else
    {
        track.jump(track.duration)
    }
}

// Loop
function loopButton()
{
    track.loop()
}

// Record
function recordButton()
{

}

function processEffects()
{
    // Effect Chains
    lowPassFilter.process(track, float(input_cutoff.value()), float(input_resonance.value()));
    lowPassFilter.disconnect();
    waveshaperDistorion.process(lowPassFilter, float(input_distortion.value()), input_oversample.value());
    waveshaperDistorion.disconnect();
    dynamicCompressor.process(waveshaperDistorion, float(input_attack.value()), float(input_knee.value()), float(input_ratio.value()), float(input_threshold.value()), float(input_release.value()))
    dynamicCompressor.disconnect();
    reverb.process(dynamicCompressor, float(input_reverb_duration.value()), float(input_decay_rate.value()), reverse);
}


