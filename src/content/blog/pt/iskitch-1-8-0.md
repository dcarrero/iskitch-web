---
title: "O iSkitch 1.8.0 já está disponível, e o erro que estava lá desde o primeiro dia"
description: "Capturar uma janela nunca capturou uma janela. Corrigi-lo abriu a porta à sombra, ao fundo transparente, aos atalhos globais a sério, ao redimensionamento e à exportação para GIF e BMP."
lang: "pt"
pubDate: 2026-08-26
updatedDate: 2026-08-27
order: 6
heroAlt: "Uma janela capturada com a sua sombra e os cantos arredondados sobre fundo transparente."
tags: ["iSkitch", "versão", "macOS"]
related: ["skitch-features-compared", "how-to-take-screenshots-on-mac"]
---

Há dois dias publicámos uma comparação função a função com o Skitch original, com a lista do que o iSkitch ainda não sabia fazer. Ao percorrer essa lista apareceu algo que não esperávamos: **capturar uma janela nunca capturou uma janela.**

## O erro que estava lá desde o início

Escolhes «Capturar janela», carregas no Safari e obténs uma imagem do Safari. Quase sempre. Mas se havia alguma coisa por cima — um painel flutuante, outra janela, uma notificação — vinha dentro.

Porque a aplicação não estava a capturar a janela. Tirava uma imagem do **ecrã inteiro** e recortava o retângulo da janela. Tudo o que estivesse dentro desse retângulo entrava na captura, pertencesse à janela ou não.

A função que pede ao macOS uma janela isolada existia desde a primeira versão. Ninguém lhe chamava. Código morto, enquanto todas as capturas de janela passavam pelo recorte.

Isso explica também uma coisa que nos escapava: a sombra e os cantos transparentes que acabáramos de implementar não apareciam em lado nenhum. Claro que não: o código que os produzia nunca era executado.

## O que essa correção permite

Agora que as janelas são mesmo capturadas como janelas, saem **com a sua sombra e os cantos arredondados, sobre fundo transparente** em vez do que estivesse por trás na secretária. Colada num documento ou numa conversa, é a diferença entre uma captura e um recorte.

Um pormenor de que temos algum orgulho: a sombra é desenhada pelo iSkitch, não pelo macOS. O ScreenCaptureKit sabe fazê-lo, mas mete-a **dentro** do buffer pedido: medido numa janela de 2168 px, o conteúdo encolhia para 2038 px para lhe dar espaço. Uma aplicação de capturas não pode reamostrar a tua janela para 0,94×. Por isso pedimo-la sem sombra, em resolução nativa, e a sombra compomo-la nós.

## Os atalhos que não eram atalhos

⌥⌘5 para uma janela, ⌥⌘3 para o ecrã inteiro, ⌥⇧⌘4 para repetir a última área. Estavam documentados, estavam no menu e, fora da aplicação, **não faziam nada**. Só ⌥⌘4 estava registado como atalho global; os outros eram itens de menu normais, que exigem ter o iSkitch à frente. Ou seja, precisamente quando não está.

Os quatro são agora atalhos globais a sério, juntou-se-lhes um quinto (**⌥⇧⌘5** apanha a janela que tens à frente, sem apontar) e **os cinco mudam-se um a um** em Definições ▸ Captura ▸ Atalho.

## O resto

- **Redimensionar a imagem** — Imagem ▸ Redimensionar imagem…, em píxeis, com proporções bloqueadas e atalhos a 25, 50, 75 e 100 %. As anotações acompanham e ⌘Z desfaz tudo de uma vez.
- **Exportar para GIF e BMP**, que se juntam a PNG, JPG, TIFF e PDF.
- **Intensidade regulável** da pixelização e da desfocagem, guardada em cada anotação: na mesma captura podes insinuar um IP e deixar uma palavra-passe completamente ilegível.

## Uma nota honesta sobre privacidade

A 1.8.0 acrescenta uma janela que te convida a subscrever as novidades. É a primeira vez que o iSkitch pode enviar seja o que for, por isso somos precisos: a aplicação continua a funcionar inteiramente sem ligação, as tuas capturas continuam a não sair do Mac, e a única coisa que pode sair é o teu endereço de e-mail — e só se o escreveres, marcares a caixa e carregares no botão.

Reescrevemos a [política de privacidade](/pt/privacy/) em conformidade, nos oito idiomas. Antes dizia que a aplicação «nunca se liga aos nossos servidores», e a partir desta versão isso deixaria de ser verdade.

## Já disponível

A 1.8.0 está na Mac App Store desde 27 de agosto de 2026. É uma atualização gratuita para quem já tem o iSkitch. Como sempre: sem subscrição e sem conta.
