var cutoff;
var resonance;
var wetness_lp;
var outputLevel_lp;
var reverb;
var decayRate;
var wetness_r;
var outputLevel_lp;
var attack;
var knee;
var release;
var ratio;
var threshold;
var wetness_dc;
var outputLevel_dc;
var distortion;
var oversample;
var wetness_wd;
var outputLevel_wd;
var masterVolume;


function preload()
{

}

function setup()
{
    createCanvas(1024,800);
    background(0);

    // Default Variables
    cutoff = 100;
    resonance = 1;
    reverb = 1;
    decayRate = 1;
    attack = 1;
    knee = 1;
    release = 1;
    ratio = 0.5;
    threshold = 0.5;
    distortion = 1;
    oversample = 1;
    masterVolume = 1;
    

    // BUTTONS //
    button_pause = createButton('PAUSE');
    button_pause.position(5, 5);
    button_pause.size(115, 40);

    button_play = createButton('PLAY');
    button_play.position(155, 5);
    button_play.size(115, 40);

    button_stop = createButton('STOP');
    button_stop.position(305, 5);
    button_stop.size(115, 40);

    button_skip_start = createButton('SKIP TO START');
    button_skip_start.position(455, 5);
    button_skip_start.size(115, 40);

    button_skip_end = createButton('SKIP TO END');
    button_skip_end.position(605, 5);
    button_skip_end.size(115, 40);

    button_loop = createButton('LOOP');
    button_loop.position(755, 5);
    button_loop.size(115, 40);

    button_record = createButton('RECORD');
    button_record.position(905, 5);
    button_record.size(115, 40);



    // LOW-PASS FILTER //
    rect(25, 75, 250, 300);
    text("LOW-PASS FILTER", 85, 100);

    // Cutoff
    text('Cutoff Frequency', 45, 142);
    var input_cutoff = createInput();
    input_cutoff.position(155, 125);
    input_cutoff.size(55, 20);
    input_cutoff.input(getCutoff_LowPassFilter);

    // Resonance
    text('Resonance', 75, 182);
    var input_resonance = createInput();
    input_resonance.position(155, 165);
    input_resonance.size(55, 20);
    input_resonance.input(getResonance_LowPassFilter);

    // Dry-Wet
    text('Dry/Wet', 67, 352);
    var input_wetness_lp = createSlider(0, 1, 0.5, 0.01);
    input_wetness_lp.position(25, 255);
    input_wetness_lp.style('transform: rotate(270deg)');
    input_wetness_lp.input(getWetness_LowPassFilter);

    // Dry-Wet
    text('Output Level', 155, 352);
    var input_output_level_lp = createSlider(0, 1, 0.5, 0.01);
    input_output_level_lp.position(125, 255);
    input_output_level_lp .style('transform: rotate(270deg)');
    input_output_level_lp .input(getOutputLevel_LowPassFilter);



    // REVERB //
    rect(25, 400, 250, 370);
    text("REVERB", 125, 425);

    // Reverb
    text('Reverb Duration', 50, 472);
    var input_reverb_duration = createInput();
    input_reverb_duration.position(155, 455);
    input_reverb_duration.size(55, 20);
    input_reverb_duration.input(getReverbDuration_Reverb);

    // Resonance
    text('Decay Rate', 75, 512);
    var input_resonance = createInput();
    input_resonance.position(155, 495);
    input_resonance.size(55, 20);
    input_resonance.input(getDecayRate_Reverb);

    // Dry-Wet
    text('Dry/Wet', 67, 682);
    var input_wetness_r = createSlider(0, 1, 0.5, 0.01);
    input_wetness_r.position(25, 585);
    input_wetness_r.style('transform: rotate(270deg)');
    input_wetness_r.input(getWetness_Reverb);

    // Dry-Wet
    text('Output Level', 155, 682);
    var input_output_level_r = createSlider(0, 1, 0.5, 0.01);
    input_output_level_r .position(125, 585);
    input_output_level_r .style('transform: rotate(270deg)');
    input_output_level_r .input(getOutputLevel_Reverb);

    // Reverse
    button_reverse = createButton('REVERSE');
    button_reverse.position(90, 710);
    button_reverse.size(115, 40);



    // DYNAMIC COMPRESSOR
    rect(325, 75, 500, 350);
    text("DYNAMIC COMPRESSOR", 500, 100);

    // Attack
    text('Attack', 345, 142);
    var input_attack = createInput();
    input_attack.position(395, 125);
    input_attack.size(55, 20);
    input_attack.input(getAttack_DynamicCompressor);

    // Knee
    text('Knee', 510, 142);
    var input_knee = createInput();
    input_knee.position(555, 125);
    input_knee.size(55, 20);
    input_knee.input(getKnee_DynamicCompressor);

    // Release
    text('Release', 665, 142);
    var input_release = createInput();
    input_release.position(725, 125);
    input_release.size(55, 20);
    input_release.input(getRelease_DynamicCompressor);

    // Ratio
    text('Ratio', 435, 202);
    var input_ratio = createInput();
    input_ratio.position(480, 185);
    input_ratio.size(55, 20);
    input_ratio.input(getRatio_DynamicCompressor);

    // Ratio
    text('Threshold', 605, 202);
    var input_ratio = createInput();
    input_ratio.position(675, 185);
    input_ratio.size(55, 20);
    input_ratio.input(getRatio_DynamicCompressor);

    // Dry-Wet
    text('Dry/Wet', 477, 402);
    var input_wetness_dc = createSlider(0, 1, 0.5, 0.01);
    input_wetness_dc.position(433, 305);
    input_wetness_dc.style('transform: rotate(270deg)');
    input_wetness_dc.input(getWetness_DynamicCompressor);

    // Dry-Wet
    text('Output Level', 625, 402);
    var input_output_level_dc = createSlider(0, 1, 0.5, 0.01);
    input_output_level_dc.position(595, 305);
    input_output_level_dc .style('transform: rotate(270deg)');
    input_output_level_dc .input(getOutputLevel_DynamicCompressor);



    // WAVESHAPER DISTORTION
    rect(325, 455, 250, 315);
    text("WAVESHAPER DISTORTION", 370, 480);

    // Distortion
    text('Distortion Amount', 345, 522);
    var input_distortion = createInput();
    input_distortion.position(455, 505);
    input_distortion.size(55, 20);
    input_distortion.input(getDistortion_WaveshaperDistortion);

    // Oversample
    text('Oversample', 375, 562);
    var input_oversample = createInput();
    input_oversample.position(455, 545);
    input_oversample.size(55, 20);
    input_oversample.input(getOversample_WaveshaperDistortion);

    // Dry-Wet
    text('Dry/Wet', 367, 752);
    var input_wetness_wd = createSlider(0, 1, 0.5, 0.01);
    input_wetness_wd.position(325, 655);
    input_wetness_wd.style('transform: rotate(270deg)');
    input_wetness_wd.input(getWetness_WaveshaperDistortion);

    // Dry-Wet
    text('Output Level', 455, 752);
    var input_output_level_wd = createSlider(0, 1, 0.5, 0.01);
    input_output_level_wd.position(425, 655);
    input_output_level_wd .style('transform: rotate(270deg)');
    input_output_level_wd .input(getOutputLevel_WaveshaperDistortion);

    
    
    // MASTER VOLUME
    rect(850, 75, 150, 220);
    text("MASTER VOLUME", 870, 100);

    // Master Volume
    text('Volume', 900, 272);
    var input_volume= createSlider(0, 1, 0.5, 0.01);
    input_volume.position(855, 175);
    input_volume.style('transform: rotate(270deg)');
    input_volume.input(getMasterVolume);
}

