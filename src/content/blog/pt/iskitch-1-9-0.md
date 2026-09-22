---
title: "iSkitch 1.9.0 e 1.8.1: WebP, um JPEG que diz a verdade e capturas sem permissão"
description: "Duas versões num mês, ambas nascidas de emails de suporte: colar uma captura sem a permissão de Gravação de ecrã, capturas nítidas em ecrãs dimensionados, exportação para WebP, a qualidade na janela de guardar e o cursor JPEG que dizia 80 % e escrevia 94."
lang: "pt"
pubDate: 2026-09-22
order: 7
heroAlt: "A janela de guardar do iSkitch com o menu Formato em WebP e o cursor Qualidade."
tags: ["iSkitch", "versão", "macOS"]
related: ["iskitch-1-8-0", "how-to-take-screenshots-on-mac"]
---

Desde a [1.8.0](/pt/blog/iskitch-1-8-0/) chegaram duas atualizações à Mac App Store: a 1.8.1 a 17 de setembro e a 1.9.0 a 22. Ambas começaram como emails de suporte. Um vinha de alguém com um Mac de empresa que não podia conceder ao iSkitch a permissão de Gravação de ecrã. O outro vinha da Áustria, com quatro sugestões e, uns dias depois, uma medição que nos fez retirar uma build da revisão da Apple.

## 1.8.1: sem permissão de Gravação de ecrã? Também dá

Num Mac gerido pela empresa, sem direitos de administrador, não é possível conceder a permissão de Gravação de ecrã. E sem ela, «Capturar» não serve para nada. O Skitch resolveu isto há anos com a área de transferência: fazes a captura com o macOS e colas no Skitch. O iSkitch não sabia fazê-lo.

Agora sabe. **Ficheiro ▸ Novo a partir da área de transferência (⇧⌘N**, o atalho do Skitch) abre como documento novo a imagem que estiver na área de transferência. E **⌘V faz o mesmo** sempre que nenhum campo de texto esteja à espera, por isso volta o hábito de sempre: ⌃⇧⌘4 do macOS e colar. Nada disto passa pela captura de ecrã, logo não precisa de permissão, e uma captura Retina mantém os seus píxeis a 2×.

Quando uma captura falha por falta de permissão, o aviso explica agora as duas alternativas (continuar com ⇧⌘4 do macOS e deixar o iSkitch abrir cada captura, ou colar com ⇧⌘N) e tem um botão que ativa a primeira ali mesmo.

### A captura desfocada de que três pessoas se tinham queixado

A mesma pessoa enviou-nos um vídeo de um Mac mini com um monitor 4K a 2560×1440, e finalmente se viu de onde vinham as queixas de «baixa resolução». Não da exportação, como pensávamos. Da própria captura.

Pedíamos ao ScreenCaptureKit um bitmap do tamanho de `CGDisplayPixelsWide`, que apesar do nome devolve **pontos** em qualquer modo Retina. Num ecrã dimensionado, a captura de região saía a 1×; naquele Mac mini chegava a 2×, mas interpolada, mole. As capturas de região e de ecrã completo passam agora pelo mesmo mecanismo do ⇧⌘4 do macOS. Medido contra o `screencapture` no mesmo retângulo: **zero píxeis diferentes**.

## 1.9.0: WebP, e a qualidade onde se guarda

O macOS lê WebP há anos e continua sem o escrever. O iSkitch traz agora o seu próprio codificador (libwebp, o oficial da Google; o aviso está em «Acerca»), e assim **o WebP junta-se a PNG, JPG, TIFF, PDF, GIF e BMP** nas Definições, no botão de guardar do editor e na janela de guardar, com qualidade ajustável e transparência. **100 % guarda sem perdas**, como fazem as ferramentas de WebP. E como o formato não tem campo para a resolução, escrevemo-la num bloco EXIF que a Pré-visualização e o ImageIO leem: uma captura Retina abre a 144 dpi e no seu tamanho real, não ao dobro.

À própria janela de guardar nasceram um menu **Formato** e, para JPEG e WebP, um cursor **Qualidade**, como a folha Exportar da Pré-visualização. O que escolheres aí fica como predefinição.

E **Redimensionar imagem** saiu do esconderijo. Estava no menu Imagem desde a 1.8.0 e ninguém o encontrava, nem quem nos escreveu da Áustria, que o pediu como função nova. Agora tem atalho (**⇧⌘R**), um botão na barra de recorte e outro ao lado das medidas em píxeis no fundo do editor; clicar nos números «L × A px» também o abre.

## Os 80 % que eram um 94

Entre as quatro sugestões vinha uma queixa que julgávamos respondida: os JPEG do iSkitch pesavam demasiado. A nossa primeira resposta dizia que o ficheiro estava bem e que a ferramenta de medição se enganava. Então essa pessoa mediu a mesma captura em cinco apps com os mesmos «80 %». iSkitch: 131 KB. As outras: entre 31 e 46 KB.

Tinha razão. O codificador JPEG integrado no macOS tem a sua própria escala de qualidade, e o seu 80 escreve as tabelas de quantização a que o Affinity, o XnConvert, o Squoosh, o ImageMagick e a libjpeg chamam todos **94**. Lemos as tabelas nós próprios para o confirmar: o 0,5 da Apple é o 80 padrão, e os seus 0,85 e 0,9 escrevem exatamente o mesmo ficheiro.

A build 25 já estava em revisão na Apple. Retirámo-la. A build 26 traduz o valor do cursor para a escala do codificador com uma tabela medida ponto a ponto, por isso o número que escolhes é o que qualquer ferramenta lê do ficheiro, e o tamanho fica a par dos outros. Se tinhas uma qualidade ajustada, vais ver ficheiros mais pequenos com o mesmo número; os 90 % predefinidos são agora um 90 a sério.

## O resto

- **A barra de recorte falava em pontos.** Numa captura Retina dizia 1280 × 800 enquanto a barra inferior dizia 2560 × 1600. Agora trabalha em píxeis, di-lo, e escrever 1281 recorta exatamente para 1281 (antes dava 1282).
- **As imagens pequenas abrem centradas**, em vez de coladas ao canto superior esquerdo da janela mínima de 800 × 600 do editor.
- **Um pedido de avaliação.** Após cinco exportações e pelo menos três dias de uso, o iSkitch pede uma avaliação com a folha nativa do sistema: uma vez por versão, nunca mais de uma a cada quatro meses e nunca em resposta a um clique. Nada em troca. Contamo-lo aqui porque é a segunda coisa, depois da janela da newsletter, que a app te pode mostrar sem que peças.

## Já disponível

A 1.9.0 está na Mac App Store desde 22 de setembro de 2026. Atualização gratuita para quem já tem o iSkitch, sem subscrição e sem conta.
