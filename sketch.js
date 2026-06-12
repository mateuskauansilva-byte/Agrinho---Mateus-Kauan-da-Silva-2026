// Variáveis para controlar a história e os elementos visuais
let fase = 0; // 0: Solo, 1: Chuva, 2: Sol, 3: Colheita
let totalFases = 4;
let pingo = [];
let tamanhoPlanta = 0;
let maxPlanta = 120;
let nuvemX = -100;

function setup() {
  createCanvas(800, 600);
  
  // Criando as gotas de chuva para a fase 1
  for (let i = 0; i < 100; i++) {
    pingo.push({
      x: random(width),
      y: random(-height, 0),
      velocidade: random(4, 7)
    });
  }
}

function draw() {
  // Transição de cores do fundo dependendo da fase (Clima)
  if (fase === 0) background(135, 206, 235); // Céu claro
  else if (fase === 1) background(100, 110, 120); // Céu nublado/chuva
  else if (fase === 2) background(135, 210, 250); // Céu bem iluminado
  else if (fase === 3) background(255, 223, 186); // Entardecer da colheita

  // --- DESENHANDO O CENÁRIO COMUM ---
  
  // Solo Orgânico (Terra rica em nutrientes)
  noStroke();
  fill(84, 51, 36); // Marrom escuro (solo saudável/humus)
  rect(0, 450, width, 150);
  
  // Base de grama/cobertura morta protetora do solo
  fill(46, 125, 50);
  rect(0, 440, width, 15);

  // --- LÓGICA E ELEMENTOS DE CADA FASE ---

  if (fase === 0) {
    desenharTexto("1. Solo Vivo e Nutrito", "Na agricultura orgânica, cuidamos da terra com adubo natural.\nO solo está pronto e protegido. [Clique para chover]");
    tamanhoPlanta = 0; // Reseta tamanho
    
    // Desenha sementes na terra
    fill(210, 180, 140);
    circle(200, 470, 8);
    circle(400, 470, 8);
    circle(600, 470, 8);
  } 
  
  else if (fase === 1) {
    desenharTexto("2. A Água que Nutre", "A chuva chega para ativar a vida no solo.\nSem agrotóxicos, a água infiltra limpa nos lençóis freáticos. [Clique para o Sol]");
    
    // Animação das nuvens entrando
    fill(180);
    ellipse(nuvemX, 80, 150, 80);
    ellipse(nuvemX + 60, 90, 130, 70);
    if (nuvemX < width / 2) nuvemX += 3;
    
    // Desenha e atualiza a chuva
    stroke(174, 219, 242);
    strokeWeight(2);
    for (let i = 0; i < pingo.length; i++) {
      line(pingo[i].x, pingo[i].y, pingo[i].x, pingo[i].y + 10);
      pingo[i].y += pingo[i].velocidade;
      if (pingo[i].y > 440) {
        pingo[i].y = random(-50, 0);
      }
    }
    noStroke();
    
    // Começa a brotar bem devagar
    if (tamanhoPlanta < 20) tamanhoPlanta += 0.2;
    desenharPlantas(tamanhoPlanta, false);
  } 
  
  else if (fase === 2) {
    desenharTexto("3. Sol e Fotossíntese", "O sol brilha forte gerando energia natural!\nAs plantas crescem saudáveis e em harmonia com a natureza. [Clique para Colher]");
    
    // Afasta a nuvem da chuva
    nuvemX = -100;
    
    // Desenha o Sol com raios expansivos
    fill(255, 204, 0);
    let raioSol = 120 + sin(frameCount * 0.05) * 10;
    circle(700, 100, raioSol);
    
    // Crescimento acelerado com o sol
    if (tamanhoPlanta < maxPlanta) tamanhoPlanta += 0.8;
    desenharPlantas(tamanhoPlanta, false);
  } 
  
  else if (fase === 3) {
    desenharTexto("4. Colheita Sustentável e Renovação", "Alimentos orgânicos puros e cheios de vida!\nO agro forte respeita o ciclo e preserva o futuro. [Clique para Reiniciar]");
    
    // Sol poente suave
    fill(242, 108, 37, 150);
    circle(700, 200, 100);
    
    // Desenha plantas adultas com frutos saudáveis
    desenharPlantas(tamanhoPlanta, true);
  }
}

// Função auxiliar para desenhar as plantas nas posições
function desenharPlantas(tam, temFruto) {
  let posicoesX = [200, 400, 600];
  
  for (let x of posicoesX) {
    // Caule
    stroke(76, 175, 80);
    strokeWeight(6);
    line(x, 440, x, 440 - tam);
    
    // Folhas (só aparecem se a planta tiver crescido um pouco)
    if (tam > 15) {
      noStroke();
      fill(56, 142, 60);
      ellipse(x - 15, 440 - tam/2, 20, 10);
      ellipse(x + 15, 440 - tam * 0.7, 20, 10);
    }
    
    // Frutos orgânicos (Tomates ou grandes frutos dourados na fase final)
    if (temFruto) {
      noStroke();
      fill(234, 32, 39); // Vermelho tomate orgânico
      circle(x - 10, 440 - tam * 0.8, 18);
      circle(x + 12, 440 - tam * 0.6, 15);
      
      // Detalhe da folhinha no fruto
      fill(27, 94, 32);
      triangle(x - 10, 440 - tam * 0.8 - 12, x - 13, 440 - tam * 0.8 - 8, x - 7, 440 - tam * 0.8 - 8);
    }
  }
  noStroke();
}

// Função auxiliar para renderizar os textos educativos na tela
function desenharTexto(titulo, subtitulo) {
  // Caixa de fundo para o texto ficar bem legível
  fill(255, 255, 255, 200);
  rect(30, 30, 480, 120, 10);
  
  // Título do capítulo
  fill(27, 94, 32);
  textSize(22);
  textStyle(BOLD);
  text(titulo, 50, 65);
  
  // Descrição pedagógica
  fill(50);
  textSize(14);
  textStyle(NORMAL);
  text(subtitulo, 50, 90);
}

// Avança a história de forma interativa através do clique do mouse
function mousePressed() {
  fase = (fase + 1) % totalFases;
}