function draw()
{

}

// LOW PASS FILTER INPUTS
function getCutoff_LowPassFilter()
{
    cutoff = this.value();
}

function getResonance_LowPassFilter()
{
    resonance = this.value();
}

function getWetness_LowPassFilter()
{
    wetness_lp = this.value();
}

function getOutputLevel_LowPassFilter()
{
    outputLevel_lp = this.value();
}

// REVERB INPUTS

function getReverbDuration_Reverb()
{
    reverb = this.value();
}

function getDecayRate_Reverb()
{
    decayRate = this.value();
}

function getWetness_Reverb()
{
    wetness_r = this.value();
}

function getOutputLevel_Reverb()
{
    outputLevel_r = this.value();
}

// DYNAMIC COMPRESSOR INPUTS

function getAttack_DynamicCompressor()
{
    attack = this.value();
}

function getKnee_DynamicCompressor()
{
    knee = this.value();
}

function getRelease_DynamicCompressor()
{
    release = this.value();
}

function getRatio_DynamicCompressor()
{
    ratio = this.value();
}

function getThreshold_DynamicCompressor()
{
    threshold = this.value();
}

function getWetness_DynamicCompressor()
{
    wetness_r = this.value();
}

function getOutputLevel_DynamicCompressor()
{
    outputLevel_r = this.value();
}

// WASESHAPER DISTORTION FILTER INPUTS
function getDistortion_WaveshaperDistortion()
{
    distortion = this.value();
}

function getOversample_WaveshaperDistortion()
{
    oversample = this.value();
}

function getWetness_WaveshaperDistortion()
{
    wetness_wd = this.value();
}

function getOutputLevel_WaveshaperDistortion()
{
    outputLevel_wd = this.value();
}

// MASTER VOLUME INPUT

function getMasterVolume()
{
    masterVolume = this.value();
}