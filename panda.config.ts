// panda.config.ts — Tema Retro Blueprint
// Palet warna diambil dari referensi desain AQUA:
//   Biru royal  #3B5FD4  → aksen utama, tombol, border focus
//   Biru muda   #DDE6F5  → sidebar, panel, latar fieldset
//   Putih       #FFFFFF  → area konten, input background
//   Navy        #1E293B  → teks utama
//   Abu slate   #64748B  → teks sekunder, placeholder
//   Border      #CBD5E1  → border input & panel

import { defineConfig } from '@pandacss/dev'

export default defineConfig({
  preflight: true,
  include: ['./src/**/*.{html,js,ts}'],
  exclude: [],
  outdir: 'src/styled-system',

  theme: {
    tokens: {

      colors: {
        // ── Aksen utama — biru royal dari tombol Submit ──────
        blue: {
          50:  { value: '#EEF2FF' }, // latar sangat muda
          100: { value: '#DDE6F5' }, // sidebar / panel
          200: { value: '#BFCFED' }, // border panel
          300: { value: '#93AEDD' }, // border fokus muda
          500: { value: '#3B5FD4' }, // ← UTAMA: tombol, aksen
          700: { value: '#2A47A8' }, // hover tombol
          900: { value: '#1E3170' }, // teks gelap / heading
        },

        // ── Latar & surface ───────────────────────────────────
        paper: {
          white:  { value: '#FFFFFF' }, // area konten utama
          soft:   { value: '#F8FAFF' }, // outer background
          panel:  { value: '#EEF2FB' }, // latar fieldset / card
          sidebar:{ value: '#DDE6F5' }, // sidebar navigasi
        },

        // ── Teks ──────────────────────────────────────────────
        ink: {
          dark:   { value: '#1E293B' }, // teks utama (navy)
          mid:    { value: '#334155' }, // heading sekunder
          muted:  { value: '#64748B' }, // placeholder, label kecil
          faint:  { value: '#94A3B8' }, // hint, disabled
        },

        // ── Border ────────────────────────────────────────────
        border: {
          light:  { value: '#E2E8F0' }, // border paling halus
          default:{ value: '#CBD5E1' }, // border input normal
          medium: { value: '#93AEDD' }, // border panel / fieldset
          focus:  { value: '#3B5FD4' }, // border saat fokus
        },

        // ── Semantik ──────────────────────────────────────────
        danger:  { value: '#EF4444' },
        success: { value: '#22C55E' },
        warning: { value: '#F59E0B' },
      },

      fonts: {
        // Font display retro — VT323 untuk judul & badge
        display: { value: "'VT323', 'Courier New', monospace" },
        // Font body — Martian Mono untuk teks biasa
        body:    { value: "'Martian Mono', 'Courier Prime', monospace" },
        // Font code — Inconsolata untuk kode & input
        code:    { value: "'Inconsolata', 'Courier New', monospace" },
        // Sans fallback untuk elemen UI kecil
        sans:    { value: "'Segoe UI', system-ui, sans-serif" },
      },

      fontSizes: {
        xs:   { value: '10px' },
        sm:   { value: '12px' },
        base: { value: '14px' },
        md:   { value: '15px' },
        lg:   { value: '18px' },
        xl:   { value: '24px' },
        '2xl':{ value: '32px' },
        '3xl':{ value: '44px' },
      },

      fontWeights: {
        normal:  { value: '400' },
        medium:  { value: '500' },
        semibold:{ value: '600' },
        bold:    { value: '700' },
      },

      spacing: {
        1: { value: '4px'  },
        2: { value: '8px'  },
        3: { value: '12px' },
        4: { value: '16px' },
        5: { value: '20px' },
        6: { value: '24px' },
        8: { value: '32px' },
        10:{ value: '40px' },
        12:{ value: '48px' },
      },

      radii: {
        none: { value: '0px' },
        sm:   { value: '2px' },  // retro — sudut tajam
        md:   { value: '4px' },
        lg:   { value: '6px' },
      },

      shadows: {
        // Shadow tipis untuk card — nuansa kertas berlapis
        card: { value: '0 1px 4px rgba(59,95,212,0.08), 0 0 0 1px rgba(59,95,212,0.06)' },
        input:{ value: '0 0 0 3px rgba(59,95,212,0.12)' },
      },
    },

    // ── Semantic tokens — alias bermakna ────────────────────────
    semanticTokens: {
      colors: {
        // Background hierarki
        'bg.outer':   { value: '{colors.paper.soft}'    }, // luar window
        'bg.base':    { value: '{colors.paper.white}'   }, // area form
        'bg.panel':   { value: '{colors.paper.panel}'   }, // fieldset
        'bg.sidebar': { value: '{colors.paper.sidebar}' }, // sidebar
        'bg.input':   { value: '{colors.paper.white}'   }, // input field

        // Border hierarki
        'border.subtle':  { value: '{colors.border.light}'   },
        'border.default': { value: '{colors.border.default}' },
        'border.panel':   { value: '{colors.border.medium}'  },
        'border.focus':   { value: '{colors.border.focus}'   },

        // Teks hierarki
        'text.heading':   { value: '{colors.ink.dark}'   },
        'text.body':      { value: '{colors.ink.mid}'    },
        'text.secondary': { value: '{colors.ink.muted}'  },
        'text.placeholder':{ value: '{colors.ink.faint}' },
        'text.accent':    { value: '{colors.blue.500}'   },
        'text.error':     { value: '{colors.danger}'     },

        // Aksen
        'accent.primary': { value: '{colors.blue.500}' },
        'accent.hover':   { value: '{colors.blue.700}' },
        'accent.light':   { value: '{colors.blue.50}'  },
      },
    },

    // ── Recipes — komponen yang bisa dipakai ulang ─────────────
    recipes: {

      // Tombol retro — blueprint style
      button: {
        className: 'retro-btn',
        base: {
          fontFamily:    'var(--fonts-code)',
          fontSize:      '12px',
          fontWeight:    '600',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          padding:       '10px 24px',
          cursor:        'pointer',
          border:        '1px solid transparent',
          borderRadius:  'var(--radii-sm)',
          transition:    'all 0.15s ease',
          outline:       'none',
          position:      'relative',
          '&:disabled': {
            opacity: '0.45',
            cursor:  'not-allowed',
          },
          // Underline retro di bawah tombol (efek cap/stamp)
          '&::after': {
            content:     '""',
            position:    'absolute',
            bottom:      '-2px',
            left:        '2px',
            right:       '-2px',
            height:      '2px',
            background:  'rgba(0,0,0,0.15)',
            borderRadius:'0 0 2px 2px',
          },
        },
        variants: {
          visual: {
            // Primer — biru royal seperti tombol Submit di referensi
            primary: {
              background:  'var(--colors-blue-500)',
              color:       '#FFFFFF',
              borderColor: 'var(--colors-blue-700)',
              boxShadow:   'inset 0 1px 0 rgba(255,255,255,0.15)',
              '&:hover:not(:disabled)': {
                background: 'var(--colors-blue-700)',
                boxShadow:  'inset 0 1px 0 rgba(255,255,255,0.1)',
              },
              '&:active:not(:disabled)': {
                transform: 'translateY(1px)',
              },
            },
            // Sekunder — outline biru, latar transparan
            secondary: {
              background:  'transparent',
              color:       'var(--colors-blue-500)',
              borderColor: 'var(--colors-blue-300)',
              '&:hover:not(:disabled)': {
                background:  'var(--colors-blue-50)',
                borderColor: 'var(--colors-blue-500)',
              },
            },
            // Ghost — sangat minimal
            ghost: {
              background:  'transparent',
              color:       'var(--colors-ink-muted)',
              borderColor: 'var(--colors-border-default)',
              '&:hover:not(:disabled)': {
                background:  'var(--colors-paper-panel)',
                color:       'var(--colors-ink-dark)',
                borderColor: 'var(--colors-border-medium)',
              },
            },
            // Danger — merah untuk aksi destruktif
            danger: {
              background:  'transparent',
              color:       'var(--colors-danger)',
              borderColor: '#FCA5A5',
              '&:hover:not(:disabled)': {
                background: 'rgba(239,68,68,0.06)',
              },
            },
          },
        },
        defaultVariants: { visual: 'primary' },
      },

      // Input retro — blueprint typewriter style
      input: {
        className: 'retro-input',
        base: {
          width:        '100%',
          background:   'var(--colors-paper-white)',
          border:       '1px solid var(--colors-border-default)',
          borderLeft:   '3px solid var(--colors-blue-200)',
          borderRadius: 'var(--radii-sm)',
          color:        'var(--colors-ink-dark)',
          fontFamily:   'var(--fonts-code)',
          fontSize:     '13px',
          padding:      '9px 12px',
          outline:      'none',
          transition:   'border-color 0.15s, box-shadow 0.15s',
          '&::placeholder': {
            color:     'var(--colors-ink-faint)',
            fontStyle: 'italic',
          },
          '&:focus': {
            borderColor:     'var(--colors-border-focus)',
            borderLeftColor: 'var(--colors-border-focus)',
            boxShadow:       'var(--shadows-input)',
          },
          '&[data-error="true"]': {
            borderColor:     'var(--colors-danger)',
            borderLeftColor: 'var(--colors-danger)',
            boxShadow:       '0 0 0 3px rgba(239,68,68,0.1)',
          },
        },
      },

      // Badge / tag retro
      badge: {
        className: 'retro-badge',
        base: {
          display:       'inline-block',
          fontFamily:    'var(--fonts-code)',
          fontSize:      '10px',
          fontWeight:    '600',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          padding:       '2px 8px',
          border:        '1px solid',
          borderRadius:  'var(--radii-none)',
        },
        variants: {
          color: {
            blue:  { color: 'var(--colors-blue-900)', borderColor: 'var(--colors-blue-300)', background: 'var(--colors-blue-50)' },
            green: { color: '#14532D', borderColor: '#86EFAC', background: '#F0FDF4' },
            red:   { color: '#7F1D1D', borderColor: '#FCA5A5', background: '#FEF2F2' },
          },
        },
        defaultVariants: { color: 'blue' },
      },
    },
  },
})
