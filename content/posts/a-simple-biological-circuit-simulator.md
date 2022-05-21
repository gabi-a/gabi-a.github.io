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

# Transcriptome Simulator
_(Best viewed not on a mobile device)_
<iframe overflow="visible" src="/TranscriptomeSim/TranscriptomeSim_Autoregulation.html" title="Transcirptome Simulator" style="min-width:360px;min-height:400px;width:1000px;height:600px"></iframe>

## Instructions
_Keyboard Controls_  
\[P\] Toggle placing Promoters  
\[S\] Toggle placing Signals  
\[C\] Toggle placing Connections  
_In vivo controls_  
Left click items to select them, then press delete to remove them.  
Right click items to change their parameters.  
Plots can be dragged and minimized. Reopen plots from the context menu of the associated promoter/signal (right click).  
<img src="/TranscriptomeSim/refresh-cw.svg" style="display:inline-block; vertical-align:middle; padding:5px; border:1px solid black; border-radius:5px"></img> (Top right) Reset all concentrations to zero
<!--iframe overflow="visible" src="/TranscriptomeSim/TranscriptomeSim_C1FFL.html" title="Transcirptome Simulator" style="min-width:900px;min-height:600px;"></iframe!-->

If you want to get in touch (e.g. to correct biological misconsceptions), please contact me at {{< cloakemail "abrahams.gabi@gmail.com" >}}. Thanks for reading!