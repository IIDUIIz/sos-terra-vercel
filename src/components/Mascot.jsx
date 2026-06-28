import React from 'react';

// Terra — mascote do SOS Terra. Usa a arte oficial (PNG com fundo transparente)
// em public/mascote/. Cada pose mapeia para um arquivo terra-<pose>.png.
const poses = {
  acenando: '/mascote/terra-acenando.png',
  reciclando: '/mascote/terra-reciclando.png',
  animado: '/mascote/terra-animado.png',
  pensativo: '/mascote/terra-pensativo.png',
};

const poseAlt = {
  acenando: 'Terra acenando',
  reciclando: 'Terra reciclando',
  animado: 'Terra comemorando',
  pensativo: 'Terra pensativa',
};

export default function Mascot({ pose = 'acenando', size = 80, className = '' }) {
  const src = poses[pose] || poses.acenando;
  return (
    <img
      src={src}
      width={size}
      height={size}
      alt={poseAlt[pose] || 'Terra, mascote do SOS Terra'}
      className={`select-none object-contain ${className}`}
      style={{ width: size, height: 'auto' }}
      draggable={false}
    />
  );
}
