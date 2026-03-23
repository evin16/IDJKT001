import {
    defineConfig, presetUno, presetIcons, transformerDirectives 
} from 'unocss'

export default defineConfig({
  presets: [
    presetUno(), 
    presetIcons({ scale: 1.2 }),
  ],

  transformers: [transformerDirectives()],
  shortcuts: {
    'flex-center':  'flex items-center justify-center',
    'flex-between': 'flex items-center justify-between',
    'flex-col-gap': 'flex flex-col gap-4',

    'retro-label':  'font-mono text-xs tracking-widest uppercase',
    'retro-title':  'font-mono text-2xl tracking-wide',
    'retro-panel':  'border border-solid border-[#2d4a2d] bg-[#14201a]',
    'retro-panel-lit': 'border border-solid border-[#22c55e] bg-[#14201a]',
    'field-group':  'flex flex-col gap-1.5 mb-4',
    'action-bar':   'flex items-center justify-end gap-3 pt-4',
  },

  rules: [
    [/^glow-(\w+)$/, ([, color]) => ({
      'text-shadow': color === 'green'
        ? '0 0 6px rgba(34,197,94,.5), 0 0 20px rgba(34,197,94,.2)'
        : '0 0 6px rgba(34,211,238,.5), 0 0 20px rgba(34,211,238,.2)'
    })],

    ['ring-glow', {
      'box-shadow': '0 0 8px rgba(34,197,94,0.25)'
    }],

    ['bg-dot-grid', {
      'background-image':
        'radial-gradient(circle, rgba(34,197,94,0.07) 1px, transparent 1px)',
      'background-size': '24px 24px',
    }],

    ['crt-lines', {
      'background-image':
        'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)',
    }],

    ['font-display', {
      'font-family': "'VT323', 'Courier New', monospace"
    }],
    ['font-retro', {
      'font-family': "'Martian Mono', 'Courier Prime', monospace"
    }],
  ],

  theme: {
    colors: {
      phosphor:  '#3B5FD4',
      terminal:  '#EEF2FB',
      surface:   '#DDE6F5',
      'p-cyan':  '#22d3ee',
      'p-amber': '#f59e0b',
      'p-red':   '#ef4444',
    },
  },
})