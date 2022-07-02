---
title: Contrapositive Proof Presentation with LaTeX
description: A paper on contrapostive proofs within discrete mathematics.
pubDate: Mon, 23 May 2022
author: CM-IV
layout: ../../layouts/blogPost.astro
draft: false
---

*Note: This was taken from the original LaTeX file and hacked together with Markdown using remark-math and rehype-katex.*

**The Contrapositive of Conditionals**

The equivalence between a conditional statement and its contrapostive
is a fundamental law of logic and reason.  [Epp, Susanna S.][1] tells us that
the contrapositive of a conditional statement of the form "$\textit{If p then
q}$" written symbolically is

$$
\sim \textit{q} \to \sim \textit{p}.
$$

In other words, this states that the contrapositive of 
"$\textit{If p then q}$" is "$\textit{If NOT q then
NOT p}$". It is important to remember the fact that 

<form>
    <fieldset>
        <legend></legend>
        <div>A conditional statement is logically equivalent to its contrapositive.</div>
    </fieldset>
</form>
$$
$$

**Direct Proof**

In order to prove statements of the form "$\textit{If p then q}$",
we must show that since $\textit{p}$ is true, $\textit{q}$ must be true also.
According to [Hammack, Richard][2], the setup for writing a direct proof is
actually quite simple.  You start with a $\textbf{proposition}$ sentence, which is 
a true statement that is less significant than a theorem, and then write down
your $\textbf{proof}$ beginning with your supposition that finally ends with
the conclusion section.

**Direct Proof Outline**

<form>
    <fieldset>
        <legend>Proposition If $\textit{p}$, then $\textit{q}$.</legend>
        <div>
            Suppose $\textit{p}$.

            $\vdots$
		    
            Therefore $\textit{q}$.
        </div>
    </fieldset>
</form>
$$
$$

Logic, definitions, and mathematics are used in between the 
first and last lines of the proof to reach the conclusion.

**Contrapostive Proofs**

The contrapositive proof is often used to prove statements of the
form "$\textit{If p then q}$".  Remembering that the conditional
statement is logically equivalent to its contrapostive form,
we use the direct proof to show that the contrapositive of
the afforementioned conditional is true.
The first line of the proof includes the sentence "$\textit{Suppose q is NOT true}.$"
The last line of the proof, following the logic and definitions, goes 
"$\textit{Therefore p is not true.}$"

**Contrapositive Proof Outline**

<form>
    <fieldset>
        <legend>Proposition If $\textit{p}$, then $\textit{q}$.</legend>
        <div>
            Suppose $\sim \textit{q}$.

            $\vdots$
		    
            Therefore $\sim \textit{p}$.
        </div>
    </fieldset>
</form>
$$
$$

**Proof Exercies**

<form>
    <fieldset>
        <legend>Proposition Suppose $\textit{x, y, z} \in \mathbb{Z}$ and $\textit{x} \ne 0.$ If $\textit{x}\not|\textit{yz}$, then 
$\textit{x}\not|\textit{y}$ and $\textit{x}\not|\textit{z}$.</legend>
        <div>
            $\textit{Proof}$. 
            (Contrapositive) 
            Suppose if $\textit{x}|\textit{y}$ or $\textit{x}|\textit{z}$, 
            then $\textit{x}|\textit{yz}$.

            In Definition 4.4, [Hammack, Richard][2] tells us that $\textit{x}|\textit{y}$ 
            means $\textit{y} = \textit{xc}$, for some $\textit{c} \in \mathbb{Z}$.  Multiplying
            the previous equation by $\textit{z}$ will then give us $\textit{yz} = \textit{xzc}$.  
            Fact 4.1 tells us that given any two integers, their products are also 
            integers.  Knowing this fact, we can take $\textit{c'}$ of $\textit{zc}$ and 
            we end up with $\textit{yz} = \textit{xc'}$. Therefore, if $\textit{x}$|$\textit{y}$,
            then $\textit{x}|\textit{yz}$.
        </div>
    </fieldset>
</form>
$$
$$

<form>
    <fieldset>
        <legend>Proposition If $\textit{a} \equiv \textit{b}$ (mod $\textit{n}$) 
and $\textit{c} \equiv \textit{d}$ (mod $\textit{n}$), then $\textit{ac} 
\equiv \textit{bd}$ (mod $\textit{n}$).</legend>
        <div>
            $\textit{Proof}$. 
            (Direct)
            Suppose $\textit{a} \equiv \textit{b}$ (mod $\textit{n}$) 
            and $\textit{c} \equiv \textit{d}$ (mod $\textit{n}$).

            [Epp, Susanna S.][1] tells us in Theorem 8.4.1 Modular Equivalences that, 
            given $\textit{a, b,}$ and $\textit{n} \in \mathbb{Z}$ and that $\textit{n} > 1$,
            we have the statement $\textit{n}|(\textit{a}-\textit{b})$.  
            By definition of congruence modulo $\textit{n}$, we immediately conclude
            that $\textit{a} \equiv \textit{b}$ (mod $\textit{n}$).  Theorem 8.4.1 
            also tells us that there exists some integers $\textit{s}$ and $\textit{t}$ 
            such that $a = c + sn$ and $b = d + tn$.  Then we arrive at
            $ac = (b + sn)(d + tn)$ through substitution.  Next, we get 
            $ac = bd + n(bt + sd + sdn)$ with some algebra.  
            Let $k = bt + sd + stn$.  Then $k$ is an integer and $ac = bd + nk$.  
            Therefore, by using Theorem 8.4.1, $ac \equiv bd$ (mod $\textit{n}$).
        </div>
    </fieldset>
</form>
$$
$$

**References**

[1]: Epp, Susanna S. (2011). *Discrete Mathematics with Applications, Fourth Edition*. Stratton, Richard.

[2]: Hammack, Richard (2018). *Book of Proof, Third Edition*. Hammack, Richard.