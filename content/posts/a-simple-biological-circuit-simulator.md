---
title: "A Simple Biological Circuit Simulator"
date: 2022-04-28
draft: false
---

In a few months time, I'm very excited to be embarking on a [PhD in Interdisciplinary Biosciences](https://www.biodtp.ox.ac.uk/programme-0). Since I trained as a phycisist, I'm keenly aware of the amount of stuff I don't know, keenly unaware of the stuff I don't know I don't know, and trying to avoid the wonderful physics tradition of deceiving myself that I know what I in fact don't know about any field that isn't physics or pure maths.[^1]

[^1]: though as an experimentalist, the pure maths thing is not an issue for me

<figure>
<img src="https://imgs.xkcd.com/comics/degree_off.png"></img>
<figcaption><a href="https://xkcd.com/1520/">Mandatory XKCD</a></figcaption>
</figure>

Basically, I need to prepare and learn some bio! Speaking to a an alumni of the course, I was given a great list of textbook recommendation, including [An Introduction to Systems Biology - Design Principles of Biological Circuits](https://www.weizmann.ac.il/mcb/UriAlon/introduction-systems-biology-design-principles-biological-circuits) by Uri Alon. 

Reading this, alongside [Biochemistry (Berg, Tymoczko & Stryer)](https://www.booktopia.com.au/biochemistry-jeremy-berg/book/9781319114657.html), has proved a fascinating introduction to the biological mechanisms acting at the sub-cellular level. 

The essential story is this: most biological processes are governed by the actions of proteins - tiny molecular machines which can manipulate matter to build, transform and destroy other molecules. Proteins are produced in cells by special proteins called transcription factors, according to instructions coded for by DNA. The rates at which transcription factors produce proteins are governed by basic rules involving the concentration of other proteins in the cell, which can be abstractly defined according to simple mathematical equations. Because protein concentration affects protein production, a network emerges (called the transcriptome) in which the production of one protein governs the production of other proteins. This network can be quite complex, and can implement various functions with particular timing sequences. For example, the transcriptome might contain a healing algorithm: when the cell is damaged, this triggers production of a regeneration protein. Once that protein has performed it's function, it's production is reduced as it is no longer required.

While there are excellent exercises in Alon's textbook, reading it I couldn't help but think it would fun to "play" with the circuits. Inspired by the brilliant [Falstad electronic circuit simulator](https://www.falstad.com/circuit/) I decided to make my own (much less sophisticated) biological circuit simulator.

There are currently three components to my transcriptome simulator:

1. Promoters  
    These are the transcription factors: they produce a protein <i>X<sub>n</sub></i> at a rate determined by intrinsic growth and decay parameters, as well as the concentration of other promoters or signals connected to them.

2. Signals  
    These represent some external chemical signal to the cell - they are periodic functions which can be connected into promoters.

3. Connections  
    Connections indicate that the production of one protein is influenced by the concentration of another. There are two types of connections, activators which turn on when the input protein is below a certain concentration (and off otherwise), and repressors which act the opposite way. Activators have an arrow head, repressors have a bar head.

The simplest non-trivial example is the autoregulator. In this circuit, a promoter is connected to itself with a repressor connection. The result is that the concentration of protein produced by that promoter can be raised much more quickly than without the repressor.

To see autoregulation simulated, look no further than the simulator below! Other examples can be loaded from File -> Load Example, and instructions to build your own circuits are at the bottom of the page.

<script>
window.mobileCheck = function() {
  let check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};
</script>

# Transcriptome Simulator
<div id="simulator">
</div>

<script>
if (window.mobileCheck()) {
    document.getElementById("simulator").innerHTML = "Not supported on mobile, sorry! Please open this page on a laptop or desktop computer. This is what it looks like: <img src='/TranscriptomeSimDay4[1].PNG'></img>"
} else {
    document.getElementById("simulator").innerHTML = "<iframe overflow='visible' src='/TranscriptomeSim/TranscriptomeSim_Autoregulation.html' title='Transcirptome Simulator' style='min-width:360px;min-height:400px;width:1000px;height:600px'></iframe>"
}
</script>

## Instructions
_Keyboard Controls_  
\[P\] Toggle placing Promoters  
\[S\] Toggle placing Signals  
\[C\] Toggle placing Connections  
_In vivo controls_  
Left click items to select them, then press delete to remove them. Drag promoters/signals to move them.  
Right click items to change their parameters.  
Plots can be dragged and minimized. Reopen plots from the context menu of the associated promoter/signal (right click).  
<img src="/TranscriptomeSim/refresh-cw.svg" style="display:inline-block; vertical-align:middle; padding:5px; border:1px solid black; border-radius:5px"></img> (Top right) Reset all concentrations to zero

I made the simulator using the [Godot game engine](https://godotengine.org/).  

If you want to get in touch (e.g. to correct biological misconsceptions), please contact me at {{< cloakemail "abrahams.gabi@gmail.com" >}}. Thanks for reading!