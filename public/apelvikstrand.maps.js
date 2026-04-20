(function () {
  function sektion73Ready(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn);
    } else {
      fn();
    }
  }

  sektion73Ready(function sektion73InitMap() {
    const sektion73Canvas = document.getElementById("sektion73MapCanvas");
    if (!sektion73Canvas) return;

    if (!window.mapboxgl) {
      console.error("Mapbox GL JS missing. Ensure mapbox-gl.js loads before apelvikstrand.maps");
      return;
    }

    /* =========================
       i18n (sv / en / de)
       - follows <html lang> if present
       - fallback to /en /de path
       ========================= */

    function sektion73GetLang() {
      const htmlLang = String((document.documentElement && document.documentElement.lang) || "").trim().toLowerCase();
      if (htmlLang === "en" || htmlLang === "de" || htmlLang === "sv") return htmlLang;

      const path = String((location && location.pathname) || "/");
      if (path === "/en" || path.indexOf("/en/") === 0) return "en";
      if (path === "/de" || path.indexOf("/de/") === 0) return "de";
      return "sv";
    }
function sektion73Pick(val, fallback) {
  // Stöd: string, {sv,en,de}, null/undefined
  if (typeof val === "string") return val;
  if (val && typeof val === "object") {
    const v = val[sektion73Lang] ?? val.sv ?? val.en ?? val.de;
    if (typeof v === "string") return v;
  }
  return (typeof fallback === "string") ? fallback : "";
}
    const sektion73Lang = sektion73GetLang();

    const sektion73I18N = {
      sv: {
        map: { ariaLabel: "Interaktiv karta över Apelviken" },
        modal: {
          ariaLabel: "Information",
          closeAria: "Stäng",
          imgSrcLabel: "Bildkälla",
          placeholderH: "Rubrik",
          placeholderP: "Brödtext…",
          placeholderCta1: "Primär CTA",
          placeholderCta2: "Sekundär CTA",
          fallbackCta1: "Boka",
          fallbackCta2: "Visa vägen"
        },
        filter: {
          ariaPrefix: "Filter",
          labelsByLegacy: {
            "Mat & dryck": "Mat & dryck",
            "Boenden": "Boenden",
            "Att göra": "Att göra",
            "Butiker": "Butiker"
          }
        }
      },
      en: {
        map: { ariaLabel: "Interactive map of Apelviken" },
        modal: {
          ariaLabel: "Information",
          closeAria: "Close",
          imgSrcLabel: "Image source",
          placeholderH: "Heading",
          placeholderP: "Body text…",
          placeholderCta1: "Primary CTA",
          placeholderCta2: "Secondary CTA",
          fallbackCta1: "Book",
          fallbackCta2: "Get directions"
        },
        filter: {
          ariaPrefix: "Filter",
          labelsByLegacy: {
            "Mat & dryck": "Food & drink",
            "Boenden": "Stay",
            "Att göra": "Things to do",
            "Butiker": "Shops"
          }
        }
      },
      de: {
        map: { ariaLabel: "Interaktive Karte von Apelviken" },
        modal: {
          ariaLabel: "Information",
          closeAria: "Schließen",
          imgSrcLabel: "Bildquelle",
          placeholderH: "Überschrift",
          placeholderP: "Text…",
          placeholderCta1: "Primäre CTA",
          placeholderCta2: "Sekundäre CTA",
          fallbackCta1: "Buchen",
          fallbackCta2: "Route anzeigen"
        },
        filter: {
          ariaPrefix: "Filter",
          labelsByLegacy: {
            "Mat & dryck": "Essen & Trinken",
            "Boenden": "Unterkünfte",
            "Att göra": "Aktivitäten",
            "Butiker": "Geschäfte"
          }
        }
      }
    };

    function sektion73T(path, fallback) {
      const parts = String(path || "").split(".");
      let cur = (sektion73I18N[sektion73Lang] || sektion73I18N.sv);
      for (let i = 0; i < parts.length; i++) {
        if (!cur || typeof cur !== "object" || !(parts[i] in cur)) {
          cur = null;
          break;
        }
        cur = cur[parts[i]];
      }
      if (typeof cur === "string") return cur;

      cur = sektion73I18N.sv;
      for (let j = 0; j < parts.length; j++) {
        if (!cur || typeof cur !== "object" || !(parts[j] in cur)) {
          cur = null;
          break;
        }
        cur = cur[parts[j]];
      }
      if (typeof cur === "string") return cur;

      return (typeof fallback === "string") ? fallback : "";
    }

    /* =========================
       CONFIG
       ========================= */

    mapboxgl.accessToken = window.__MAPBOX_TOKEN__;

    const sektion73StyleUrl = "mapbox://styles/rutgersson/cml85l84y003c01s6by4kazii";

    // Home: Surbrunnsvägen 2–8, 432 53 Varberg
    const sektion73Home = {
      title: "Surbrunnsvägen 2–8",
      lngLat: [12.262921, 57.081185]
    };
         const sektion73Golf = {
      title: "Surbrunnsvägen 2–8",
      lngLat: [12.248763, 57.084963]
    };
             const sektion73Surfcenter = {
      title: "Surbrunnsvägen 2–8",
      lngLat: [12.263720, 57.079943]
    };
                  const sektion73Majas = {
      title: "Surbrunnsvägen 2–8",
      lngLat: [12.263265, 57.080060]
    };
         const sektion73Kusthotellet = {
      title: "Kusthotellet",
      lngLat: [12.242833, 57.088610]
    };
    // Tångkörarvägen 1, 432 54 Varberg (koordinater från karta-länk)
    const sektion73surfcenter = {
      title: "Tångkörarvägen 1",
      lngLat: [12.250144, 57.084689]
    };
    // Tångkörarvägen 1, 432 54 Varberg (koordinater från karta-länk)
    const sektion73Tangkorar = {
      title: "Tångkörarvägen 1",
      lngLat: [12.2488165, 57.084682]
    };
         const sektion73livs = {
      title: "Apelviken livs",
      lngLat: [12.250247, 57.084998]
    };
const sektion73InitialCenter = {
  title: "Center",
  lngLat: [12.12324908570747, 57.34933574694057]
};
                   const sektion73destinationapelviken = {
      title: "Apelviken livs",
      lngLat: [12.249162, 57.086926]
    };
              const sektion73minigolf = {
      title: "Tångkörarvägen 1",
      lngLat: [12.250167, 57.084695]
    };
  // 2) Sanatorievägen 4, 432 53 Varberg
    const sektion73Sanatorie_4 = {
      title: "Sanatorievägen 4",
      lngLat: [12.24786400, 57.08797000]
    };
const sektion73Tangkorar_4 = {
  title: "Tångkörarvägen 4",
  lngLat: [12.258103, 57.083380]
};
    // 3) Tångkörarvägen 2, 432 54 Varberg
    const sektion73Tangkorar_2 = {
      title: "Tångkörarvägen 2",
      lngLat: [12.25519800, 57.08474700]
    };

    // 4) Tångkörarvägen 10, 432 54 Varberg
    const sektion73Tangkorar_10 = {
      title: "Tångkörarvägen 10",
      lngLat: [12.26327010, 57.07738420]
    };

    // 5) Tångkörarvägen 17, 432 54 Varberg
    const sektion73Tangkorar_17 = {
      title: "Tångkörarvägen 17",
      lngLat: [12.26374100, 57.07980300]
    };
    // Bounds (justera vid behov)
    const sektion73Bounds = [
      [12.065, 57.320], // SW
      [12.165, 57.370] // NE
    ];

    const sektion73MinZoom = 13.2;
    const sektion73MaxZoom = 17.9;
    const sektion73StartZoom = 15.894;
const sektion73SecondaryPinsMinZoom = 15.8;
    // Kamera
    const sektion73Pitch = 63;

    // Visa "från havet in mot land" (väst -> öst):
    // bearing 90 = öst uppåt i bild (kameran tittar mot öst med pitch)
    const sektion73Bearing = 70;

    const sektion73DisableRotate = true;

    // Zoom vid pin-klick
    const sektion73PinZoom = 17.9;

    // Bas-duration (normal zoom-delta)
    const sektion73PinZoomDur = 1100;

    // Extra “premium smooth” om zoom-deltat är stort
    const sektion73PinZoomDurExtraMax = 140;

    // Mol animation
    const sektion73ModalDurMs = 420;

    /* =========================
       MAP INIT
       ========================= */
const sektion73Map = new mapboxgl.Map({
  container: sektion73Canvas,
  style: sektion73StyleUrl,
  center: sektion73InitialCenter.lngLat,
  zoom: sektion73StartZoom,
  pitch: sektion73Pitch,
  bearing: sektion73Bearing,
  maxBounds: sektion73Bounds,
  attributionControl: false,
  antialias: false,
  pitchWithRotate: false,
  dragRotate: false
});



    // Exponera map-instansen för devtools/snabbtest (som du gjort i console)
    window.sektion73Map = sektion73Map;

    sektion73Map.on("error", (e) => {
      console.error("Mapbox error:", e && e.error ? e.error : e);
    });

    sektion73Map.setMinZoom(sektion73MinZoom);
    sektion73Map.setMaxZoom(sektion73MaxZoom);

    // Tillåt scroll-zoom (in/ut med mus-hjul / trackpad)
    sektion73Map.scrollZoom.enable();

    // Behåll dubbelklick-zoom avstängt (som du haft)
    sektion73Map.doubleClickZoom.disable();

    if (sektion73DisableRotate) {
      sektion73Map.dragRotate.disable();
      sektion73Map.touchZoomRotate.disableRotation();
    }

    sektion73Map.addControl(new mapboxgl.AttributionControl({ compact: true }), "bottom-right");




  /* =========================================================
     sektion73 – DEBUG PICK: logga exakt 3D-byggnad vid klick
     - Klicka på huset (taket) du vill ersätta
     - Console visar: layerId + featureId + properties
     ========================================================= */

  (function sektion73DebugPickBuilding_00009() {
    if (!sektion73Map || typeof sektion73Map.queryRenderedFeatures !== "function") return;

    const sektion73EnableDebugPickBuilding_00020 = false;
    if (!sektion73EnableDebugPickBuilding_00020) return;

    function sektion73GetExtrusionLayerIds_00010() {
      try {
        const style = sektion73Map.getStyle && sektion73Map.getStyle();
        const layers = (style && style.layers) ? style.layers : [];
        return layers
          .filter((l) => l && l.id && l.type === "fill-extrusion")
          .map((l) => l.id);
      } catch (e) {
        return [];
      }
    }

    function sektion73PickSimplifyProps_00011(props) {
      const p = props || {};
      const keep = [
        "id",
        "osm_id",
        "name",
        "type",
        "class",
        "height",
        "render_height",
        "min_height",
        "render_min_height",
        "underground",
        "extrude"
      ];
      const out = {};
      for (const k of keep) {
        if (p[k] != null) out[k] = p[k];
      }
      return out;
    }

    function sektion73RankBuildingCandidates_00012(features) {
      const scored = [];
      for (const f of features || []) {
        if (!f || !f.layer) continue;

        const props = f.properties || {};
        const layerId = (f.layer.id || "");
        const layerType = (f.layer.type || "");
        const sourceLayer = (f.sourceLayer || "");
        const source = (f.source || "");

        let score = 0;

        if (layerType === "fill-extrusion") score += 100;
        if ((sourceLayer + "").toLowerCase().includes("building")) score += 40;
        if (layerId.toLowerCase().includes("building")) score += 30;

        if (props.height != null) score += 25;
        if (props.render_height != null) score += 25;
        if (props.min_height != null) score += 10;
        if (props.render_min_height != null) score += 10;
        if (props.underground != null) score += 5;
        if (props.class === "building") score += 15;
        if (props.extrude != null) score += 5;

        if (f.id != null) score += 20;
        if (props.id != null) score += 10;
        if (props.osm_id != null) score += 10;

        if ((source + "").toLowerCase() === "composite") score += 5;

        scored.push({ f, score });
      }

      scored.sort((a, b) => b.score - a.score);
      return scored;
    }

    function sektion73OnPick_00013(e) {
      const extrusionLayerIds = sektion73GetExtrusionLayerIds_00010();

      let feats = [];
      try {
        if (extrusionLayerIds.length) {
          feats = sektion73Map.queryRenderedFeatures(e.point, { layers: extrusionLayerIds }) || [];
        }
      } catch (_) {}

      if (!feats.length) {
        try {
          feats = sektion73Map.queryRenderedFeatures(e.point) || [];
        } catch (_) {}
      }

      const ranked = sektion73RankBuildingCandidates_00012(feats);

      console.clear();
      console.log("sektion73Pick: click lngLat =", e.lngLat);
      console.log("sektion73Pick: extrusion layer ids =", extrusionLayerIds);

      if (!ranked.length) {
        console.log("sektion73Pick: inga features vid klick. Zooma in lite och klicka mer exakt på taket.");
        return;
      }

      const rows = ranked.slice(0, 12).map((x, i) => {
        const f = x.f;
        return {
          rank: i + 1,
          score: x.score,
          layerId: (f.layer && f.layer.id) ? f.layer.id : "",
          layerType: (f.layer && f.layer.type) ? f.layer.type : "",
          source: f.source || "",
          sourceLayer: f.sourceLayer || "",
          featureId: (f.id != null) ? f.id : null,
          props: sektion73PickSimplifyProps_00011(f.properties || {})
        };
      });

      console.table(rows);

      const best = ranked[0].f;
      console.log("sektion73Pick: BEST CANDIDATE (copy these):");
      console.log({
        layerId: best.layer ? best.layer.id : null,
        featureId: best.id != null ? best.id : null,
        source: best.source || null,
        sourceLayer: best.sourceLayer || null,
        properties: best.properties || null
      });
    }

if (!sektion73Map.__sektion73DebugPickBuildingBound_00014) {
  sektion73Map.__sektion73DebugPickBuildingBound_00014 = true;
  sektion73Map.on("click", sektion73OnPick_00013);
  console.log("sektion73Pick: aktiv. Klicka på huset du vill ersätta så loggas kandidater.");
}
})();

function sektion73InjectModalCSS() {
  if (document.getElementById("sektion73MapModalStyle")) return;

  const style = document.createElement("style");
  style.id = "sektion73MapModalStyle";
  style.textContent = `
    :root{
      --sektion73-modal-dur:${sektion73ModalDurMs}ms;
      --sektion73-modal-ease:cubic-bezier(.2,.8,.2,1);
      --sektion73-modal-bg:#ffffff;
      --sektion73-modal-text:#0e1318;
      --sektion73-modal-muted:rgba(14,19,24,.68);
      --sektion73-modal-line:rgba(14,19,24,.14);
      --sektion73-modal-shadow:0 30px 80px rgba(0,0,0,.22);
      --sektion73-accent:#f2b200;
      --sektion73-radius:18px;
      --sektion73-font:'Inter Variable','Inter',ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji';
    }

    html, body, button, input, select, textarea {
      font-family: var(--sektion73-font);
    }

#sektion73MapCanvas .sektion73PinWrap .sektion73PinBubble,
#sektion73MapCanvas .sektion73PinWrap .sektion73PinBtn{
  transition: transform 140ms ease, box-shadow 140ms ease;
  will-change: transform;
}

/* Hover på hela pinnen (wrap) */
#sektion73MapCanvas .sektion73PinWrap:hover .sektion73PinBubble,
#sektion73MapCanvas .sektion73PinWrap:hover .sektion73PinBtn{
  transform: scale(1.15) !important;
}
#sektion73MapCanvas .sektion73PinWrap:active .sektion73PinBubble,
#sektion73MapCanvas .sektion73PinWrap:active .sektion73PinBtn{
  transform: scale(1) !important;
}

    #sektion73MapOverlay{
      position:fixed;
      inset:0;
      background:rgba(0,0,0,.55);
      opacity:0;
      pointer-events:none;
      transition:opacity var(--sektion73-modal-dur) var(--sektion73-modal-ease);
      z-index:2147483000;
    }
    #sektion73MapOverlay.is-open{
      opacity:1;
      pointer-events:auto;
    }

#sektion73MapModal {
    position: fixed;
    background: var(--sektion73-modal-bg);
    color: var(--sektion73-modal-text);
    border: none;
    transition: transform var(--sektion73-modal-dur) var(--sektion73-modal-ease);
    z-index: 2147483001;
    overscroll-behavior: contain;
}

@media (min-width: 769px){
  #sektion73MapModal {
    left: 50%;
    bottom: 32px;
    top: auto;
    right: auto;
    width: min(960px, 92vw);
    height: auto;
    max-height: calc(100vh - 64px);
    transform: translateX(-50%) translateY(calc(100% + 64px));
    display: flex;
    flex-direction: row;
    padding: 0;
    gap: 0;
    border-radius: 24px;
    overflow: hidden;
    box-shadow: 0 24px 60px rgba(0, 0, 0, 0.28);
  }
  #sektion73MapModal.is-open {
    transform: translateX(-50%) translateY(0);
  }
  #sektion73MapModal .sektion73ModalTop {
    display: none;
  }
  #sektion73MapModal .sektion73ModalGallery {
    flex: 0 0 50%;
    align-self: stretch;
    min-height: 0;
  }
  #sektion73MapModal .sektion73ModalSlider {
    width: 100%;
    height: 420px;
    aspect-ratio: auto;
    border-radius: 0;
  }
  #sektion73MapModal .sektion73ModalSlider img {
    height: 420px;
  }
  #sektion73MapModal .sektion73ModalRight {
    flex: 1 1 50%;
    display: flex;
    flex-direction: column;
    padding: 32px;
    gap: 16px;
    overflow-y: auto;
    min-height: 0;
  }
  #sektion73MapModal .sektion73ModalMeta {
    padding: 0 !important;
    background: transparent !important;
    margin: 0 !important;
  }
  #sektion73MapModal .sektion73ModalActions {
    margin-top: auto;
    padding: 0 !important;
  }
}

@media (max-width: 768px){
.sektion73ModalGallery {
        display: flex !important;
        flex-direction: row;
        padding: 0px;
        overflow-x: auto;
        overflow-y: hidden;
        -webkit-overflow-scrolling: touch;
        overscroll-behavior-x: contain;
        scrollbar-width: none;
        touch-action: pan-x;
        scroll-snap-type: none !important;
        scroll-behavior: auto !important;
    }
    .sektion73ModalBodyP {
    font-size: 15px !important;
}
.sektion73ModalBodyH {
    font-size: 31px !important;
}
    .sektion73ModalMeta {
    padding: 26px 26px 0px !important;
    border-radius: 20px !important;
    margin-top: 0px !important;
    background: #fff !important;
            z-index: 4;
}
.sektion73ModalActions {
    margin-top: 25px !important;
    padding: 0px 26px !important;
}
  .sektion73ModalGallery::-webkit-scrollbar{ display:none; }
.sektion73ModalClose {
    top: auto !important;
    bottom: calc(88% + 8px) !important;
}
#sektion73MapModal.is-open {
    transform: translateY(0);
}
#sektion73MapModal {
    position: fixed;
    right: 0;
    bottom: 0;
    height: 88%;
    width: 100%;
    background: var(--sektion73-modal-bg);
    color: var(--sektion73-modal-text);
    border: none;
    transform: translateY(104%);
    transition: transform var(--sektion73-modal-dur) var(--sektion73-modal-ease);
    z-index: 2147483001;
    display: flex;
    flex-direction: column;
    padding-bottom: 32px;
    gap: 0px;
    overscroll-behavior: contain;
    border-radius: 20px 20px 0px 0px;
    overflow: auto;
            top: auto;
}
  /* Låt thumbnails “försvinna” som grid-rad och istället bli cards i samma rad */
  .sektion73ModalGalleryRow{
    display: contents !important;
  }

  /* Alla bilder blir cards med “peek” av nästa under swipe */
  .sektion73ModalGalleryTop,
  .sektion73ModalThumb{
    flex: 0 0 auto;
    width: 82vw;
    max-width: 350px;
    aspect-ratio: 1.57778 / 1;
    border-radius: 16px;
    overflow: hidden;
    border: none;

    /* säkerställ att inget snap smyger in */
    scroll-snap-align: none !important;
  }

  /* Säkerställ att thumbs inte har en annan ratio på mobil */
  .sektion73ModalThumb{
    aspect-ratio: 1.57778 / 1 !important;
  }
}

    .sektion73ModalTop{
      display:flex;
      align-items:flex-start;
      justify-content:space-between;
      gap:12px;
    }
    .sektion73ModalKicker{
      font:700 12px/1.2 var(--sektion73-font);
      color:rgba(14,19,24,.55);
      text-transform:uppercase;
      letter-spacing:.08em;
      margin:0 0 6px 0;
    }
    .sektion73ModalTitle{
      font:800 20px/1.15 var(--sektion73-font);
      margin:0;
    }
.sektion73ModalClose {
    width: 36px;
    height: 36px;
    border-radius: 80px;
    border: none;
    background: rgba(250, 250, 250, 0.72);
    cursor: pointer;
    display: flex;
    place-content: center;
    flex: 0 0 18px;
    position: fixed;
    top: 18px;
    right: 12px;
    backdrop-filter: blur(24px) saturate(1.6);
    -webkit-backdrop-filter: blur(24px) saturate(1.6);
    z-index: 9769675965799657;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    flex-wrap: wrap;
    opacity: 0;
    pointer-events: none;
    transition: opacity var(--sektion73-modal-dur) var(--sektion73-modal-ease);
}
#sektion73MapModal.is-open ~ .sektion73ModalClose {
    opacity: 1;
    pointer-events: auto;
}
.sektion73ModalClose svg {
    width: 18px;
    height: 18px;
    flex: 0 0 18px;
}

    .sektion73ModalGallery{
      display:block;
    }
    .sektion73ModalSlider{
      position:relative;
      width:100%;
      aspect-ratio:1.57778 / 1;
      border-radius:20px 20px 0 0;
      overflow:hidden;
      background:#f1f3f4;
    }
    .sektion73ModalSlider img{
      width:100%;
      height:100%;
      object-fit:cover;
      display:block;
    }
    .sektion73ModalSliderBtn{
      position:absolute;
      top:50%;
      transform:translateY(-50%);
      width:36px;
      height:36px;
      border-radius:999px;
      border:none;
      background:rgba(250,250,250,.72);
      color:#0e1318;
      cursor:pointer;
      display:flex;
      align-items:center;
      justify-content:center;
      box-shadow:rgba(0, 0, 0, 0.24) 0px 3px 8px;
      backdrop-filter:blur(8px);
      -webkit-backdrop-filter:blur(8px);
      z-index:2;
      transition:opacity .15s ease, background .15s ease;
    }
    .sektion73ModalSliderBtn:hover{ background:rgba(255,255,255,1); }
    .sektion73ModalSliderPrev{ left:12px; }
    .sektion73ModalSliderNext{ right:12px; }
    .sektion73ModalSliderBtn[hidden]{ display:none; }
.sektion73ModalGalleryTop {
    width: 100%;
    aspect-ratio: 1.57778 / 1;
    border-radius: 20px 0px 0px 0px;
    overflow: hidden;
    border: none;
}
@keyframes shimmer {
    0% {
        background-position: -468px 0;
    }
    100% {
        background-position: 468px 0;
    }
}

.skeleton-loader {
    background-color: #f1f3f4;
    background-image: linear-gradient(90deg, 
        rgba(255,255,255,0) 0, 
        rgba(255,255,255,0.4) 50%, 
        rgba(255,255,255,0) 100%
    );
    background-size: 600px 100%;
    background-repeat: no-repeat;
    animation: shimmer 1.5s infinite linear;
}

.skeleton-loader:not([src]) {
    min-height: 100%;
    min-width: 100%;
}
    .sektion73ModalGalleryTop img{
      width:100%;
      height:100%;
      object-fit:cover;
      display:block;
    }
.sektion73ModalGalleryRow {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2px;
}
.sektion73ModalThumb {
    aspect-ratio: 1.39778 / 1;
    border-radius: 0px;
    overflow: hidden;
    border: none;
    object-fit: cover;
}
    .sektion73ModalThumb img{
      width:100%;
      height:100%;
      object-fit:cover;
      display:block;
    }

.sektion73ModalMeta {
    display: flex;
    flex-direction: column;
    gap: 0px;
    padding: 32px 40px 0px;
}
.sektion73ModalImgSrc {
    display: none;
}
.sektion73ModalBodyH {
    font-family: var(--sektion73-font);
    margin: 0;
    line-height: 1.25em;
    font-weight: 600;
    font-size: 35px;
}
.sektion73ModalBodyP {
    color: rgb(64, 61, 59);
    margin: 0;
    font-family: var(--sektion73-font);
    font-weight: 400;
    font-size: 16px;
    line-height: 1.55em;
    margin-top: 13px;
}

.sektion73ModalActions {
    margin-top: 27px;
    display: flex;
    padding: 0px 40px;
    flex-direction: row;
    gap: 16px;
}
.sektion73ModalBtn {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    padding: 10px 13px;
    border-radius: 82px;
    border: none;
    transition: 0.15s ease-in-out;
    cursor: pointer;
    font-family: var(--sektion73-font);
    color: #fff;
    font-size: 15px;
    font-weight: 600;
}
    .sektion73ModalBtnPrimary{
      background:#6E99AE;
    }
         .sektion73ModalBtnPrimary:hover{
      background:#5d8499;
    }
                 .sektion73ModalBtnPrimary:active{
      background:#4d7286;
    }
            [id="sektion73ModalCtaSecondary"] {
background: #FFE6A3;
color: #5A3C00;
border: none;
}

[id="sektion73ModalCtaSecondary"]:hover {
background: #FFD870;
}

[id="sektion73ModalCtaSecondary"]:active {
background: #FFD157;
}
.sektion73ModalBtn svg {
display: none;
}

#sektion73MapCanvas .sektion73PinBubble .sektion73PinIco{
display:inline-flex;
align-items:center;
justify-content:center;
width:44px;
height:auto;
flex:0 0 44px;
line-height:0;
}
#sektion73MapCanvas .sektion73PinWrap[data-icon-key="tba5"] .sektion73PinIco{
width:auto;
flex:0 0 auto;
}
    body.sektion73-modal-open {
      overflow: hidden;
      position: fixed;
      width: 100%;
      height: 100%;
      touch-action: none;
    }
.sektion73PinDot {
width: 10px;
height: 10px;
border-radius: 999px;
background: var(--sektion73-accent);
display: none;
}
#sektion73MapCanvas .sektion73PinBubble .sektion73PinIco svg{
width:44px;
height:auto;
display:block;
color:currentColor;
}

#sektion73MapCanvas .sektion73PinWrap[data-icon-key="tba6"] .sektion73PinIco svg{
width:32px;
}
/* Mono-loggor: gör så att paths ärver färg från currentColor */
#sektion73MapCanvas .sektion73PinWrap[data-icon-key="solviken"] .sektion73PinIco svg,
#sektion73MapCanvas .sektion73PinWrap[data-icon-key="brittas"] .sektion73PinIco svg,
#sektion73MapCanvas .sektion73PinWrap[data-icon-key="strandkollektivet"] .sektion73PinIco svg{
fill: currentColor;
}
#sektion73MapCanvas .sektion73PinWrap[data-icon-key="solviken"] .sektion73PinIco svg *,
#sektion73MapCanvas .sektion73PinWrap[data-icon-key="brittas"] .sektion73PinIco svg *,
#sektion73MapCanvas .sektion73PinWrap[data-icon-key="strandkollektivet"] .sektion73PinIco svg *{
fill: currentColor !important;
}

#sektion73MapCanvas .sektion73PinBubble{
gap:10px;
}
.sektion73PinWrap {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 0px;
  transform: translateZ(0);
  position: relative;
  z-index: 1;
}

#sektion73MapCanvas .sektion73PinWrap:hover,
#sektion73MapCanvas .sektion73PinWrap:focus-within {
  z-index: 9999;
}
  .sektion73PinBubble{
  padding:9px 11px;
  border-radius:999px;
  background:var(--sektion73-pin-bubble-bg, rgba(255,255,255,.92));
  backdrop-filter: blur(10px);
  border:1px solid rgba(0,0,0,.14);
  box-shadow:0 16px 36px rgba(0,0,0,.20);
  font:900 13px/1 var(--sektion73-font);
  color:#0e1318;
  white-space:nowrap;
  cursor:pointer;
  user-select:none;
  display:inline-flex;
  align-items:center;
  gap:10px;
}


.sektion73PinPointer{
  width:0;
  height:0;
  border-left:5px solid transparent;
  border-right:5px solid transparent;
  border-top:5px solid var(--sektion73-pin-pointer-top, rgba(255,255,255,.92));
  filter: drop-shadow(0 6px 8px rgba(0,0,0,.18));
  pointer-events: none;
}

.sektion73PinBtn {
  all: unset;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--sektion73-pin-bubble-bg, rgba(255, 255, 255, .92));
  height: max-content;
  padding: 7px;
  border-radius: 8px;
}
  `;
  document.head.appendChild(style);
}


    function sektion73EnsureModalDOM() {
      sektion73InjectModalCSS();

      let overlay = document.getElementById("sektion73MapOverlay");
      if (!overlay) {
        overlay = document.createElement("div");
        overlay.id = "sektion73MapOverlay";
        overlay.addEventListener("click", sektion73CloseModal);
        document.body.appendChild(overlay);
      }

      let modal = document.getElementById("sektion73MapModal");
      if (!modal) {
        modal = document.createElement("aside");
        modal.id = "sektion73MapModal";
        modal.setAttribute("role", "dialog");
        modal.setAttribute("aria-modal", "true");
        modal.setAttribute("aria-label", sektion73T("modal.ariaLabel", "Information"));


        modal.innerHTML = `
          <div class="sektion73ModalTop">
            <div></div>
            <button class="sektion73ModalClose" type="button" id="sektion73ModalCloseBtn" aria-label="${sektion73T("modal.closeAria", "Close")}">
 <svg fill="currentcolor" height="21" viewBox="0 0 1000 1000" width="21" xmlns="http://www.w3.org/2000/svg"><path d="M159 204l55-54 659 659-55 55-659-660m709 5L205 877l-55-59 664-664"></path></svg>
            </button>
          </div>

        <div class="sektion73ModalGallery">
    <div class="sektion73ModalSlider" id="sektion73ModalSlider">
        <img id="sektion73ModalSliderImg" alt="" loading="lazy" class="skeleton-loader">
        <button class="sektion73ModalSliderBtn sektion73ModalSliderPrev" type="button" id="sektion73ModalSliderPrev" aria-label="Föregående bild">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M12 4l-6 6 6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
        <button class="sektion73ModalSliderBtn sektion73ModalSliderNext" type="button" id="sektion73ModalSliderNext" aria-label="Nästa bild">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M8 4l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
    </div>
</div>

          <div class="sektion73ModalRight">
          <div class="sektion73ModalMeta">
            <p class="sektion73ModalImgSrc" id="sektion73ModalImgSrc">${sektion73T("modal.imgSrcLabel", "Image source")}: —</p>
            <h3 class="sektion73ModalBodyH" id="sektion73ModalBodyH">${sektion73T("modal.placeholderH", "Heading")}</h3>
            <p class="sektion73ModalBodyP" id="sektion73ModalBodyP">${sektion73T("modal.placeholderP", "Body text…")}</p>
          </div>

          <div class="sektion73ModalActions">
            <button class="sektion73ModalBtn sektion73ModalBtnPrimary" type="button" id="sektion73ModalCtaPrimary">
              <span id="sektion73ModalCtaPrimaryTxt">Primär CTA</span>
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M9 6l6 6-6 6" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>

            <button class="sektion73ModalBtn" type="button" id="sektion73ModalCtaSecondary">
              <span id="sektion73ModalCtaSecondaryTxt">Sekundär CTA</span>
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M9 6l6 6-6 6" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
          </div>
        `;


        document.body.appendChild(modal);

        const closeBtn = document.getElementById("sektion73ModalCloseBtn");
        if (closeBtn) {
          // Flytta close-knappen ut ur modalen så den kan ligga ovanför på mobil
          // (modalen har transform → fixed barn skulle bli relativ till modalen)
          document.body.appendChild(closeBtn);
          closeBtn.addEventListener("click", sektion73CloseModal);
        }

        document.addEventListener("keydown", (e) => {
          if (e.key === "Escape") sektion73CloseModal();
        });
      }

      return { overlay, modal };
    }

  let sektion73ModalOpen = false;

const sektion73StartView = {
  center: sektion73Home.lngLat,
  zoom: sektion73StartZoom,
  pitch: sektion73Pitch,
  bearing: sektion73Bearing
};

// Dynamiskt sparad vy (användarens senaste läge)
let sektion73ReturnView = null;

function sektion73OpenModal(payload) {
  const { overlay, modal } = sektion73EnsureModalDOM();

  // --- Modal top texts (kicker/title) om du använder dem i DOM (om inte: ignorera)
  // Om du har element-id för dessa, koppla här (exempel):
  const kickerEl = document.getElementById("sektion73ModalKicker");
  const titleEl = document.getElementById("sektion73ModalTitle");
  if (kickerEl) kickerEl.textContent = sektion73Pick(payload.kicker, "");
  if (titleEl) titleEl.textContent = sektion73Pick(payload.title, "");

  // --- Bildkälla
  const imgSrcEl = document.getElementById("sektion73ModalImgSrc");
  const imgSrcLabel = sektion73T("modal.imgSrcLabel", "Image source");
  if (imgSrcEl) {
    const raw = String(sektion73Pick(payload.imgSrc, "") || "").trim();
    imgSrcEl.textContent = raw ? raw : `${imgSrcLabel}: —`;
  }

  // --- H + P (huvudtext)
  const hEl = document.getElementById("sektion73ModalBodyH");
  const pEl = document.getElementById("sektion73ModalBodyP");
  if (hEl) hEl.textContent = sektion73Pick(payload.h, "");
  if (pEl) pEl.textContent = sektion73Pick(payload.p, "");

  // --- Bilder (slider med prev/next)
  const sektion73SliderImages = (payload.images || []).filter(Boolean);
  const sektion73SliderImg = document.getElementById("sektion73ModalSliderImg");
  const sektion73SliderPrev = document.getElementById("sektion73ModalSliderPrev");
  const sektion73SliderNext = document.getElementById("sektion73ModalSliderNext");
  const sektion73SliderCount = document.getElementById("sektion73ModalSliderCount");
  let sektion73SliderIdx = 0;

  function sektion73RenderSlider() {
    if (!sektion73SliderImg) return;
    if (sektion73SliderImages.length === 0) {
      sektion73SliderImg.removeAttribute("src");
      if (sektion73SliderPrev) sektion73SliderPrev.hidden = true;
      if (sektion73SliderNext) sektion73SliderNext.hidden = true;
      if (sektion73SliderCount) sektion73SliderCount.hidden = true;
      return;
    }
    sektion73SliderImg.src = sektion73SliderImages[sektion73SliderIdx];
    if (sektion73SliderPrev) sektion73SliderPrev.hidden = sektion73SliderIdx <= 0;
    if (sektion73SliderNext) sektion73SliderNext.hidden = sektion73SliderIdx >= sektion73SliderImages.length - 1;
    if (sektion73SliderCount) {
      sektion73SliderCount.hidden = sektion73SliderImages.length <= 1;
      sektion73SliderCount.textContent = (sektion73SliderIdx + 1) + " / " + sektion73SliderImages.length;
    }
  }

  if (sektion73SliderPrev) sektion73SliderPrev.onclick = function () {
    sektion73SliderIdx = Math.max(0, sektion73SliderIdx - 1);
    sektion73RenderSlider();
  };
  if (sektion73SliderNext) sektion73SliderNext.onclick = function () {
    sektion73SliderIdx = Math.min(sektion73SliderImages.length - 1, sektion73SliderIdx + 1);
    sektion73RenderSlider();
  };

  // Touch-swipe på mobiler
  const sektion73SliderEl = document.getElementById("sektion73ModalSlider");
  if (sektion73SliderEl) {
    let sektion73SwipeStartX = 0;
    let sektion73SwipeStartY = 0;
    let sektion73SwipeActive = false;

    sektion73SliderEl.ontouchstart = function (e) {
      if (!e.touches || e.touches.length !== 1) return;
      sektion73SwipeStartX = e.touches[0].clientX;
      sektion73SwipeStartY = e.touches[0].clientY;
      sektion73SwipeActive = true;
    };

    sektion73SliderEl.ontouchend = function (e) {
      if (!sektion73SwipeActive) return;
      sektion73SwipeActive = false;
      const t = e.changedTouches && e.changedTouches[0];
      if (!t) return;
      const dx = t.clientX - sektion73SwipeStartX;
      const dy = t.clientY - sektion73SwipeStartY;
      if (Math.abs(dx) < 40 || Math.abs(dy) > Math.abs(dx)) return;
      if (dx < 0 && sektion73SliderIdx < sektion73SliderImages.length - 1) {
        sektion73SliderIdx += 1;
        sektion73RenderSlider();
      } else if (dx > 0 && sektion73SliderIdx > 0) {
        sektion73SliderIdx -= 1;
        sektion73RenderSlider();
      }
    };

    sektion73SliderEl.ontouchcancel = function () {
      sektion73SwipeActive = false;
    };
  }

  sektion73RenderSlider();

  // --- CTA-texter (NU flerspråkiga)
  const cta1 = document.getElementById("sektion73ModalCtaPrimary");
  const cta2 = document.getElementById("sektion73ModalCtaSecondary");
  const cta1t = document.getElementById("sektion73ModalCtaPrimaryTxt");
  const cta2t = document.getElementById("sektion73ModalCtaSecondaryTxt");

  if (cta1t) cta1t.textContent = sektion73Pick(payload.cta1Text, sektion73T("modal.fallbackCta1", "Book"));
  if (cta2t) cta2t.textContent = sektion73Pick(payload.cta2Text, sektion73T("modal.fallbackCta2", "Get directions"));

  if (cta1) {
    cta1.onclick = function () {
      const href = sektion73Pick(payload.cta1Href, payload.cta1Href);
      if (href) window.open(href, "_blank", "noopener,noreferrer");
    };
  }

  if (cta2) {
    const cta2HasText = !!(payload.cta2Text && (payload.cta2Text.sv || payload.cta2Text.en || payload.cta2Text.de));
    const cta2HasHref = !!payload.cta2Href;
    cta2.style.display = (cta2HasText || cta2HasHref) ? "" : "none";

    cta2.onclick = function () {
      const href = sektion73Pick(payload.cta2Href, payload.cta2Href);
      if (href) window.open(href, "_blank", "noopener,noreferrer");
    };
  }

  overlay.classList.remove("is-open");
  modal.classList.remove("is-open");
  void modal.offsetWidth;

  document.body.classList.add("sektion73-modal-open");

  requestAnimationFrame(() => {
    overlay.classList.add("is-open");
    modal.classList.add("is-open");
    sektion73PositionDesktopCloseBtn();
  });

  sektion73ModalOpen = true;
}

function sektion73PositionDesktopCloseBtn() {
  const modalEl = document.getElementById("sektion73MapModal");
  const closeEl = document.getElementById("sektion73ModalCloseBtn");
  if (!modalEl || !closeEl) return;

  const isDesktop = window.matchMedia("(min-width: 769px)").matches;
  if (!isDesktop) {
    // Mobil: rensa inline-styles, CSS-mediaqueryn sköter resten
    closeEl.style.removeProperty("top");
    closeEl.style.removeProperty("left");
    closeEl.style.removeProperty("right");
    closeEl.style.removeProperty("bottom");
    return;
  }

  // Beräkna slutposition från storlek + CSS-bottom (oberoende av transitionen).
  // height/width från getBoundingClientRect påverkas inte av transform.
  const rect = modalEl.getBoundingClientRect();
  const modalH = rect.height;
  const modalW = rect.width;
  const viewportH = window.innerHeight;
  const viewportW = window.innerWidth;
  const modalBottomOffset = 32; // måste matcha CSS: bottom: 32px

  const modalTopY = viewportH - modalBottomOffset - modalH;
  const modalRightX = viewportW / 2 + modalW / 2;

  closeEl.style.top = modalTopY + "px";
  closeEl.style.left = (modalRightX + 12) + "px";
  closeEl.style.right = "auto";
  closeEl.style.bottom = "auto";
}

if (typeof window !== "undefined") {
  window.addEventListener("resize", sektion73PositionDesktopCloseBtn);
}


function sektion73CloseModal() {
  const overlay = document.getElementById("sektion73MapOverlay");
  const modal = document.getElementById("sektion73MapModal");
  if (!overlay || !modal) return;

  document.body.classList.remove("sektion73-modal-open");

  overlay.classList.remove("is-open");
  modal.classList.remove("is-open");
  sektion73ModalOpen = false;

  sektion73IsZoomingToPin = false;
  sektion73PendingPinId = null;
  if (sektion73ActiveMoveEndHandler) {
    sektion73Map.off("moveend", sektion73ActiveMoveEndHandler);
    sektion73ActiveMoveEndHandler = null;
  }

 const view = sektion73ReturnView || sektion73StartView;

/* NYTT: håll filterbaren nere medan vi återgår */
sektion73SetFilterBarHidden(true);

if (sektion73Map && view && typeof sektion73Map.easeTo === "function") {
  const onReturnEnd = () => {
    sektion73Map.off("moveend", onReturnEnd);

    /* NYTT: först NU (när vi nått previous zoom/view) åker filterbaren upp */
    sektion73SetFilterBarHidden(false);
  };

  sektion73Map.on("moveend", onReturnEnd);

  sektion73Map.easeTo({
    center: view.center,
    zoom: Math.min(view.zoom, sektion73MaxZoom),
    pitch: view.pitch,
    bearing: view.bearing,
    duration: sektion73PinZoomDur,
    easing: (t) => 1 - Math.pow(1 - t, 3)
  });
} else {
  /* Fallback: om ingen return-animering sker, visa igen direkt */
  sektion73SetFilterBarHidden(false);
}

}


    /* =========================
       PINS (2 st) – zoom först, modal efter "moveend"
       ========================= */

const sektion73PinIcons = {
      sacamping: `<img src="https://res.cloudinary.com/dmgmoisae/image/upload/v1776526865/svgviewer-output_-_2026-04-18T174055.538_yabqks.svg" alt="" style="width:44px;height:auto;display:block" />`,
      ica: `<svg xmlns="http://www.w3.org/2000/svg" width="44" height="22" viewBox="0 0 54 27"><path fill="#e3000b" fill-rule="evenodd" d="M38.883 0 54 26.532h-7.65l-1.664-2.876h-7.614l2.66-4.674h2.292l-3.141-5.536-3.29 5.752q-.776 1.35-1.552 2.373C31.528 24.879 27.461 27 22.953 27c-7.577 0-13.75-6.004-13.75-13.374S15.376.25 22.953.25c2.587 0 4.916.684 6.949 1.834L26.649 7.8a7.34 7.34 0 0 0-3.696-1.006c-3.881 0-7.023 3.056-7.023 6.83 0 3.776 3.142 6.832 7.023 6.832 2.106 0 3.844-.863 5.1-2.122.555-.539 1.183-1.438 1.368-1.761zM0 26.532V.72h6.727v25.813z"/></svg>`,
      as: `<svg preserveAspectRatio="xMidYMid meet" viewBox="0 0 324 436.9" xmlns="http://www.w3.org/2000/svg" width="32" height="43"><g><path d="M13.2 387.7c-9.6 25.5 10.7 32.2 18.4 32.2h47.5c15.3 0 22.2-20.7 30.6-29.1 8.4-8.4 37.9-6.7 44.2 3.8 4.6 10.9 21.3 29 35.6 29 14.4 0 32.7 2.6 40.8-15.8 3.7-12.9 3.9-148.8 2.9-198.1-.3-13.4-5-20.4-24.1-24.1-19.5-3.8-42.6-1.3-66.7 1.4-24.1 2.6-129.2 200.7-129.2 200.7z" fill="none" stroke="#ffffff" stroke-width="13.784"/><path d="M113.5 277.1c15.5 5.6 42.2 44.3 89.7 3.9-21.2 53.6-68.7 73.4-89.7-3.9z" fill="#ffffff"/><path d="M195.2 11.5h7.8c16.1 4.6 13.7 75.4-13.6 55.3-7.3-5.4-7.4-57.3 5.8-55.3z" fill-rule="evenodd" clip-rule="evenodd" fill="#ffffff"/><path d="M296.6 46.7c7.1-1.3 18.5 2.5 16.5 15.5-1.4 8.7-15.6 14-26.2 18.4-9.5 3.9-23.4 11.9-34.9 8.7-5.6-1.5-11-10.7-8.7-18.4 1.9-6.4 19-9 26.2-11.6 8-3 19.1-11.2 27.1-12.6z" fill-rule="evenodd" clip-rule="evenodd" fill="#ffffff"/><path d="M97.5 70c-2.2-11.5 6.5-21.1 13.6-19.4 13.7 3.3 45.8 23.8 47.5 34 1.8 10.5-5.7 16.4-12.6 16.5-8.3.1-18.3-9.9-25.2-14.6C112 80.6 104.1 76 97.5 70z" fill-rule="evenodd" clip-rule="evenodd" fill="#ffffff"/><path d="M207.9 85.6c17.9-2.6 39.2 5.2 34 32-2.6 13.5-22.3 29.3-35.9 35-2.9 1.2-6.9 2.7-11.4 4.1l-1.2-4.1c6.4-.8 17.9-13 21.3-22.3 7.5-20.5-5.5-36.2-21.3-38.8l-.7-2.6c5.1-1.5 10.3-2.6 15.2-3.3z" fill="#ffffff"/><path d="M193.4 152.5l1.2 4.1c-10.9 3.3-24.7 6-34.2 2.7-21.4-7.5-17.1-39.5-2.9-53.4 7.9-7.8 21.3-13.6 35.2-17.2l.7 2.6c-8.6 6.6-20.7 16.2-22.3 31.1-1.8 16.3 8.7 31.7 22.3 30.1z" fill="#ffffff"/><path d="M112.4 137c9.8-2 19.7 6.9 15.5 18.4-2.4 6.7-32.6 24.5-44.6 22.3-4.2-.8-14.5-10.1-8.7-21.3 2.7-5.2 15.6-7.4 18.4-8.7 8.3-3.9 11.6-9.1 19.4-10.7z" fill-rule="evenodd" clip-rule="evenodd" fill="#ffffff"/><path d="M247.7 133.6c9.2-2.1 22.6 6.9 32 13.6 7.5 5.3 21.4 16.3 22.3 22.3 1.1 7.3-4.1 16.8-13.6 16.5-10-.3-17.2-13.3-26.2-19.4-6.8-4.6-24.4-8-25.2-19.4-.5-8.7 6.3-12.6 10.7-13.6z" fill-rule="evenodd" clip-rule="evenodd" fill="#ffffff"/></g></svg>`,
         golf: `
         <svg baseProfile="tiny" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 93.6 33.9" overflow="visible" xml:space="preserve"><path d="M10.7 33.5V21.1l-3.4 8.2h-.4l-3.4-8.2v12.4H0V12.1h3.3L7.1 22l3.8-9.9h3.3v21.4zm7.1-21.4h3.8v21.4h-3.8zm15.1 21.4-4.3-11.8v11.8h-3.5V12.1h3l4.3 11.7V12.1h3.5v21.4zm6.5-21.4h3.8v21.4h-3.8zm18.1 16.4c-.6 3.3-2.7 5.3-5.3 5.3-3.8 0-5.8-3.9-5.8-11.2 0-7 2.2-10.9 6-10.9 2.2 0 3.8 1.3 4.9 4l-3.4 1.5c-.3-1.1-.9-1.7-1.7-1.7-1.4 0-2 2-2 6.8 0 1.2 0 2.3.1 3.4.2 3.2.8 4.4 1.9 4.4 1.4 0 2-1.8 2-5.8v-.9h-1.9V20h5.6v3.8c0 2-.1 3.3-.4 4.7M70.7 31c-.9 1.9-2.4 2.9-4.3 2.9s-3.5-1-4.3-2.9c-.9-2-1.5-4.9-1.5-8.1s.5-6.2 1.5-8.2c.9-1.9 2.4-2.9 4.3-2.9s3.5 1 4.3 2.9c1 2 1.5 4.9 1.5 8.2 0 3.1-.5 6.1-1.5 8.1m-4.3-15.5c-1.4 0-2 2.2-2 7.3s.6 7.3 2 7.3 2-2.2 2-7.3-.6-7.3-2-7.3m8.9 18V12.1H79V30h4.3v3.5zm14-17.9v4.7h3.9v3.4h-3.9v9.8h-3.7V12.1h8v3.5zM27 5.2c.1.4.2.5.4.6V7H25V5.8c.2 0 .4-.1.4-.3v-.2l-.1-.3H24l-.1.3v.2c0 .2.1.3.4.3V7h-2.1V5.8c.2-.1.3-.2.4-.7l1-5.2H26zm-2.4-3.5L24.1 4h1zm3.5 4.1c.3-.1.4-.2.4-.6V1.7c0-.4-.1-.5-.4-.5V0H31c.8 0 1.3.2 1.6.6.2.2.3.5.4.8 0 .2.1.5.1 1 0 .9 0 1.2-.2 1.5-.2.4-.6.7-1 .8-.3.1-.5.1-.9.1h-1v.4c0 .4.1.5.4.6V7h-2.3zm2-2.5h.7c.6 0 .8-.2.8-.9s-.2-.9-.8-.9h-.7zM34 5.8c.3-.1.4-.2.4-.6V1.7c0-.4-.1-.5-.4-.5V0h5v2.2h-1.5v-.1c0-.5-.2-.7-.6-.7H36v1.4h1.9V4H36v1.7h.8c.5 0 .6-.2.6-.7v-.4H39V7h-5zm6 0c.3-.1.4-.2.4-.6V1.7c0-.4-.1-.5-.4-.5V0h2.3v1.1c-.3.1-.4.2-.4.5v3.9h.6c.5 0 .7-.2.7-.6V3.8h1.4V7H40zm10.1-4.7c-.2.1-.3.2-.4.5v.1l-1 5.2h-2.4l-1.1-5.2c-.1-.4-.2-.5-.4-.6V0h2.4v1.1c-.2 0-.4.1-.4.3v.3l.7 3.5.7-3.5v-.3c0-.2-.1-.3-.4-.3V0h2.1v1.1zm.8 4.7c.3-.1.4-.2.4-.6V1.7c0-.4-.1-.5-.4-.5V0h2.3v1.1c-.3.1-.4.2-.4.5v3.5c0 .4.1.5.4.6V7h-2.3zm3.3 0c.3-.1.4-.2.4-.6V1.7c0-.4-.1-.5-.4-.6V0h2.3v1.1c-.3.1-.4.2-.4.6V3l.8-1.2c.3-.5.3-.5.3-1.1V0h2v1.1c-.2 0-.3.1-.6.5l-.9 1.5 1.1 2.2c.2.4.3.5.5.6V7h-2.2V6c0-.4 0-.4-.2-.8V5l-.8-1.4v1.6c0 .4.1.5.4.6V7h-2.3zm5.9 0c.3-.1.4-.2.4-.6V1.7c0-.4-.1-.5-.4-.5V0H65v2.2h-1.5v-.1c0-.5-.2-.7-.6-.7h-.8v1.4H64V4h-1.9v1.7h.8c.5 0 .6-.2.6-.7v-.4H65V7h-4.9zm6 0c.3-.1.4-.2.4-.6V1.7c0-.4-.1-.5-.4-.6V0h1.8l1.8 3.6V1.7c0-.4-.1-.5-.4-.6V0h2.2v1.1c-.3.1-.4.2-.4.6V7h-1.5l-1.8-3.7v1.9c0 .4.1.5.4.6V7H66V5.8z" fill="#f3ecdb"/></svg>
         `,
            apelviken: `
<svg baseProfile="basic" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 711.5 280.4" xml:space="preserve"><path d="M120.9 15.7h8.4v1.8h-8.4zM154.5.6h7.4c12.5 0 13 10.2 13 12s-.5 12-13 12h-7.4zm2.2 22h4.6c6.4 0 11.3-3.1 11.3-10s-4.9-10-11.3-10h-4.6zm29.1-22h14.7v2h-12.4v8.5h11.7v2h-11.7v9.4h13v2h-15.2V.6zm26.7 19.6c1.2 2 3.1 3 5.5 3 3 0 5.4-1.8 5.4-4.7 0-6.7-12.4-2.8-12.4-11.9 0-4.3 3.7-6.6 7.7-6.6 2.6 0 4.9.9 6.5 3l-1.9 1.4c-1.1-1.6-2.6-2.4-4.7-2.4-2.9 0-5.4 1.5-5.4 4.5 0 7.2 12.4 2.9 12.4 11.9 0 4.3-3.6 6.7-7.5 6.7-3.2 0-5.9-1-7.8-3.6zM242 2.6h-8.2v-2h18.6v2h-8.2v22H242zm20.1-2h2.2v24h-2.2zm14.8 0h2.9l14.6 21h.1V.6h2.2v24h-2.9l-14.6-21h-.1v21h-2.2zm39.6 0h2.3l10.1 24h-2.5l-2.6-6.4h-12.7l-2.7 6.4h-2.3zm1.1 2.5L312 16.2h11zm23.8-.5h-8.2v-2h18.6v2h-8.2v22h-2.2zm20.1-2h2.2v24h-2.2zm25.6-.6c7.3 0 12.4 5.3 12.4 12.6s-5.1 12.6-12.4 12.6-12.4-5.3-12.4-12.6S379.8 0 387.1 0m0 23.2c6.3 0 10.2-4.6 10.2-10.6S393.4 2 387.1 2s-10.2 4.6-10.2 10.6 3.9 10.6 10.2 10.6M410.5.6h2.9l14.6 21h.1V.6h2.2v24h-2.9l-14.6-21h-.1v21h-2.2zm45.2 15.1h8.4v1.8h-8.4zM5.1 180.8Q0 175.4 0 166.7c0-4.9 1.3-8.9 3.8-12.1s5.6-5.6 9.2-7.4c3.6-1.7 8.2-3.6 13.9-5.5 5.9-2.1 10.3-3.9 13.1-5.6s4.1-4 4.1-6.9v-12.6c0-4.5-1.1-8.1-3.2-10.6s-5.4-3.8-9.8-3.8c-5.2 0-9.1 1.3-11.8 3.9 3 1.1 5.4 2.7 7.1 4.9s2.5 4.7 2.5 7.6c0 3.7-1.2 6.6-3.7 8.8s-5.5 3.2-9.1 3.2c-3.8 0-6.7-1.2-8.8-3.6s-3.1-5.4-3.1-8.9c0-3 .7-5.6 2.2-7.7s3.7-4.1 6.7-5.9c2.9-1.7 6.5-3.1 10.8-4.1s8.9-1.5 14-1.5c5.3 0 9.9.5 13.8 1.6s7.1 2.9 9.7 5.5c2.4 2.4 4 5.3 4.8 8.8q1.2 5.25 1.2 14.1V173c0 2.6.2 4.4.7 5.5s1.4 1.6 2.8 1.6c1.6 0 3.6-.9 5.8-2.8l1.6 2.8c-4.9 4-10.8 6-17.8 6-5.9 0-10.1-1.2-12.5-3.6s-3.6-5.6-3.7-9.6c-5.4 8.8-13.4 13.1-23.8 13.1-6.8.2-12-1.6-15.4-5.2m39-11.7v-33.2c-1.3 2.2-4.1 4.5-8.3 7.1q-6.3 4.05-9.6 8.1c-2.2 2.7-3.2 6.6-3.2 11.7 0 4.4.9 7.7 2.8 9.8 1.8 2.1 4.3 3.2 7.3 3.2 4.2 0 7.9-2.2 11-6.7m112.3-65.6c4.4 3 7.8 7.6 10.3 13.6 2.5 6.1 3.7 13.5 3.7 22.2 0 15.5-3.4 27.3-10.1 35.6-6.8 8.3-15.9 12.4-27.5 12.4-3.2 0-6.3-.4-9.2-1.3s-5.3-2.2-7.4-3.9v16.2q0 7.2 3.6 9.9c2.4 1.8 6.1 2.8 11 2.8v3.4l-4.4-.2c-12-.3-19.6-.5-22.9-.5-3.2 0-10.1.2-20.4.6V211q5.4 0 7.5-2.4c1.5-1.6 2.2-4.5 2.2-8.7v-81.1c0-5-.8-8.6-2.4-10.9s-4.2-3.4-8-3.4v-3.4c3.5.3 6.8.5 10.1.5 9.4 0 17.3-.8 23.7-2.3v14.9q3.45-7.5 9.9-11.4c4.3-2.6 9.4-4 15.2-4 5.7.1 10.7 1.6 15.1 4.7m-15 69.1c3-6.9 4.5-16.9 4.5-30.1q0-19.8-3.6-28.2t-10.5-8.4c-3.7 0-6.9 1.2-9.8 3.7s-4.8 5.9-5.8 10.4v58.5c2.6 2.9 6 4.4 10.2 4.4 7 0 12-3.4 15-10.3M249.5 161l2.9 1c-2.2 7-6 13-11.6 17.9s-12.5 7.4-20.8 7.4c-11.5 0-20.6-3.6-27.3-10.9-6.8-7.3-10.1-18.1-10.1-32.3 0-14.6 3.6-25.8 10.9-33.5 7.2-7.7 16.9-11.6 28.9-11.6 20.3 0 30.5 12 30.5 36h-45.6c-.1 1.6-.2 4.2-.2 7.6 0 7.1 1 13.1 3 17.8 2 4.8 4.6 8.2 7.8 10.4s6.6 3.2 10.3 3.2c8.8 0 15.9-4.3 21.3-13m-37.8-51.5c-2.5 4.8-4.1 12.2-4.8 22.3h25.5c.2-8.5-.6-15.6-2.5-21.2s-4.7-8.3-8.5-8.3c-4 0-7.2 2.4-9.7 7.2m83.6 60.4c0 4.4.8 7.5 2.3 9.2s4.2 2.5 8.1 2.5v3.4c-11.2-.4-18.5-.6-21.7-.6-3.7 0-11.1.2-22.4.6v-3.4c3.8 0 6.5-.8 8-2.5 1.6-1.7 2.4-4.7 2.4-9.2V77.5c0-5-.8-8.6-2.4-10.9s-4.2-3.4-8-3.4v-3.4c3.5.3 6.8.5 10.1.5 9.4 0 17.3-.8 23.7-2.3v111.9zm95.6-68.7v3.2c-2.3.6-4.3 2-6.1 4.1s-3.5 5.4-5.1 9.8l-23.7 67c-1.2-.1-3-.2-5.4-.2-2.3 0-4 .1-5.2.2l-28.9-71.7c-1.5-3.7-3.1-6.1-4.6-7.3q-2.4-1.8-4.8-1.8v-3.4c7.6.5 15.2.8 23 .8 6.8 0 13.8-.3 21.1-.8v3.4c-3.7 0-6.3.2-7.9.7s-2.4 1.8-2.4 4c0 .9.3 2.2.8 4.1l18.5 49.1 11.7-32.1c1.7-5.1 2.6-9.5 2.6-13.1 0-7.9-3.9-12.2-11.8-12.8v-3.2c5 .3 10.2.5 15.6.5 5.7 0 9.8-.2 12.6-.5m37.8 68.7c0 4.4.8 7.5 2.4 9.2s4.2 2.5 8 2.5v3.4q-16.2-.6-21.6-.6-5.1 0-22.5.6v-3.4c3.9 0 6.6-.8 8.1-2.5s2.3-4.7 2.3-9.2v-51.1c0-5-.8-8.6-2.3-10.9s-4.2-3.4-8.1-3.4v-3.4c3.5.3 6.8.5 10.1.5 9.6 0 17.5-.8 23.7-2.3v70.6zm-1.9-107.2c2.6 2.2 4 5.3 4 9.2s-1.3 6.9-4 9.2q-3.9 3.3-10.8 3.3-6.75 0-10.8-3.3c-2.6-2.2-4-5.3-4-9.2s1.3-6.9 4-9.2q3.9-3.3 10.8-3.3t10.8 3.3m105.8 116.2q1.65 1.8 4.2 2.7v3.4c-8.7-.4-14.3-.6-17-.6-3.6 0-10.5.2-20.9.6v-3.4c1.5 0 2.7-.3 3.6-.8s1.3-1.3 1.3-2.3c0-.5-.3-1.3-.8-2.4l-16.1-29c-1.1-1.8-2.2-3.1-3.4-3.7s-2.7-1.1-4.5-1.3V170c0 4.4.7 7.5 2.1 9.2s3.9 2.5 7.6 2.5v3.4c-10.8-.4-17.8-.6-21.1-.6-3.7 0-11.1.2-22.4.6v-3.4c3.8 0 6.5-.8 8-2.5 1.6-1.7 2.4-4.7 2.4-9.2V77.5c0-5-.8-8.6-2.4-10.9s-4.2-3.4-8-3.4v-3.4c3.5.3 6.8.5 10.1.5 9.4 0 17.3-.8 23.7-2.3v81c2.2-.2 4-.6 5.6-1.3 1.6-.6 2.9-1.6 4.1-2.9l12.3-12q5.4-5.4 5.4-9.9c0-2.5-1.1-4.5-3.4-5.9-2.3-1.5-5.3-2.3-9.1-2.5v-3.2c5.9.3 12.3.5 19 .5 9 0 15.3-.2 19-.5v3.2c-6.4 1.4-13.1 5.6-20.3 12.5l-10.4 10.7 27.2 45.6c1.8 2.5 3.2 4.4 4.2 5.6m73.7-17.9 2.9 1c-2.2 7-6 13-11.6 17.9s-12.5 7.4-20.8 7.4c-11.5 0-20.6-3.6-27.3-10.9-6.8-7.3-10.1-18.1-10.1-32.3 0-14.6 3.6-25.8 10.9-33.5 7.2-7.7 16.9-11.6 28.9-11.6 20.3 0 30.5 12 30.5 36h-45.6c-.1 1.6-.2 4.2-.2 7.6 0 7.1 1 13.1 3 17.8 2 4.8 4.6 8.2 7.8 10.4s6.6 3.2 10.3 3.2c8.7 0 15.9-4.3 21.3-13m-37.9-51.5c-2.5 4.8-4.1 12.2-4.8 22.3h25.5c.2-8.5-.6-15.6-2.5-21.2s-4.7-8.3-8.5-8.3c-3.9 0-7.2 2.4-9.7 7.2m127.7-4.3c1.8 2.1 3.1 4.7 3.9 7.9s1.1 7.6 1.1 13.1v43.6c0 4.4.8 7.5 2.4 9.2s4.2 2.5 8 2.5v3.4c-10.8-.4-17.9-.6-21.4-.6-3.2 0-10.3.2-21.1.6v-3.4c3.2 0 5.5-.8 6.8-2.5s1.9-4.7 1.9-9.2v-50.4c0-4.4-.7-7.8-2.2-10.1s-4.1-3.4-7.9-3.4c-4.4 0-8.2 1.8-11.3 5.4s-4.7 8.1-4.7 13.4v45.1c0 4.4.6 7.5 1.9 9.2s3.6 2.5 6.8 2.5v3.4q-14.85-.6-20.1-.6c-3.2 0-10.7.2-22.4.6v-3.4c3.9 0 6.6-.8 8.1-2.5s2.3-4.7 2.3-9.2v-51.1c0-5-.8-8.6-2.3-10.9s-4.2-3.4-8.1-3.4V101c3.5.3 6.8.5 10.1.5 9.6 0 17.5-.8 23.7-2.3V114c4.9-10.1 13.7-15.1 26.6-15.1 8.3 0 14.2 2.1 17.9 6.3M424.8 235.7c-1-1.3-1.5-2.7-1.5-4.4 0-1.2.3-2.1 1-2.7s1.4-.9 2.2-.9c1.4 0 2.4.7 3 2 .7 1.3 1 3.1 1 5.4 0 1.3 0 2.2-.1 2.9-.6 5-1.9 9.7-3.8 14.2-2 4.5-4.6 8.1-7.8 10.9-3.3 2.8-7 4.2-11.3 4.2-3 0-5.2-.9-6.5-2.6s-1.9-3.9-1.7-6.4c.3-4 1.9-8.4 5-13.3 3-4.9 7-9.7 11.9-14.3-1.2.5-2.6 1.2-4.1 2.2-1.2.8-2.2 1.4-3.1 1.8s-1.6.6-2.3.6c-.5 0-1-.1-1.5-.4s-.8-.5-.9-.5q-1.35-.9-2.1-.9c-.8 0-1.4.3-1.9 1s-1.1 1.8-1.6 3.5l-.8 2.7h-1.4l1.6-5.3c1.4-4.9 3.6-7.4 6.8-7.4.6 0 1.2.1 1.6.3s1 .6 1.7 1.1c.6.5 1.2.8 1.7 1.1.5.2 1 .4 1.7.4 2.4 0 4.5-.7 6.1-2.2l.7-1.4 1.5.7c-3.9 4.8-7 9.7-9.1 14.4q-3.3 7.2-3.9 14.7c0 .4-.1 1-.1 1.7 0 4.1 1.1 6.1 3.2 6.1 3.5 0 6.7-1.5 9.6-4.4 2.9-3 5.1-6.5 6.8-10.6q2.4-6.15 2.7-11.1c-2-.8-3.2-1.8-4.3-3.1m41.1 18.7h1.4l-1.8 5.3c-1 2.7-2.2 4.6-3.7 5.8s-3 1.8-4.6 1.8c-.9 0-1.7-.2-2.4-.5s-1.2-.8-1.6-1.4c-.4-.7-.7-1.6-.7-2.5 0-1 .2-2.2.5-3.4.3-1.3.6-2.1.7-2.4l1.3-5.2c-2.3 5.4-4.7 9.4-7.1 11.8s-4.9 3.7-7.5 3.7q-3.3 0-5.1-2.4c-1.2-1.6-1.7-3.7-1.7-6.4 0-3.9 1-8.3 3.1-13.1s4.8-9 8.1-12.3q4.95-5.1 10.2-5.1c1.3 0 2.4.5 3.2 1.5s1.3 2.3 1.5 4.1l1.2-4.5c2.7-.1 4.9-.4 6.7-1l-9.1 32.1c0 .2-.1.6-.3 1.1-.1.6-.2 1.1-.2 1.6 0 1.2.5 1.8 1.6 1.8 2.1 0 4-2.5 5.6-7.4zm-18.6 7.4c1.9-2.1 3.7-4.9 5.6-8.3q2.7-5.25 4.5-11.1l1.3-5.2c0-.4.1-.9.1-1.6 0-2-.4-3.5-1.1-4.7-.7-1.1-1.7-1.7-2.9-1.7q-3.15 0-6.6 4.8c-2.3 3.2-4.3 7.2-5.8 11.9-1.6 4.7-2.4 9.2-2.4 13.3 0 2 .2 3.4.7 4.3.4.9 1.1 1.3 1.9 1.3 1.2.1 2.9-.9 4.7-3m55.4-32.8q1.2 1.2 1.2 3c0 1.5-.5 2.7-1.5 3.7q-1.5 1.5-3.6 1.5c-.9 0-1.6-.2-2.1-.7s-.8-1.1-.8-1.9c0-1.1.3-2.1.9-2.8q.9-1.2 2.4-1.8c-.2-.2-.5-.3-.8-.3-2.6 0-5.5 2.8-8.5 8.5-3.1 5.6-6 13.1-8.7 22.3l-1.5 5.7h-6.3l8.7-31.1c.3-1.1.5-2 .5-2.8 0-1.1-.5-1.7-1.5-1.7-1.1 0-2 .6-2.9 1.7q-1.35 1.65-2.7 5.7l-.9 2.7H473l1.8-5.3c1.7-5 4.7-7.5 8.8-7.5 2.8 0 4.1 1.4 4.1 4.2 0 1.4-.3 3.3-1 6l-2.3 9.1c2.6-7 5.1-12 7.4-14.9s4.9-4.4 7.7-4.4c1.4 0 2.4.4 3.2 1.1m30.9 1.5c1.3 1.7 2 4.3 2 7.7 0 3.9-.9 8.2-2.6 12.7-1.7 4.6-4.2 8.4-7.5 11.6-3.2 3.2-7 4.8-11.2 4.8-1.5 0-2.7-.4-3.8-1.3-1.1-.8-1.9-2-2.3-3.6l-6.2 5-1.1-.5c.6-1.2 1-2.6 1.4-4.2l12.7-44.9c.2-.6.3-1.3.3-2 0-1-.4-1.7-1.1-2.1-.7-.5-2-.7-3.8-.7l.4-1.5c2.6 0 4.9-.3 6.9-.8s4-1.2 5.9-2.2l-9.4 34.3c2.3-5.2 4.5-9 6.7-11.4 2.2-2.3 4.6-3.5 7.1-3.5s4.3.8 5.6 2.6m-12 30.2c2.3-3.2 4.2-7.1 5.6-11.7s2.1-8.8 2.1-12.5c0-2.1-.3-3.7-.9-4.7-.6-1.1-1.4-1.6-2.5-1.6-1.9 0-4.3 2.1-7 6.4s-5.2 9.5-7.4 15.8l-2.5 9.2c.6 1.5 1.3 2.5 2.1 3.1s1.9.9 3 .9c2.8 0 5.2-1.6 7.5-4.9M562 243c-4.4 3-9.4 5.3-15.1 7.2-.5 2.4-.8 4.8-.8 7 0 4.6 1.7 7 5 7 4.2 0 7.9-2.4 11.2-7.3l1.2.6c-1.6 2.7-3.6 4.9-6.3 6.9s-5.4 2.9-8.3 2.9c-3 0-5.3-.9-7-2.6s-2.5-4.3-2.5-7.6c0-3.7 1.1-7.8 3.2-12.5 2.2-4.6 5.1-8.6 8.7-11.8 3.7-3.2 7.7-4.9 12-4.9 1.5 0 2.8.4 3.8 1.2q1.5 1.2 1.5 3.6c0 3.9-2.2 7.3-6.6 10.3m-5.6-11q-2.85 2.7-5.4 7.2c-1.7 3-2.9 6.2-3.8 9.6 4.6-1.6 7.9-3.1 9.9-4.6q2.7-2.1 4.2-5.1c1-2 1.5-4.2 1.5-6.5 0-1.3-.1-2.2-.3-2.6s-.5-.7-.9-.7c-1.5 0-3.3.9-5.2 2.7m44.9-3q1.2 1.2 1.2 3c0 1.5-.5 2.7-1.5 3.7q-1.5 1.5-3.6 1.5c-.9 0-1.6-.2-2.1-.7s-.8-1.1-.8-1.9c0-1.1.3-2.1.9-2.8q.9-1.2 2.4-1.8c-.2-.2-.5-.3-.8-.3-2.6 0-5.5 2.8-8.5 8.5-3.1 5.6-6 13.1-8.7 22.3l-1.5 5.7H572l8.7-31.1c.3-1.1.5-2 .5-2.8 0-1.1-.5-1.7-1.5-1.7-1.1 0-2 .6-2.9 1.7q-1.35 1.65-2.7 5.7l-.9 2.7h-1.4l1.8-5.3c1.7-5 4.7-7.5 8.8-7.5 2.8 0 4.1 1.4 4.1 4.2 0 1.4-.3 3.3-1 6l-2.3 9.1c2.6-7 5.1-12 7.4-14.9s4.9-4.4 7.7-4.4c1.2 0 2.3.4 3 1.1m34.4-3c.7.7 1.1 1.8 1.1 3.3 0 1.3-.3 2.2-.9 2.9s-1.4 1-2.2 1q-1.35 0-2.4-.9c-.7-.6-1.1-1.5-1.1-2.8 0-.9.2-1.9.7-3-1.9.8-3.3 1.8-4.1 3 2 1.4 3 3.6 3 6.5 0 2.1-.5 4.2-1.6 6.2-1 2-2.5 3.8-4.4 5.3s-4.1 2.5-6.6 2.9l-2.4 1.3c-2.3 1.2-3.9 2.2-5 2.9-1 .7-1.6 1.4-1.6 2.1 0 .5.3 1 1 1.4q1.05.6 3.3 1.2l5.3 1.4c2.8.7 4.8 1.5 6.2 2.4s2 2.2 2 3.9c0 1.8-.8 3.8-2.3 5.9s-3.9 3.8-7 5.3c-3.2 1.5-7.1 2.2-11.7 2.2-3.7 0-6.6-.5-8.5-1.5-2-1-2.9-2.3-2.9-4 0-1.6.9-3.3 2.7-5s4.3-3 7.6-4l.5 1.1c-3.1 1.6-4.7 3.8-4.7 6.6 0 1.8.6 3.2 1.9 4.1s3 1.3 5.1 1.3 4.3-.4 6.6-1.3 4.2-2 5.6-3.4c1.5-1.4 2.2-2.9 2.2-4.5 0-.7-.2-1.1-.6-1.4-.4-.2-1.2-.5-2.4-.8l-11.1-2.8c-2.6-.7-3.9-2.1-3.9-4.4q0-2.25 2.4-4.5c1.6-1.5 4.5-3.3 8.9-5.3h-.5c-2.8 0-5.1-.7-6.8-2s-2.6-3.3-2.6-5.9c0-2 .5-4.2 1.6-6.5s2.8-4.3 5.2-6c2.4-1.6 5.4-2.5 9-2.5 2.1 0 3.8.3 5.2.9.9-1.2 2-2.1 3.3-2.8s2.6-1.1 3.9-1.1c1.2.2 2.3.6 3 1.3m-15.9 20.9q1.95-2.55 2.7-6c.5-2.3.7-4.4.7-6.3 0-1.8-.2-3.1-.7-4s-1.4-1.3-2.7-1.3c-2.3 0-4.2 1-5.6 3.1s-2.3 4.3-2.8 6.8-.8 4.5-.8 6c0 2.9 1.3 4.4 3.8 4.4 2.4-.2 4.1-1 5.4-2.7" fill="#fff"/></svg>    
`,
            majas: `
<svg baseProfile="tiny" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 226.5 23.5" overflow="visible" xml:space="preserve"><path d="M4.9 5.9c.5-.4 1-.8 1.7-.9 1.1-.2 2 .1 2.8.8.2.2.3.2.6.1 1.2-.9 2.5-1.2 4-.7 1.4.4 2.4 1.7 2.4 3.1v6.1c0 .4.1.6.5.6.9 0 1.4.5 1.4 1.3 0 .7-.4 1.3-1.3 1.4-1.1.2-2.2 0-3.2.1-.4 0-.2-.3-.2-.5V9.1c0-.5 0-1-.5-1.2s-1-.1-1.4.2c-.7.6-1.3 1.2-1.2 2.3.1 1.3 0 2.6 0 4 0 .5.1.6.6.6 1.1 0 1.7 1 1.3 2-.3.6-.9.7-1.4.8H8.1c-.4 0-.3-.3-.3-.5V8.7q0-.9-.9-.9c-1 0-2.1 1.1-2.1 2.1v4.4c0 .4.1.6.6.6 1 0 1.5.7 1.3 1.7-.1.5-.5.9-1 .9-1.5.2-3 .2-4.4 0-.9-.1-1.3-.6-1.3-1.3s.5-1.3 1.3-1.3c.7 0 .7-.3.7-.9V8.5c0-.3-.1-.5-.5-.5C.3 7.9-.2 7.2.1 6.2c.2-.5.5-.8 1.1-.9 1.1-.2 2.2-.1 3.3-.1.5 0 0 .5.4.7M130.8 17c-2.2 1.2-4.5 1.5-6.8.7-4.9-1.6-5.3-7.3-2.7-10.3 2.3-2.6 5.7-3.2 8.8-1.5.2.1.4.2.7.4V3.1c0-.3-.2-.2-.3-.2-.3 0-.6 0-.9-.1-.8-.2-1.2-.6-1.1-1.4 0-.7.5-1.3 1.2-1.3 1.2-.1 2.5 0 3.7 0 .2 0 .2.1.2.3v14c0 .5.1.6.6.6.3 0 .6 0 .9.1.7.2.9.7.9 1.4 0 .6-.4 1-1 1.2s-1.2.1-1.8.1h-1.8c-.5-.1-.8-.2-.6-.8m-4.5-9.3c-.7 0-1.5.3-2.2.8-2.4 1.8-2.1 5.3.4 6.4 1.4.6 2.8.5 4.2 0 .7-.3 1.3-.8 1.6-1.6 1.4-2.5-.8-5.7-4-5.6m32.5 1.8c-.1-1.1-.7-1.6-1.7-1.7-1.3-.4-2.9.2-3.8 1.4-.4.2-.6.5-.5 1v4c0 .8 0 .8.8.8.7.3 1.1.8 1 1.4-.1.7-.4 1-1.1 1.2-.5 0-1 .1-1.5.1-.9 0-1.9.1-2.9-.1-.7-.2-1.2-.7-1.1-1.4s.6-1.3 1.3-1.2c.6 0 .7-.2.7-.8V3.5c0-.5-.1-.7-.6-.6-.2 0-.4 0-.7-.1-.8-.2-1.2-.6-1.2-1.3s.4-1.3 1.2-1.3c1.3-.1 2.5 0 3.8 0 .4 0 .2.3.2.4v5.5c1.4-.7 2.8-1.1 4.4-.9.8.1 1.6.4 2.3.7.6.4 1.1.9 1.5 1.6.2.4.3.9.5 1.3.2 1 0 2 .1 3.1v2.4c0 .6.3.9.8.9.6.1 1.1.6 1.1 1.3s-.4 1.2-1 1.4c-.7.2-1.3.1-2 .1h-1.1c-.7 0-1.4 0-2.1-.4-.6-1-.6-1.3.2-2.3.3-.1.6-.2.9-.2s.4-.1.4-.4v-2.9c.1-.9.2-1.6.1-2.3M200 6.2c.7-.3 1.3-.7 2.1-.9.7-.2 1.4-.2 2.1-.4.7 0 1.3.1 2 .2.7.2 1.3.5 2 .7 1.8.9 2.8 2.4 3.4 4.3.2.8.1 1.7.2 2.5-.1.4-.4.2-.6.2h-10.6c-.2 0-.3 0-.2.3.3.5.6 1.1 1.2 1.3 1.2.8 2.5.9 3.9.8 1.6-.1 3.2-.6 4.8-.9.3 0 .5.1.8.1.5.4.7.8.7 1.4-.2.6-.5.9-1.1 1.1l-.6.3c-2.7.7-5.5 1.2-8.3.4l-1.8-.9c-.4-.4-.8-.7-1.2-1.1-.4-.7-.9-1.3-1.2-2.1-.4-1.5-.4-2.9.1-4.4.3-.5.6-1.1 1-1.6zm.9 3q-.3.3-.6.9h8.2c-.7-1.2-1.6-2-3-2.2-.8-.3-1.6-.2-2.4 0-.8.1-1.6.5-2.2 1.3m-171.2.6c.3-1.5-.6-1.9-1.7-2-1.5-.1-3 .2-4.4.5-.3.1-.7.1-1 .1-.5 0-1-.5-1.1-1.1-.1-.7.1-1.3.7-1.4 2.3-.9 4.8-1.4 7.2-.7 1.7.5 3.1 1.8 3 4-.1 1.7 0 3.4 0 5.1 0 .5.1.6.5.5h.7c.7.1 1.2.6 1.2 1.3 0 .8-.4 1.3-1.1 1.4-1.3.2-2.5.1-3.8.1-.5 0-.1-.4-.3-.6-1.1.5-2.3.9-3.6 1-1.9.2-3.6-.1-5-1.5-1.2-1.2-1.3-2.7-.4-4.2 1.1-1.7 2.8-2.5 4.8-2.7 1.4-.2 2.8-.1 4.3.2m-2.4 2.6c-1.4-.1-2.5.1-3.5.7-.5.3-1 .6-.9 1.3s.8.8 1.3.9c1.7.3 3.2-.2 4.7-.9.6-.3.8-.7.7-1.3 0-.3-.1-.4-.4-.4-.6-.2-1.3-.3-1.9-.3m30.2 4.7c-1.5.7-3.1 1.1-4.9 1-1.3 0-2.4-.4-3.4-1.3-1.5-1.4-1.6-3.2-.4-4.8 1.2-1.5 2.7-2.2 4.6-2.4 1.4-.2 2.8 0 4.2.2.3-1.5-.5-1.9-1.7-2-1.5-.1-2.9.2-4.4.5-.3.1-.7.1-1 .1-.5 0-1-.5-1.1-1-.2-.8 0-1.4.6-1.6 2.4-.8 4.8-1.3 7.3-.6 2.1.6 3.1 1.9 3.1 4v5.2c0 .4.1.5.5.5h.7c.7.1 1.2.5 1.2 1.2 0 .8-.3 1.3-1.1 1.4-1.3.2-2.5.1-3.8.1-.6 0-.2-.4-.4-.5m.1-3.8c.1-.5 0-.7-.5-.7-.8-.1-1.6-.2-2.4-.2-1 0-2 .2-2.9.7-.5.3-1 .6-.9 1.3s.8.8 1.4.9c1.7.3 3.3-.3 4.8-1 .4-.3.7-.5.5-1m14.2 4.8c-1.4 0-2.7-.2-3.9-.7-.2-.1-.4 0-.5 0-1 .5-1.8 0-2-1q-.15-1.2 0-2.4c.1-.6.5-.9 1.1-1s1.2.1 1.4.7c.2.7.7 1 1.3 1.2q2.55.9 5.1 0c.4-.2.9-.3.9-.9 0-.5-.5-.8-.9-.9-1.1-.4-2.3-.4-3.5-.6-1-.2-2-.3-2.9-.8-2.3-1-2.6-3.9-.7-5.4 1.5-1.2 3.2-1.4 5-1.4 1 0 1.9.2 2.8.6.2.1.3.1.4 0 .9-.5 1.9-.1 2 1.1v1.7c0 .7-.4 1.2-1 1.3-.7.2-1.3-.1-1.6-.8-.1-.3-.3-.4-.5-.5-1.5-.7-3-.7-4.6-.3-.2 0-.4.1-.5.2-.6.3-.6.7 0 1.1.5.3 1.1.4 1.7.4 1.4.2 2.7.4 4.1.8q1.5.45 2.4 1.8c1 1.5.7 3.3-.7 4.4-1.4.8-3 1.3-4.9 1.4m150.4-.2c-.9.1-1.9.3-2.9.2-1.6-.2-3-.7-4-2.1-.4-.8-.3-1.7-.4-2.5V8.7q0-.75-.6-.6c-.4 0-.8 0-1.2-.1-.7-.2-1.1-.7-1.1-1.4s.5-1.2 1.2-1.3c.4 0 .8-.1 1.3-.1.4 0 .5-.1.5-.5 0-.9-.1-1.8 0-2.7.1-.8.5-1.2 1.3-1.2s1.2.4 1.3 1.2c.1.9 0 1.8 0 2.7 0 .4.1.4.5.5 1.7 0 3.4-.1 5.2 0 .8.1 1.3.5 1.4 1.2 0 .9-.3 1.3-1.2 1.5-.5.1-1.1.1-1.6.1h-3.8c-.2 0-.4 0-.4.3v5.6c0 .6.3.9.9 1.1 1.8.4 3.5.1 5.1-.6.3-.1.6-.3.9-.4.6-.2 1.2 0 1.6.5s.3 1.2-.2 1.7c-.8.7-1.9 1-2.9 1.3-.3.2-.6.3-.9.4M93.9 8.1c1 2.1 2 4.1 3 6.2 1-2.1 2-4.2 3-6.2-.3 0-.5-.1-.7-.1-.8-.1-1.2-.7-1.2-1.4s.4-1.2 1.2-1.3q2.55-.3 5.1 0c.7.1 1.1.6 1.2 1.3 0 .7-.4 1.2-1.1 1.3-.1 0-.3.1-.4.1-.9-.2-1.1.4-1.4 1-1.3 2.7-2.6 5.5-4 8.2-.1.3-.2.4-.5.4h-2.3c-.3 0-.4-.1-.6-.4L91 8.5c-.2-.3-.4-.5-.8-.5-.3 0-.6 0-.9-.1-.6-.2-.9-.7-.9-1.4 0-.6.5-1.1 1.2-1.2 1.7-.2 3.3-.1 5 0 .7.1 1.2.6 1.2 1.3s-.4 1.2-1.1 1.4c-.3 0-.5.1-.8.1m92.2 8.5c-.5-1.1-1-2.2-1.6-3.3-.8-1.6-1.6-3.3-2.3-4.9-.1-.2-.2-.2-.4-.2-.3 0-.5 0-.8-.1-.6-.1-1.1-.4-1.2-1-.2-.7.1-1.2.8-1.6h.1c.6 0 1.3-.1 1.9-.1h3c.9.1 1.4.5 1.4 1.3s-.5 1.3-1.4 1.4h-.5c1 2.1 2 4.1 3 6.2 1-2.1 2-4.2 3-6.2-.3 0-.5-.1-.8-.1-.7-.2-1.1-.7-1.1-1.5 0-.7.5-1.1 1.2-1.2.2 0 .4 0 .7-.1.5.1.9.1 1.4 0h2.7c1 .1 1.5.7 1.3 1.8-.2.4-.5.8-1.1.9-.3 0-.6.1-1 .1-.3-.1-.4.1-.5.3-1.4 2.9-2.8 5.9-4.2 8.8-.2.4-.4.4-.7.4h-1.9c-.5 0-.7-.1-.9-.6.1 0 0-.2-.1-.3"/><path d="M45 12.2V18c.1 3.5-2.7 5.5-5.5 5.5-1.3 0-2.5.1-3.8-.1-.8-.1-1.2-.6-1.2-1.4 0-.7.5-1.2 1.3-1.3 1.2-.1 2.5 0 3.7-.1 1.3 0 2.2-.6 2.5-1.6.1-.3.1-.6.1-.9V8.5c0-.4-.1-.5-.5-.5h-5.1c-.3 0-.6 0-.9-.1-.7-.2-1.1-.7-1.1-1.4s.5-1.2 1.2-1.3c.4 0 .8-.1 1.3-.1h7.4c.4 0 .5.1.5.5 0 2.3 0 4.4.1 6.6m67.3 5.4h-4.6c-.3 0-.6 0-.9-.1-.8-.2-1.2-.6-1.1-1.4 0-.7.5-1.3 1.3-1.3h3.5c.4 0 .5-.1.5-.5V8.4c0-.3-.1-.4-.4-.4-.9 0-1.8.1-2.6-.1-.7-.2-1.2-.7-1.1-1.4s.5-1.2 1.3-1.3c1.8-.1 3.6 0 5.3-.1.4 0 .3.2.3.5v8.6c0 .4.1.6.6.6h3.3q1.5 0 1.5 1.5c0 .6-.4 1-1 1.2-.5.1-.9.1-1.4.1-1.6.1-3 .1-4.5 0M41.7.1H43c.3 0 .4 0 .4.4v2.2c-.1.2-.2.3-.4.3h-2.6c-.3 0-.4 0-.4-.4V.4c0-.3.1-.4.4-.4.4.1.9.1 1.3.1M111.6 3c-.4 0-1.1.2-1.4-.1s-.1-1-.1-1.5c0-.4-.2-1 .1-1.3.2-.2.8-.1 1.2-.1h1.6c.3 0 .4.1.4.4v2.2q0 .45-.3.3c-.5.1-1 .1-1.5.1m55 3.4c.5-.9 1.5-.8 2.4-1.1.2 0 .3 0 .5-.2 1.5-.3 3-.4 4.5-.1.8.3 1.6.5 2.3 1 .8.6 1.2 1.5 1.4 2.5v2q-.15 1.2 0 2.4v1.2c0 .5.3.8.8.7.4.1.7.2 1.1.3 0 0 .1 0 .1.1.6.9.5 1.4-.2 2.1-.3.1-.7.2-1 .3h-2.9c-.4 0-.9.1-.7-.7l-.6.3c-.9.4-1.9.6-2.9.7l-1.8.1c-.4-.1-.9-.2-1.3-.3-.6-.3-1.2-.6-1.8-1-.4-.4-.8-.8-1-1.3-.1-.4-.2-.7-.3-1.1 0-1.8 1-2.9 2.4-3.8.3-.2.7-.4 1-.5.7-.2 1.5-.3 2.2-.5 1.3-.2 2.5 0 3.7.2.2 0 .4.1.3-.2.1-1-.3-1.5-1.2-1.7-.3-.1-.7-.1-1-.1-1.3 0-2.6.2-3.9.5-.4.1-.8.1-1.3 0-.6-.2-.8-.8-.8-1.8m7.1 8.1c1-.3 1.2-.5 1.2-1.3 0-.3.1-.7-.4-.7-.6-.2-1.2-.2-1.8-.2-1.1-.1-2.2-.1-3.2.5-.5.1-.8.4-1.1.7-.2.2-.4.5-.2.8 0 .3.2.4.4.5.4.3 1 .4 1.5.4.7.1 1.4 0 2-.2.5-.1 1-.3 1.5-.5 0 .1 0 .1.1 0"/></svg>         `,
            surfers: `
<svg baseProfile="tiny" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 357.6 55.5" overflow="visible" xml:space="preserve"><path fill="#fff" d="M332.2 30.2c13.6 0 24.6 10.7 25.3 24-.7-27.2-23-49.1-50.4-49.1-27.9 0-50.4 22.6-50.4 50.4h50.2c0-14 11.3-25.3 25.3-25.3M39.7 28.3H27c.1-.8-.1-1.5-.4-2.1-.4-.6-.9-1-1.5-1.3s-1.4-.5-2.2-.5c-1.4 0-2.7.3-3.8.9s-1.8 1.4-1.9 2.4c-.1.4 0 .8.4 1.1.3.3 1.2.7 2.7.9l7.8 1.4c3.9.7 6.7 2 8.5 3.9s2.4 4.4 1.9 7.5c-.5 2.7-1.6 5-3.5 6.9s-4.3 3.4-7.2 4.4q-4.35 1.5-9.6 1.5c-6.2 0-10.8-1.2-13.9-3.7S-.2 45.9.1 41.9h13.7c0 1.3.5 2.2 1.3 2.9s1.9 1 3.3 1c1.5.1 2.8-.3 3.9-.9s1.8-1.5 1.9-2.5c.1-.6-.2-1-.7-1.3s-1.6-.6-3.1-.9L13.7 39c-3.9-.7-6.7-2.1-8.5-4.2C3.4 33 2.8 30.3 3.3 27c.4-2.6 1.5-4.8 3.2-6.6s3.9-3.1 6.6-4S19 15 22.6 15c5.9 0 10.3 1.2 13.4 3.5 3 2.4 4.3 5.7 3.7 9.8m28.8 9.3 3.7-22.1h14.1l-6.5 39.3H66.3l1.2-7.5h-.4c-1.2 2.5-3 4.5-5.4 5.9s-5.1 2.1-8 2.1c-2.7 0-5-.6-6.9-1.9s-3.1-3-3.9-5.2-.9-4.8-.5-7.6l4.2-25.1h14.1L57 37.6c-.3 1.9 0 3.5.8 4.6s2.1 1.7 3.8 1.7c1.2 0 2.2-.3 3.2-.8q1.35-.75 2.4-2.1c.7-1 1.1-2.1 1.3-3.4m16.6 17.2 6.5-39.3h13.7l-1.2 7.5h.4c1.2-2.8 2.7-4.8 4.4-6.1s3.7-1.9 5.8-1.9c.6 0 1.2 0 1.8.1s1.1.2 1.7.4l-2 12.1c-.7-.3-1.5-.4-2.5-.5s-1.9-.2-2.6-.2c-1.4 0-2.6.3-3.8.9s-2.2 1.5-3 2.6-1.4 2.4-1.6 3.9l-3.4 20.5zm59.6-39.3L143 25.8h-26.3l1.7-10.2h26.3zm-27.9 39.3 6.7-40.4c.5-3.2 1.5-5.9 3.1-8.1q2.25-3.15 5.7-4.8c2.3-1.1 4.9-1.6 7.7-1.6 1.8 0 3.5.1 5.2.4s2.9.5 3.6.7l-3.7 10.1c-.5-.2-1.1-.3-1.7-.4s-1.2-.1-1.8-.1c-1.3 0-2.2.3-2.8.8-.6.6-.9 1.3-1.1 2.2l-6.9 41h-14zm43.8.7c-4.2 0-7.7-.8-10.4-2.4s-4.7-3.9-5.8-7c-1.1-3-1.3-6.7-.6-10.9.7-4.1 2.1-7.6 4.2-10.6s4.8-5.4 8.1-7.1 6.9-2.5 11-2.5c3 0 5.6.5 7.8 1.4s4.1 2.3 5.5 4c1.4 1.8 2.4 3.9 2.9 6.4s.5 5.3 0 8.4l-.5 3.3h-35.1l1.2-7.8H171q.3-1.65-.3-3c-.4-.9-1-1.5-1.8-2s-1.8-.7-3-.7-2.2.2-3.3.7c-1 .5-1.9 1.2-2.6 2.1s-1.2 1.9-1.4 3.1l-1.5 8.2c-.2 1.3-.1 2.4.2 3.4.4 1 1 1.8 1.9 2.3s2 .8 3.4.8c1 0 1.9-.1 2.7-.4.9-.3 1.6-.7 2.3-1.2s1.2-1.2 1.6-1.9h12.9c-.9 2.7-2.4 5.1-4.4 7.1s-4.4 3.6-7.3 4.7-6.2 1.6-9.8 1.6m23.3-.7 6.5-39.3h13.7l-1.2 7.5h.4c1.2-2.8 2.6-4.8 4.4-6.1s3.7-1.9 5.8-1.9c.6 0 1.2 0 1.8.1s1.1.2 1.7.4l-2 12.1c-.7-.3-1.5-.4-2.5-.5s-1.9-.2-2.6-.2c-1.4 0-2.6.3-3.8.9s-2.2 1.5-3 2.6-1.4 2.4-1.6 3.9L198 54.8zm69.7-26.5h-12.7c.1-.8-.1-1.5-.4-2.1-.4-.6-.9-1-1.5-1.3s-1.4-.5-2.2-.5c-1.4 0-2.7.3-3.8.9s-1.8 1.4-1.9 2.4c-.1.4 0 .8.4 1.1.3.3 1.2.7 2.7.9l7.8 1.4c3.9.7 6.7 2 8.5 3.9s2.4 4.4 1.9 7.5c-.5 2.7-1.6 5-3.5 6.9s-4.3 3.4-7.2 4.4q-4.35 1.5-9.6 1.5c-6.2 0-10.8-1.2-13.9-3.7s-4.5-5.7-4.2-9.7h13.7c0 1.3.5 2.2 1.3 2.9.8.6 1.9 1 3.3 1 1.5.1 2.8-.3 3.9-.9s1.8-1.5 1.9-2.5c.1-.6-.2-1-.7-1.3s-1.6-.6-3.1-.9l-6.8-1.2c-3.9-.7-6.7-2.1-8.5-4.2q-2.7-3.15-1.8-8.1c.4-2.6 1.5-4.8 3.2-6.6s3.9-3.1 6.6-4 5.9-1.4 9.5-1.4c5.9 0 10.3 1.2 13.4 3.5 3 2.7 4.2 6 3.7 10.1"/></svg>      `,
   kusthotellet: `
<svg baseProfile="tiny" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 162.7 41.5" overflow="visible" xml:space="preserve"><path d="M162.7 41.2v-2.7h-7.1V22.2h-2.9v19zm-14.6 0v-2.7H141V22.2h-2.9v19zm-15.1 0v-2.6h-8v-6h6V30h-6v-5.1h8v-2.6h-10.8v19H133zm-20.3 0V24.9h4v-2.7h-10.9v2.7h4v16.3zm-19.6-2.4c-3.9 0-6.8-3-6.8-7s2.9-7 6.8-7 6.8 3 6.8 7c0 3.9-2.9 7-6.8 7m0 2.7c5.3 0 9.7-4.4 9.7-9.8 0-5.3-4.4-9.7-9.7-9.7-5.4 0-9.7 4.4-9.7 9.7 0 5.4 4.3 9.8 9.7 9.8m-14.4-.3v-19h-2.9v7h-6.9v-7H66v19h2.9v-9.3h6.9v9.3zm-22.1 0V24.9h4v-2.7H49.7v2.7h4v16.3zm-15.9.3c3.2 0 5.7-2.4 5.7-5.5 0-5.2-7.3-6.9-7.3-9.6 0-1 .7-1.8 1.7-1.8.8 0 1.4.6 1.9 1.3l2.1-1.7c-.9-1.4-2.3-2.2-4.1-2.2-2.4 0-4.5 1.8-4.5 4.4 0 4.7 7.3 6.2 7.3 9.6 0 1.7-1 2.9-2.8 2.9-1.5 0-2.7-.9-3.4-2.6l-2.5 1.4c1.1 2.5 3.5 3.8 5.9 3.8m-16.9-2.7c-1.8 0-3.3-1.5-3.3-3.8V22.2h-2.9v12.3c0 4.9 2.9 6.9 6.2 6.9s6.3-2 6.3-6.9V22.2h-2.9V35c0 2.3-1.5 3.8-3.4 3.8M2.9 41.2v-7l1.2-1.6c.3-.5.6-1 .7-1 0 0 .2.5.5 1.1l4.4 8.6H13l-6.3-12 5-7H8.4l-5 7c-.3.4-.6.9-.6 1 0-.1.1-.7.1-1.2v-6.7H0v19h2.9zm117.6-29.5c2.1 0 3.6-1.4 3.6-3.4 0-3.2-4.4-3.9-4.4-5.4 0-.5.4-.8.8-.8.5 0 .9.3 1.2.8l1.6-1.4c-.6-.9-1.5-1.5-2.8-1.5-1.6 0-3.1 1.2-3.1 2.9 0 3.1 4.4 3.7 4.4 5.4 0 .7-.5 1.2-1.3 1.2s-1.5-.5-2-1.4l-1.9 1.3c.8 1.6 2.3 2.3 3.9 2.3m-6.1-2.2V5.3H110v2h2.3v1.4c-.6.6-1.5.8-2.3.8-1.9 0-3.4-1.6-3.4-3.6s1.5-3.6 3.4-3.6c1.1 0 2 .5 2.6 1.3l1.7-1.5c-1.1-1.3-2.5-2-4.3-2-3.2 0-5.8 2.6-5.8 5.8s2.5 5.8 5.8 5.8c1.9 0 3.3-.9 4.4-2.2m-16.6-4h-1.5V2.3h1.5c1.1 0 1.8.6 1.8 1.6s-.7 1.6-1.8 1.6m-1.5 6V7.6h1.8l1.6 3.9h2.5L100.3 7c1-.6 1.6-1.7 1.6-3.2 0-2.3-1.4-3.7-3.7-3.7H94v11.4zm-5.6 0v-2h-4.6v-3h3.2v-2h-3.2V2.2h4.6v-2h-6.9v11.4h6.9zM75.5 4.2V1.8h.9c1.6 0 1.3 2.4 0 2.4zm0 5.4V6.3h1.3c2.2 0 2.3 3.3 0 3.3zm1 1.9c3 0 4.3-1.5 4.3-3.5 0-1.5-.9-2.6-2.3-3.1.7-.4 1.2-1.1 1.2-2.1 0-1.5-1-2.6-3-2.6h-3.5v11.4h3.3zm-10.7-6h-1.5V2.3h1.5c1.1 0 1.8.6 1.8 1.6s-.6 1.6-1.8 1.6m-1.4 6V7.6h1.8l1.6 3.9h2.5L68.4 7c1-.6 1.6-1.7 1.6-3.2C70 1.5 68.6.1 66.3.1h-4.1v11.4zM53.7 5.8c.3-1.1.7-2.3.8-3.2.1.7.5 2.1.8 3.2l.4 1.2h-2.3zm3.3 5.7h2.5L55.8.2h-2.6l-3.7 11.4H52l.8-2.7h3.4zM44.4 5.9c-.3 1.1-.7 2.3-.8 3.2-.1-.9-.5-2.1-.8-3.2L41.1.2h-2.5l3.7 11.4h2.6L48.6.2h-2.5z"/></svg>      `,
      solviken: `
<svg id="Lager_1" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 223.3 47.9"><defs><style>.st0{fill:#fff}</style></defs><path class="st0" d="M13.3 38.4c0 .7-.1 1.3-.2 1.9s-.2 1.3-.4 1.8-.6.9-.9 1.3c-.3.5-.5.9-.9 1.3-.3.4-.5.8-.9 1.1-.3.3-.7.6-1.1.9-.3.2-.8.3-1.1.5-.4.2-.7.5-1 .6 0 0-.1-.1-.2 0l-.2.2c-.4 0-.8-.3-1.2-.7s-.6-.7-.6-1.1.3-1 1-1.3c.4-.1.8-.4 1.2-.8.3-.3.7-.6 1-1.1.2-.4.4-.8.6-1.3.2-.4.2-.9.3-1.3 0-.4.2-.9.2-1.4s0-1.1-.2-1.6c0-.6-.3-1-.5-1.5s-.3-1-.6-1.5-.6-1-1-1.5c-.3-.4-.7-.9-1.1-1.4-.4-.4-.7-1-1.1-1.4s-.9-.8-1.3-1.2c-.4-.5-.6-1-1-1.5s-.9-.9-1.1-1.3-.4-.9-.6-1.4-.2-1-.3-1.5c0-.5-.3-1-.3-1.5s.1-1 .2-1.5c0-.5.3-.9.4-1.4.2-.5.3-1 .5-1.4s.6-.8.9-1.2.5-.8.9-1.1.8-.5 1.2-.7.9-.2 1.4-.3c.4 0 .9-.2 1.4-.2h1.5q.9 0 1.5.3c.5.2.9.5 1.3.9.3.4.6.8.8 1.3.2.4.2 1 .3 1.5v1.5c0 .5 0 .8-.1 1.2v1.3c0 .4-.4.7-.7.9-.4.2-.7.5-1.1.5s-.9-.1-1.2-.3-.5-.6-.5-1.1c0-.6-.2-1.2-.3-1.7-.1-.7-.1-1.3-.3-1.7-.3-.7-.8-1.1-1.5-1.1s-1.1.5-1.5 1.1c-.2.3-.4.8-.5 1.4 0 .4-.2.9-.2 1.4s.2 1.2.3 1.8c.2.6.3 1.2.6 1.7.2.4.6.8.9 1.2s.6.7 1 1.1c.3.3.5.9.8 1.2.6.7 1.2 1 1.5 1.3s.6 1 .9 1.4c.3.5.6.9.9 1.4s.7.9.9 1.4.3 1 .4 1.5.4 1 .5 1.5v1.6Zm31.9-7.7c0-.5-.1-1-.1-1.5V26c0-.5-.3-1-.4-1.5 0-.5 0-1-.2-1.4-.1-.5-.2-1-.3-1.4-.1-.5-.5-.9-.6-1.3-.2-.5-.2-1-.4-1.4-.2-.5-.6-.9-.9-1.3-.3-.5-.4-1-.8-1.4-.3-.4-.7-.8-1.1-1.1-.3-.3-.7-.6-1.1-.8s-.8-.5-1.2-.6-.9 0-1.3 0h-1.3c-.4.1-.8.4-1.2.6s-.7.5-1.1.8-.8.7-1.1 1.2c-.3.4-.5.9-.8 1.4-.2.4-.4 1-.6 1.5-.2.4-.4.9-.5 1.3-.2.4-.5.8-.6 1.3s-.2.9-.3 1.4-.1 1-.2 1.4c0 .5-.2 1-.3 1.5 0 .5-.2 1-.2 1.5s-.2 1-.2 1.5.1 1 .1 1.5v4.8c0 .5.3 1 .4 1.5 0 .5 0 1 .2 1.4.1.5.2.9.4 1.4.1.5.2.9.4 1.4s.4.9.6 1.3l.6 1.5c.3.5.6.8.9 1.3.3.4.6.9.9 1.3.3.3.8.4 1.2.7.4.2.8.4 1.2.5s.8.4 1.3.4.9-.1 1.3-.2.8-.4 1.2-.6.7-.5 1-.8c.4-.4.9-.6 1.2-1.1.3-.4.6-.9.8-1.4.2-.4.5-.9.7-1.4.2-.4.3-.9.5-1.4s.4-.9.5-1.3c.1-.5.2-.9.3-1.4s.2-.9.3-1.4c0-.5.3-1 .4-1.5 0-.5.2-1 .2-1.5v-1.6c0-.5.1-1 .1-1.5Zm-5 6.3c0 .5-.1.9-.2 1.4 0 .5 0 .9-.2 1.4-.1.6-.3 1.1-.5 1.6-.2.6-.4 1.1-.7 1.5-.2.4-.5.7-.8.9s-.7.2-1.2.2c-.8 0-1.3-.4-1.8-1.1-.3-.4-.6-.9-.8-1.4s-.3-1-.4-1.6c0-.5-.1-.9-.2-1.4 0-.5-.2-.9-.3-1.4 0-.5-.2-.9-.2-1.4v-1.6c0-.5.2-1.1.2-1.6v-3.2c0-.6 0-1.1.1-1.6 0-.6 0-1.1.1-1.6 0-.5.1-.9.2-1.4v-1.4c0-.5.2-.9.2-1.4.1-.6.3-1.1.5-1.6.2-.6.5-1 .8-1.4.2-.4.4-.7.7-.9s.7-.2 1.1-.2.8 0 1.1.3c.3.2.5.5.8.8.3.4.6.9.8 1.4s.3 1 .4 1.6c0 .4.3.9.3 1.3v1.4c0 .4.3.9.3 1.4s0 1.1.1 1.6c0 .5-.2 1.1-.2 1.6V34c0 .6-.2 1.1-.3 1.6s0 .9 0 1.4Zm22.7-19.5v-2.2zm.1 4.4v-3.3zm3.4 3.1v.9-1Zm.3 14.9V39v.8ZM66.9.7v1.8zm0-.2v.1h.2s-.2-.2-.2-.1m.4 47.1h-5.4q-.6 0-.9-.6c-.2-.4-.2-.9-.2-1.5s.1-.8.3-1.2.4-.4.7-.4.2-.2.4-.2.3.2.3.2v-.1c0-.4.1-.8.2-1.4V41c0-.5.3-.9.3-1.4s-.2-1-.2-1.5.1-.9.1-1.4v-1.5c0-.5.1-1 .1-1.5s-.2-1-.2-1.5.1-1 .1-1.5v-3c0-.7-.1-.7-.1-1.5v-3c0-.5 0-.7.2-.9v-7.1c0-.6-.3-1.1-.3-1.6v-3.1c0-.5 0-.9-.1-1.4V4.9c0-.2-.1 0-.2 0h-1c-.4 0-.6-.3-.8-.6s0-.8 0-1.3 0-1 .3-1.4c.2-.4.4-.5.7-.5s.5-.1.9 0c.6 0 1.1-.1 1.4-.1h1.4c.7 0 1.3.1 1.8.2v1.9c0 .4.1.8.1 1.2v1.6c0 .5-.1 1.1-.1 1.6v3.2c0 .5-.2 1.1-.2 1.6v4.2c0 .5-.1 1-.1 1.4 0 .5-.2 1-.2 1.4v1.4c0 .8.1.8.1 1.7v1.7c0 .9-.2.8-.3 1.3s0 .2 0 .4V32c0 .5.3 1 .3 1.5s-.3 1-.3 1.5v.2c0 .5.3.9.3 1.3v1.6c0 .4 0 .8-.1 1.2v.9c0 .4.2.8.2 1.1 0 .5.2 1.1.3 1.6v1.6c0 .5.1 1.1.1 1.6v1.7Z"/><path class="st0" d="M61.4.6c-.3 0-.5.2-.7.5-.2.4-.3.8-.3 1.4 0-.6 0-1 .2-1.4s.4-.5.8-.5m1.6 18v-1zm41.9-2.8c0 .7-.2 1.1-.6 1.4s-.8.5-1.4.6c0 0-.2 0-.3.1h-.3v-.1c-.2.5-.3 1-.4 1.5s-.3 1-.4 1.5-.2 1-.4 1.5c-.1.5-.2 1-.4 1.5-.1.5-.3 1-.5 1.5-.1.5-.3 1-.5 1.5-.1.5-.1 1-.3 1.5-.1.5-.4 1-.5 1.5l-.3 1.5c-.2.8-.3 1.5-.4 1.9-.1.5-.3 1-.5 1.6-.1.5 0 1.1-.2 1.6-.1.5-.3 1.1-.4 1.6s-.4 1-.5 1.5-.1 1.1-.2 1.6-.3 1.1-.4 1.6c-.1.6 0 1.1-.1 1.6-.1.6-.3 1.1-.4 1.6-.2.4-.5.7-.8 1s-.6.4-1 .4c-.9 0-.9.1-1.7.1s-.9.2-1.7 0c-.1-.6-.3-1.1-.4-1.6-.1-.6-.3-1.1-.4-1.6-.1-.6-.2-1.1-.3-1.6s-.1-1-.2-1.5-.3-1-.4-1.5l-.6-3c-.1-.5 0-1-.2-1.5-.1-.5-.4-1-.5-1.4-.1-.5 0-1-.2-1.5-.1-.5-.4-1-.5-1.4l-.3-1.5c-.1-.5-.1-1-.2-1.5s-.4-1-.5-1.4c-.1-.5-.1-1.1-.3-1.6-.1-.5-.3-1.1-.5-1.6-.1-.5-.3-1-.5-1.6-.2-.5-.2-1.1-.3-1.6-.2-.5-.4-1-.5-1.5s-.4-1-.6-1.5l-.6-1.5c-.2-.5-.3-1.1-.5-1.6h3c.9 0 1.5.2 1.8.2h3.1c.4 0 .7.2 1 .6s.6.8.6 1.3-.1 1.1-.5 1.5c-.3.4-.7.6-1.1.6s-.7-.3-1.2-.6c-.2-.1-.3-.2-.3-.2 0 .5 0 1 .1 1.5 0 .5.3 1 .4 1.4v1.5c0 .5.1 1 .2 1.5 0 .5.3.9.4 1.4 0 .5.2 1 .3 1.5 0 .5 0 1 .1 1.5s.3 1 .5 1.5c.1.5.3 1 .4 1.5s.1 1 .2 1.5.4 1 .5 1.5.2 1 .4 1.5l.3 1.5c.1.5.3 1 .4 1.5s.3.9.4 1.4c.1-.5.4-.9.5-1.3l.3-1.5.3-1.5c.1-.5 1.5-6.9 1.6-7.4s.1-1 .2-1.5c0-.5.3-1 .4-1.5 0-.5.1-1 .2-1.5s.3-1 .4-1.5c0-.5 0-1 .2-1.5 0-.5.2-1 .2-1.5s.4-1 .5-1.5h-.1l-.1.2q-.45.6-.9.6c-.5 0-.8-.3-1.1-.6-.2-.4-.3-.8-.3-1.3s.1-1 .4-1.4.6-.7 1.1-.7h1.8c.8 0 1.3.2 1.7.2h1.8c.7 0 1.2-.3 1.7-.3.4 0 .6.3 1 .7.3.4.5.7.5 1.2Zm21 28.2v.7zm-.4-13.1v.4-.7zm-2.8-8.7V22zv.6zm2.9-16h-.2c.3 0 .6-.2.9-.3-.2 0-.4.2-.7.2Zm2.5-4.3c-.2-.3-.4-.6-.7-.9s-.6-.5-1-.7q-.6-.3-1.2-.3h-2.4c-.6 0-.8 0-1.2.2-.3.2-.7.5-1 .7-.3.3-.6.6-.8 1q-.3.6-.3 1.2c0 .6.2 1 .4 1.4s.4.9.8 1.2 1 .3 1.5.4 1 .5 1.5.5 1-.3 1.4-.5h.2c.2 0 .5-.1.7-.2h.1c.2 0 .4-.2.7-.4.4-.3 1-.5 1.2-1 .2-.4.2-1 .2-1.5s-.2-.8-.3-1.1Zm-7.2-.8c.1-.1.3-.3.5-.4-.2.1-.3.2-.5.4l-.3.3s.1-.2.2-.3Zm5.2 44.7c0 .5.2 1.1.2 1.6h-4.4V46c0-.4.2-.9.2-1.4v-1.4c0-.5.2-.9.3-1.3v-2.8c0-.5.3-1 .4-1.5 0-.5-.1-1-.1-1.5v-3c0-.5.1-1 .1-1.5v-3.4c0-.5-.1-1-.1-1.5s0-1-.1-1.5c0-.5.3-1 .3-1.5V22c0-.5-.3-.9-.4-1.2v-1.4c0-.7.2-1.3.1-1.5-.1 0-.5.1-.7 0-.2 0-.4-.2-.5-.2-.6-.2-1-.7-1-1.7s.1-1.1.3-1.5.6-.6.9-.6h5c0 .6-.1 1.1-.2 1.6 0 .5-.2 1.1-.2 1.6s-.1 2.7-.1 3.2c0 .6-.1 1.1-.1 1.6s.2 1 .2 1.5-.2 1-.2 1.5 0 1-.1 1.5c0 .5.2 1 .2 1.5v1.5c0 .5-.2.7-.3 1.2v.7c0 .4.1.5.1 1.2v1.4c0 .5-.2.9-.2 1.4s.2.9.2 1.4v2.8c0 .5.1 1.1.1 1.6s.2 1 .2 1.6c0 .5-.2.9-.2 1.4v.7c0 .4.2.7.2 1.1Zm19.1-16.5v.2zm.1-24.4v.4-1.8zm3.4 20.2v.9-1Zm5.4 20.4c-.1-.5-.3-.9-.5-1.4 0 .1 0 .2.1.4.1.4.2.7.3 1.1Zm1-8.4s0-.2-.1-.2c0-.2-.1-.4-.2-.6.1.3.2.5.3.8"/><path class="st0" d="M160.8 47.3c-.3 0-.9.1-1.6.2-.9.1-1.5.2-2 .2-.7 0-1.3-.2-1.8-.5-.5-.2-.8-.6-1.1-1.2s0-.3-.1-.4c-.1-.4-.2-.7-.3-1.1 0-.1 0-.2-.1-.4-.2-.4-.3-.7-.5-1.1-.2-.5-.5-.9-.7-1.5-.2-.5-.3-1-.4-1.5-.2-.5-.5-.9-.7-1.5-.2-.5-.1-1.1-.3-1.6s-.6-.9-.8-1.4l-.6-1.5c-.2-.5-.2-1-.4-1.5-.2.3-.2.7-.3 1.5 0 .4-.2.9-.2 1.4v2.9c0 .5-.2.9-.2 1.4s.2.9.2 1.4v3.1c0 .6.3 1.1.4 1.6v1.7h-1.7c-.2 0-.6.1-1.1.2h-2.3c0-.5.1-1.1.2-1.6 0-.5 0-1.1.1-1.7V41c0-.5.2-1.1.2-1.7v-8c0-.5.2-1 .2-1.5 0-.6-.3-1.1-.3-1.6 0-.8.1-.8.1-1.5s.2-.8.2-1.4c0-.8-.2-.8-.2-1.6s.1-.8.1-1.5v-1.5c0-.7.1-.8.1-1.5s-.3-1-.3-1.6v-3.2c0-.6.2-1.1.2-1.6v-1.6c0-.8.1-1.3.1-1.6 0-.5-.2-1-.3-1.4 0-.5.2-1 .2-1.5V2.4c0-.5-.2-1.1-.2-1.6.5-.2.7.2 1.2.2h1.2c.7 0 1.2.1 1.5.6s.5 1.1.5 1.8-.3 1.1-.4 1.6c0 .6.2 1.1.1 1.6v3.2c0 .6-.2 1.1-.2 1.6v6.7c0 .3-.2.7-.2 1v2.5c0 .3.2.6.2.9v1.7c0 .9-.2.8-.3 1.3v1c0 .3.1.5.3 1.1.4-.4.6-.9 1.1-1.4.4-.4.7-1 1.2-1.5.4-.4.8-.8 1.1-1.2.4-.5.8-.9 1.1-1.3.2-.3.4-.7.7-1.1.2-.3.5-.7.7-1.1s.4-.7.7-1.1c.5-.9 1.2-1.3 1.8-1.3s1 .1 1.3.5c.4.4.5 1 .5 1.4s-.3.5-.5.8c-.2.2-.5.7-.9 1.2-.2.3-.4.7-.7 1.1-.2.3-.5.7-.8 1.1-.3.5-.5.9-.8 1.3-.3.5-.5.9-.8 1.3-.3.5-.7.8-1 1.1-.7.9-1.2 1.4-1.6 1.5.1.5.5.9.7 1.4s0 1 .2 1.5.5.9.7 1.3c.2.5.2 1 .4 1.4.2.5.2 1 .4 1.4 0 .2.2.5.2.7v.1c0 .2.1.4.2.6 0 0 0 .2.1.2.2.3.6.6.7 1 .2.5.3 1 .5 1.4s.4.9.7 1.3c.2.4.5.8.8 1.3.2.4.5.8.8 1.3.2.4.2 1 .5 1.4s.7.8.9 1.2c.3.4.6.9.8 1.3Zm29.5-8.9c-.3-.3-.7-.5-1.2-.5s-1 0-1.3.4c-.2.4-.4 1-.5 1.8 0 .5 0 1-.2 1.5s-.6.8-.8 1.2c-.3.4-.6.8-1.2.9-.4.1-1 .1-1.5.1s-1.4-.1-1.9-.4c-.6-.3-1.1-.8-1.3-1.4-.1-.4 0-.9 0-1.4 0-.4-.1-.9-.2-1.4 0-.4-.2-.9-.2-1.4V35c0-.5-.2-1.2-.2-1.7v-1.8c.7-.3.8.1 1.6.1s.8-.2 1.6-.2h4.7c.8 0 .8.2 1.6.2s.8 0 1.5-.2V30c0-.5-.1-1-.1-1.5V27c0-.5 0-1-.1-1.5 0-.5 0-1-.1-1.5 0-.5-.4-1-.4-1.4 0-.5 0-1-.2-1.5-.1-.5-.3-1-.4-1.4-.2-.5-.2-1-.4-1.4-.2-.5-.5-.9-.8-1.3-.3-.5-.4-1-.7-1.4s-.7-.9-1.1-1.2-1-.3-1.5-.5c-.5-.1-1-.4-1.5-.4v.1c-.5 0-1-.1-1.4 0-.5.1-.9.3-1.3.5s-.7.6-1.1.9-.9.6-1.2 1-.6.8-.8 1.3c-.2.4-.6.8-.8 1.3-.2.4-.3.9-.4 1.3-.2.4-.2.9-.4 1.3-.1.4 0 .9-.2 1.4 0 .5-.4.9-.5 1.3s-.2 1.1-.2 1.6 0 1.1-.1 1.6v9.2c0 .5 0 1 .1 1.5v1.7c0 .6.3 1.1.4 1.7s.4 1.1.6 1.6.2 1 .5 1.4c.2.4.7.7 1 1s.6.7 1 1 .9.7 1.4.9 1.1.1 1.6.2 1 .2 1.6.2h1.4c.5 0 .9-.1 1.4-.2.5 0 .9-.4 1.3-.5.5-.2.9-.3 1.2-.6.5-.4 1-.7 1.3-1.3.2-.5.4-1.1.5-1.7.1-.5 0-1.1.1-1.8 0-.5.3-1.2.3-2.1s-.3-.7-.7-1.1ZM180 23.7c0-.6.3-1.1.4-1.6 0-.6.1-1.1.3-1.6.1-.4.4-.8.5-1.1.2-.4.4-.8.6-1.1.5-.6 1-.9 1.8-.9s1.2.2 1.6.7c.3.4.2 1 .4 1.7 0 .4.1 1 .2 1.5 0 .5.1 1 .1 1.5v3.1c0 .5.1 1 .1 1.5-.7.3-.7 0-1.5 0H180c-.7 0 0 0 0 0 0-.5.2-.9.2-1.3v-1.3c0-.5-.1-.9 0-1.3Zm43.3 23.7h-2.1c-.6 0-1-.2-1.2-.2-.3 0-.7.1-1.2.2h-1c0-.5.3-1 .3-1.5v-1.5c0-.5.3-1 .3-1.5v-1.5c0-.4 0-.9.1-1.5v-3c0-.5.1-1 .2-1.5v-5.1c0-.9-.2-1.1-.2-1.6v-3c0-.6.1-1.1 0-1.5 0-.7 0-1.2-.1-1.8v-1.8c-.1-.7-.4-1.2-.6-1.6-.3-.6-.8-.9-1.4-.9s-.8.2-1.2.6c-.3.2-.7.5-1 .9s-.5.9-.8 1.4c-.2.5-.3 1-.5 1.5s-.3 1-.5 1.5c0 .3-.1.8-.2 1.2 0 .4-.2.8-.2 1.2v6.4c0 .7-.1 1.1-.1 1.6s.1 1.1.1 1.6v3.2c0 .6.1 1.2.2 1.6v1.8c0 .4.2.8.3 1.1 0 .1 0 .3.2.3h.4c.5 0 .8.2 1 .5s.1.7.1 1.2-.2 1-.4 1.3c-.3.4-.6.6-1.1.6s-.4 0-.7-.1h-2.5c-.9 0-1.6.3-2.1.3v-1.5c0-.4.2-.9.3-1.5v-3c0-.5.2-1 .3-1.5v-4.5c0-.5.1-1 .1-1.5v-2.7c0-.6.2-.6.2-1.2V29c0-.5-.2-.9-.2-1.3 0-.5.2-.9.2-1.4s-.2-.9-.2-1.3v-6c0-.6-.3-1.1-.4-1.6v-3.2c.7-.2.7 0 1.4 0h1.4c.7 0 1 .2 1.4.5.3.3.4.8.4 1.4.4-.5.9-.9 1.3-1.2.5-.3 1-.5 1.6-.7.5-.2 1.1-.4 1.7-.4.5 0 1 0 1.5.2.5.1 1 .3 1.4.5.4.3.6.7.9 1s.6.7.8 1.1.4.9.6 1.4c.1.5.3 1 .4 1.5 0 .6.1 1.1.2 1.7 0 .6.1 1.2.1 1.8v6.6c0 .5-.2 1-.2 1.4 0 .5.1 1 .1 1.5v5.4c0 .6.1 1.2.1 1.8s-.1 1.1 0 1.7c0 .6.2 1.1.3 1.7 0 .6.1 1.1.2 1.7 0 .5-.1 1 0 1.3 0 .6.1 1 .2 1.3Z"/></svg>      `,
      olles: `
<svg id="Lager_1" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 147.7 59.5"><defs><style>.st0{fill:#fcfcfb}.st1{fill:#e64c14}.st2{fill:#1f202a}</style></defs><path class="st1" d="M0 7.9h23.8v42.3H0z"/><path class="st2" d="M112.6 0H146v59.5h-33.4z"/><path class="st0" d="M123.4 38.8v2.4z"/><path class="st1" d="M113.5 59.5h34.2V0h-34.2zm9.1-1.7c0-.6.6-.6 1-.2-.2.4-.6.6-1 .2m1 .5c0-.4.4-.6 1-.5.1.8-.6.9-1 .5m1-.7v-.5h1c.2.7-.5.4-1 .5m1.2 1.2h-.5v-.5h.5zm2.9-1c-.3-.8.8-.2.5-1 .3 0 .2.6.2 1zm1.7-.2c-.3 1.1-1-1.1 0-.7 0 .4-.4.6 0 .7m2.6.7h-.5v-.5h.5zm1-3.1c.8-.3.6.4 1 .5-.5.3-.7 1.1-1.5 1.2.2-.8 1-.8.5-1.7m0 2.9c.2-.2.5-.3 1-.2-.3.3-.3.6.2.7-.2.5-1.4.1-1.2-.5m1.5-1.5c1.2-.1 0 .9 1 .7-.3.6-1.3 0-1-.7m1.2-8.2c-.6.5-.6-.1 0-.2.2-1.1 1.1-1.5 1.2-2.7.6 1-1 1.9-1.2 2.9m5.1-15.8c.3-.4 0 .7.2 1.5-.5-.2-.7-1.1-.2-1.5m1.4 1.7c-.8 0-1.1-.6-1-1.5.7-.3.9 1.2 1.2.5.7.2-.6.4-.2 1m-6.3-20.6c0 .8.8.8 1 1.5s-.3.6-.2 1.2c.6 1.5 1.7 2.5 2.9 3.4.3 1.6 1.3 3.3 1.7 5.3.3 1.7-.3 3.9 1.2 4.8-.6 1-1.2.8-2.2 1.2-1.1-5.1-2.2-10.3-5.1-13.6-1.3 1.2-1.5 3.5-1.9 5.6-1.3 5.5-2.3 13.6-.7 20.4-.8 0-.8-.8-1.7-.7 0 1 1.3.9 1.9 1.5.3 1.7.8 3.2 1.7 4.4-1.1 1.7-2.3 3.3-2.7 5.8 0 1 .8-.2 1 .5 0 1.1-.7-.1-1 .5.8.5.6.6.5 1.7-.3-.5-1.1-.6-1.2-1.2-.6 0 .1 1.1-.7.7.3.3.9.4 1.2.7 0 .5-.7.3-.5 1-.8.6-1.2-.7-1.2.2-.9.2 0-.9 0-1.2-.4-1.9.6-4.4.2-7 .5-.1.7-.6 1.5-.5.5-1.4 0-3.7 1-4.6-.5-.7-1.5-1-2.2-1.5.5-1.9.8-4.4-.7-5.3-.9 1.7-1.6 3.2-1.2 5.6-4.4.9 1.2 8.3-2.4 10.4 0 1.7.9 2.3.7 4.1-.7-.2-.5.5-.7.7-.8-4.7-3.3-8.9-2.7-14.3 0-.6-.5-.6-1-.7v-.9c-.2 0-.4-.2-.5-.3 0-1 .3-2.5-.5-2.9l.2-.5c.8-2.8-.5-7.7.9-9.8.5-2.6 1.6-5.2 1.2-7.7-.3-1.8-1.5-2.8-2.4-4.6-1.3 2.9-2 6-3.2 9.7-.5 1.7-1.6 3-1.5 5.1 0 1.2.8 2.8 0 4.6-.9.2-.9-.5-1.7-.5-.6-2.4.2-5.9.7-9.5.2-1.1.2-2.3.5-3.4.2-.5.8-1.1 1-1.7.6-2.4.5-4.2 1-6.8.7-3.4 3.4-4.6 6.3-5.8-.5-3.1-2.1-6 0-8.7 3.6-1.2 5.2 1.3 5.1 4.6-.9-.3-.9-1.6-1.2-2.4-.7.2-.7.2-1.5 0 .3.3.2.5-.2.5-.3 1.5 1.7.8 1.7 1.9-.4.2-.7.9-1.7.2v1c.4.9.4-.7 1.2-.2.7.6.2.9.2 1.9-.7 0-1-.4-1.7-.5.6.8.6 1 1 2.4 2.1 1.1 5.3 3.2 5.6 6.3 1 0 .8-1.2 1.2-1.7-.6-1.6-3.8-2.8-1.7-4.8 1.4.8 2.2 2.3 2.9 3.9.7-.5 1-1.6 1.2-2.7-.7-.9-2.2-2.2-1-3.6.9.1.6 1.5 1.9 1.2 2-1.4 2.6-4.3 5.3-5.1-3.4 2.3-5.2 6.3-7 10.2Zm2.9 3.6c-.6-.5-1-1.1-1.2-1.9.6.5 1 1.1 1.2 1.9m-4.6 29.9c-.9-1.3-1.7-4.4-1.7-7.8.5 2.7.9 5.4 1.7 7.8"/><path class="st0" d="M60.1 49.3v-.1zm0 .8h.1Zm.3-2.7v-.1Zm-.3.5.1.1h.1-.1Zm3.9-.3v.1Zm-.4 1.7s0 .2.1.1Zm-2.7.2"/><path class="st2" d="M61.1 48.7H61v-.4c0 .3 0 .6-.2.9v.4h.4v.2h.2v-.4.1h.2Zm-.1.1"/><path class="st0" d="M60.4 49.3h-.1zm-2.5-2.4h-.1zm0 2.6h.1Zm1.9.6V50h.1Zm0 .3h.1zm4.3-2.6v-.1.2Zm3.8 1.5v.1Zm-.2-.2h.1Zm-1.3-1.6v-.1Zm-2.3 2.6V50Zm2-2.1v.1Zm0-.3v.1Zm4.4 1.8"/><path class="st2" d="M69.8 47.4h.1v.2c-.2 0-.4.3-.3.6 0 0 0 .2 0 0v1.4c0 .2 0 .3.3.4 0 0 0-.1 0 0v-2.1c0-.2 0-.3-.2-.4Zm-.3 2v.2-.4s0 .1 0 0zv.3Z"/><path class="st0" d="M68 49.6h-.1s.1 0 0 0Zm.5-2v-.1zm-4.9.5V48Zm-.9-.4h-.1Zm0-.8h.1zm-.3.3v-.1Zm1-.1h-.1Zm-.6 1"/><path class="st2" d="M63.5 48.3v-.2c0-.3-.2-.5-.4-.5h-.2v.5h.4s.2 0 .2-.1Zm-.6.1"/><path class="st0" d="M62.5 47.5s-.1-.1 0-.2v.1h.1s0 .1.1.1Zm1 1.8s.1 0 0 0m0 .5.1-.1Zm-.7-.7h.1Zm-.1-.4v.2Zm.1-.1h-.1Zm0-1h-.2zm-.1 1.3v-.1zM45.5 48h-.1zm.1 1.1s0 .1 0 0m-.1.2h.1Zm0-.2v.1zm.7-2s.1 0 0 0h.2-.3Zm-.7.9h-.2Zm.5.8v-.2.1Zm-.3-.3h-.1Zm2.5 1.4v.1ZM58.6 39v.2h-.1c0 .1.2 0 .3 0-.1 0 0-.3-.2-.2m-9.9 7.9v-.1ZM46 48.6c0-.1 0-.1-.2-.2 0 0 .1-.1.2 0Zm2.1 1.2"/><path class="st2" d="M44.3 49.4h-.2.1s-.1 0 0 0zs-.1 0 0 0v-.2h-.1v-.1c0-.4 0-.7-.2-1 0 0 0-.1-.2-.1v-.1h-.2v.2h.1v1.3h-.1.1v.5s0-.3.1-.3h.1c.3 0 .5-.3.5-.6h.2Zm-.9.8"/><path class="st0" d="M40.2 41.9s.1.1.3.1c0-.3.1-.3.2-.6-.3 0-.4.3-.4.5Zm0-19.2s0-.1-.1-.1v.3c.2 0 .4 0 .5-.2-.1-.1-.2 0-.3 0Zm.4 19.3c0-.2.3-.4.4-.6-.1.1-.5.5-.4.6m-1.1-18.3c.2 0 .2-.1.4 0 0-.3-.4-.2-.4 0m1.6 17.2c-.3 0-.3.1-.3.3h.2c0-.2.1-.2 0-.4Zm-.9.7c-.1.1-.6.3-.5.5.1-.2.2.4.5 0-.3-.1-.1-.4 0-.5m2.2-3.1c0-.2 0-.3-.2-.4v-.3c.2 0 .3-.2.6-.3 0-.5.2-.7.5-1.2 0-.1 0-.4-.2-.4 0 .3-.4.5-.1.8 0 .1-.4 0-.4.1.1.1-.1.7-.2.7s.1-.5 0-.2c-.3.3-.3.6-.3 1-.3 0-.2 0-.4.1 0 .3-.2.3-.2.6.2.1.2.7 0 .7s.1-.3-.1-.3c-.2.5-.2.9-.4 1.3.2 0 .4 0 .6.1 0 0-.1.1-.1.2h.3c-.1-.2.5-.8 0-.9 0 .1 0 .5-.2.5-.1-.3 0-.8.3-.8 0-.2 0-.5.2-.4.1 0-.1.2 0 .3 0-.4.3-.8.6-.9-.1-.3.1-.4 0-.7 0 .1 0 .3-.3.2Zm-.7.8c0-.2.3-.5.5-.3-.1.1-.2.3-.5.3m.1-.4c-.2 0-.1-.3 0-.4.3.2.2 0 .5 0 0 .5-.4.2-.4.4Zm2.9 9.8"/><path class="st0" d="M42.4 38.1c.3 0 .3-.5.5-.1 0-.2 0-.3.1-.6-.2.2-.5.4-.7.7Zm-2.5-14.9c.4 0 0-.5 0-.1zm-2.7 17 .1-.1s-.1 0-.1.1m-.1-1.2c0 .1-.1.1 0 .3.1 0 .3-.4 0-.3"/><path class="st2" d="M38.7 21.2c-.1-1.5-.5-2.3-1.6-3-.2 0-.4 0-.4-.2.5-.2.5.1.9.2.2-.2-.1-.4-.3-.5 0 0 0 .3-.2.3 0-.3.1-.4.1-.6-.2 0-.4 0-.6.1v.4c-.2-.2-.1.2-.3.1v-.4c.2 0 .1.1.2 0v-.3c-.2 0-.6.2-.5.3h.1c0 .2-.1.3-.2.4 0 0-.3 0-.3-.2 0-.3.1-.3.1-.4-.3 0-.5.3-.7.4 0 .1.3 0 .3.2-.6.3-.6-.3-.4-.7 0 0 .4.1.4 0-.3-.2 0-.5 0-.7-.2 0-.1.1-.3.1 0-.1 0-.3-.2-.4-.1.3 0 .4.1.6h-.4v-.3h-.3c-.1.4 0 1 0 1.4-1.9.6-3.1 2.4-2.5 4.5v-.1c-.1.4 0 .5 0 .9-.2-.1-.2 1.3 0 .7-.2.8 0 1.2-.2 1.8h.2c-.3 1.8.1 3.1-.1 4.9-.1 0-.3-.4-.3 0 .1 0 .3.4 0 .4-.2 0 .2-.3-.1-.2 0 .2-.2.3 0 .4 0-.4 0 .4.1.1 0-.3.1-.3.3-.5 0 .5-.3.8-.1 1 0 0 0-.1.1-.1-.1.4 0 .7 0 1.1-.3-.1-.3.4-.5.5.3-.1.3 0 .5 0-.3.4.3 1.6-.8 1.4 0 .1-.1.3 0 .3.1-.3.4-.1.7-.2-.2.5 0 1.3-.1 1.7h.1c-.2 1.4.8 2.6 2 2.9 0 .2-.2.3-.1.5-.1-.2-.3.6-.1.6 0-.2 0 0 .3-.1 0 .2 0 .5-.1.8h.5c0-.3 0-.9.2-.6.1-.5-.4-.5-.6-.7.3-.1.2-.4.4-.6h.5c0 .2-.1.4 0 .6.3 0 .1.2.3.2 0-.2.1-.2.1-.4-.2 0-.1-.1-.2-.2h.7c.2 0 .3.3.3.5.1-.2.1.1.2.1v-.4s0 .1-.1.1c0-.3-.2-.2-.1-.5q.2.2.4 0c.1.1 0 .2 0 .4h.3c-.2 0-.3-.6.2-.6 0 0-.1.1 0 .2 0-.1 0 0 .1 0 .2-.2-.2-.2 0-.4.1 0 0 .2.2.2.1 0 0-.4.2-.4 0 .1-.1.4 0 .4 0-.2-.1-.5.2-.5 0 .2-.1.2-.1.5h.2c0 .2-.3 0-.2.2.2.1 0 .4.2.5.1 0 0-.3 0-.5h.2c0-.2 0-.3-.2-.5.1 0 .3.2.4 0 0-.1-.1 0-.2-.1 0-.1 0-.3.1-.3 0 0 0 .3.2.3 0-.3 0-.2.1-.4-.2 0-.4 0-.4-.1.3-.2.2-.5.7-.9-.2-.4.2-.8.3-1 0-4.5 0-9.3.1-13.3-.2-.3-.1-1.1-.2-1.5Zm-4.6 8.4c0-.2.2-.1.2-.3.2 0 0 .4-.2.3m.6 5.2c0 .6.1 1.1.2 1.6-.1 0-.1-.1-.3 0 0-.2.1-.2 0-.4-.2 0-.1.1-.1.2-.4-.2.2-.6-.2-.9h.2c0-.2-.1 0-.2 0 0-.2.1-.1.2-.2-.1-.2-.2 0-.2-.3.1-.1.1 0 .2 0-.2-.3.1-.6-.2-.8 0-.1 0-.3.3-.3 0-.6-.2-1.2 0-1.6q-.2-.1-.1-.4v.2c.2-.4-.5-.5-.2-.8.3 0 0 0 0 0v-.5c0-.2.3-.4 0-.6.3 0 0 .8.3.8-.2.5.4 1.2.4 1.8 0 .8-.3 1.6-.4 2.4Zm3.4-11.9c0-.3.3-.3.2 0z"/><path class="st0" d="M40.5 23.5c0-.1 0-.2.1-.2 0 .2.3 0 .2-.2h-.2c0 .1-.3.4 0 .5Zm-7.3 15.7c0 .1-.2.2 0 .3.3 0 .3-.3 0-.3m-2-2.8c.1 0 .3 0 .3-.3h-.3c0 .2-.1.2 0 .3m9.8 3.1c.1 0 .3 0 .3-.3-.2 0-.2.2-.3.3m.1-16.8c-.2 0-.3 0-.3.2.2 0 .2.1.4.1v-.3Zm.4 15.5c0-.2.4-.3.1-.5 0 .3-.4.1-.4.4h.3Zm1.5-2.7v-.2h-.2c0 .2 0 .2.2.2M41.7 23c-.1 0-.3-.1-.5-.2 0 .2.1.2.1.3.1 0 .4 0 .3-.1Zm1.2 12.8c0 .1-.3.5-.1.6 0-.2.3-.4.1-.6m4.3-1.2s.1-.1.1-.2c-.2 0 0 .1-.1.2m-2.7 14.8s.1 0 0 0m-1.4-1.8H43Zm.2 2.5v.1Zm9-.3.1-.1Zm-.1-.5s.1 0 0 0m.6.8V50Zm1 .2s0-.1 0 0m-2.4-1.4v-.1zm.2-.3h-.1Zm0 .5h.1Z"/><path class="st2" d="M52.3 48.3v-.2c0-.3-.2-.5-.4-.5h-.2v.5h.4s.2 0 .2-.1Zm-.7.1"/><path class="st0" d="M56 49.5h.1Zm0-2.6h-.1zm-.7 2.8v.1zm-3.8-1v.2Zm-1.6-16.5c0 .3-.4.2-.3.5.2.1.8-.4.3-.5m2.4 17.1s0 .2.1.1Zm-.2-2.2H52Zm.3 1V48Zm-1.6-17c0 .1 0 .8-.2 1 .5-.3.2-.5.4-1h-.3Zm-.7 1.1c0-.1 0 0 .1 0v-.3H50s-.2.2 0 .3Zm-1.2.8v.1h.2v-.3c-.2 0-.3 0-.3.1Zm3.9 14.6v.1Zm0 .2v-.1.2Zm-1.6-.6v-.1Zm.3.4h-.2zm0-.7h.1zm-.3.6s-.1-.1 0-.2v.1h.1s0 .1.1.1Zm.2.2h-.1Zm-16.7-7.3c0 .2 0 .3.2.4 0-.3-.1-.2 0-.3Z"/><path class="st2" d="M13 24.2c0 .1-.1.4.1.4 0-.2 0-.4-.1-.4m-4.2-.6s.1 0 .2.1c-.4 0-.1 0 0 .2-.2.1 0 .6 0 .9h.2c-.1 0-.2 0-.2-.1.3 0 .3.4.5 0-.2 0-.3 0-.4-.2.1 0 .3.2.4 0-.1-.1-.4 0-.4-.2.1-.1 0-.1 0-.2.2 0 0-.3 0-.6h-.2Zm2.8 18.9c.2.2.2.4.4.2 0 0-.1-.4-.3-.6 0 .1 0 .2-.1.4m.3-1.9c-.2.2 0 .3 0 .6.2 0 .2.2.4.2s.1-.1.2 0c0-.2.2-.6 0-.7 0 .1-.2-.2-.4-.1ZM8.8 16.8c.2 0 .1-.2.1-.3 0 0-.1 0-.1.1.3 0-.2 0 0 .3.1 0 .2 0 .2-.1-.1 0-.2.1-.2 0m3 16.2c.1.1 0 .2-.2 0 0 .2.2.3 0 .4.2 0 .2.2.2.4.2 0 0-.3.3-.2v-.4c-.2 0-.1-.5-.3-.3Zm.2-1.9v.7c0-.1.1-.6 0-.7m.2-.6c-.1.1 0 .2-.1.3H12c.2 0 .1.2.3.1 0-.2.2-.4 0-.5ZM9.4 15.7c.2-.2 0-.2.1-.5h-.1.1s-.4 0-.2.1c0 0 .1 0 .1.1 0 0-.1-.1-.2 0 .2 0 .1.4.2.4Zm-.1 1.1v.7s.4-.1.2-.2c0 0 0 .1-.1.1-.1-.2.1-.6 0-.6z"/><path class="st0" d="M86.7 47.6s0 .1 0 0v.1Zm-.1-.3"/><path class="st2" d="M10.4 29.6v.2c.1 0 0 0 .1-.1.2.1.2.4.4.5 0-.3 0-.2.2-.1v-.4c.2 0 .2-.2.4-.2.2.4 0 .6.3 1v-.2h.1c-.4 0 .2-.4-.1-.6v.2c-.2-.3 0-.9 0-1 .3.1.9-.4.6-.9.2 0 0-.1.2-.2v-.1c-.3 0 0-.2-.2-.2 0 0-.1.1-.1 0 0-.4 0-.6-.2-.7-.2 0 0 .3-.1.2s0-.4-.1-.5c-.2.7.4 1.1-.1 1.4v.2h-.2c0 .2 0 .6-.2.6 0 0 0-.5-.2-.7v.2-.3s.3-.1.1-.2c0 0 0 .1-.2.1v-.2c-.1.6-.2.8-.5 1.2h-.2s-.1-.3-.1-.2c.2.2-.4 0-.3.3.1 0 0 .3.2.5 0 0 .1 0 .2-.1Z"/><path class="st0" d="M86.4 49.2v-.1zM9.2 18.6H9v.4c.2 0 0-.4.2-.4m79.7 30.6v-.1zm-6-6.8c.2 0 .2.1.4 0 0-.2 0-.3-.1-.3 0 .2-.3 0-.3.3"/><path class="st2" d="M11.8 14.4v.4c.2 0 .2-.4 0-.4m1.8 8.9c-.4-.2-.7.2-.6.5h.2c0-.2.3-.4.4-.6Z"/><path class="st0" d="M89.2 47.6s0 .1 0 0v.1Zm-1.5 2 .1.1Zm0-2.7"/><path class="st2" d="M11.8 27.3c0-.2 0-.6-.1-.5 0 .2-.1.5.1.5m-3.4-4.4c.2-.1.1-.5.4-.7 0 0-.1 0-.1-.1 0 0 .1.1.2 0 0 0-.2 0-.2-.2.4.2.1-.2-.1 0 0 0-.1 0-.1-.1.4 0-.2-.4.1-.4h-.2c0-.2 0-.6-.2-.8-.1 0 0 .3-.1.3 0-.1-.2 0-.2-.1.3 0-.1 0 0-.2.1 0 .2.1.2 0-.2-.2-.4 0-.5-.2h.2c-.1 0-.2 0-.2-.1 0 0 .1.1.2 0 0-.1-.3 0-.3-.1 0-.2.4.1.2 0 0-.1-.2 0-.2-.2.3 0-.2-.2 0-.3-.2 0-.1.2-.3.1.1-.2-.1-.5 0-.7-.3 0 0 .1-.2.2 0 .8.2 1.1.2 1.6.3 0 .1 0 .4.2 0 0-.1 0-.1.1.3 0 0 .1.1.3h.2c-.1.1 0 .3.1.6 0-.1 0-.2.2-.2-.1.2.2.1.2.2-.2.1 0 .3 0 .6.4 0 .3.2.2.4Z"/><path class="st0" d="M78.9 30.9s-.2 0 0 0M77.5 20v-.2h.1-.2v.2h-.2.2Zm.2 12.6s-.1 0-.2.1v.4h.2c0-.2.1-.3 0-.4Zm-.9.5c0 .5-.3.6-.5.8l.1.1c-.3 0 0 0 0 .1h-.2c0 .2.1.3 0 .5h.3c.1-.4.8-1.1.6-1.6-.2.1-.1 0-.3-.1Zm.2-3.7c0-.1 0-.4-.1-.3 0 .1-.1.3.1.3m6-2.9c-.1 0 0-.3-.2-.3 0 .1-.2 0-.2.2v.1zm-3.2 2.7c0 .3-.1.3-.2.4v.2c.3 0 0 0 0 .2 0 0 .1.1.2 0h-.1c.1-.2.5-.6.2-.8Zm-52.3 9.3c0 .1 0 .2.1.3 0-.2.4 0 .3-.3-.2 0-.2.1-.4 0m51.4-7.9h.1c-.1 0-.3 0-.1.1h.1v-.3h-.2ZM88 42.4c0 .3.1.1.3.3v-.3h-.2Zm-6.3-3.6h-.2v-.1c-.2.2 0 .6.3.5h.1c-.1 0-.1 0-.1-.2Zm1.7-11.3c.1-.3 0-.4.1-.6h-.2c0 .2-.2.5 0 .6Zm.7-1.5c-.1 0 0-.1 0-.1 0 .1-.2 0-.2.1v.3c0-.1.2-.2.3-.3Zm-.7 14.2v-.3c-.2 0-.2 0-.3-.2 0 .2 0 .4.3.4Zm-.4-.8c0-.2-.3-.2 0-.4h-.2c-.1.1-.2.5 0 .6.1-.1.2-.3.4-.3Zm3.7-16.2v-.1h-.2s.1 0 .2-.1c-.1-.1-.3 0-.3.3.1-.1.3.1.3 0Zm-3.2 18.6c-.1.3.5.2.5 0-.2 0-.1-.1-.2-.1 0 .1-.2.1-.3 0Zm-.1-2.5c.1.4.7 0 .8-.1-.2 0-.1-.3-.3-.3s0 .3-.1.3-.2-.1-.3-.1c0 .1-.3.3-.1.3Zm1-12.2c.3 0-.1.3.2.4v-.4c-.1 0-.3-.2-.3 0Zm.2-.6q0-.3-.3-.3c-.1.1 0 .1 0 .3.1 0 .2.1.3 0m.4 1.8c.2 0 .3-.3.4-.4v-.3c-.3 0 0-.2-.3-.2v.6h-.3c0 .2-.1.3 0 .4Zm-.2-2.2c.1-.1 0-.3 0-.4v.3s0 .1.1.1Zm1.1-2.1c0-.1-.2-.1-.2-.2v.4c0-.2-.1-.3 0-.3 0 .1.3.3.1.1Z"/><path class="st2" d="M14.8 36v.2h-.1c.1 0 .3 0 .3-.1-.1 0 0-.1 0-.2-.1 0-.2-.2-.2 0Zm-.5.5c-.3 0-.5 0-.5.2-.6-.4-1.4-1-1.7-1.6-.2-.3 0-.6-.4-.8.1 0 .2 0 0-.1-.7-.6-1.2-1.9-1.6-3-.2 0 0 .2-.2.1v-.2c0 .2-.3 0-.3.2 0 .1-.2.5-.4.6-.1.7-.5 1.3-.6 2-.2.7.2 1.7-.2 2.6.1.7.5 2.5 1.3 3 .1 0 .4.2.2.3.1 0 .5.1.3.2.1.1.1 0 .2 0 0 .1.2 0 .2.2-.3.6 0 1.6-.2 1.7h.2s-.1 0-.1.1c0 0 .1.1.1.3.3 0 0-.2.4-.2v-.4c.1.2 0 .3.2.1v.2c0-.2 0-.2.1-.3h.3c0-.1-.1-.2 0-.4-.2 0-.2-.3-.2-.1 0 0 .1.2 0 .3v-.8h-.2c.1-.1 0-.9 0-1.1 1.6-.2 2.4-1.2 3.2-1.6.2-.6-.6-.9-.3-1.6Zm-3.8 4.9c0-.2 0-.4.1-.6.1.1 0 .6-.1.6"/><path class="st0" d="M35.5 15c-.1.1 0 .3.1.3 0-.1 0-.4-.1-.3m-8 5.4v-1.1c-.2.3-.4 1 0 1.1m0 1c0 .2-.3.5 0 .5-.1-.2.2-.5 0-.5m57.7 28.2.1.1ZM27.4 22.5c.2 0 .1.2.3.1 0-.2-.2-.4-.3-.1m.6 10.8c0-.2 0-.4-.2-.4 0 .3-.5 0-.5.5.3.1.5-.2.6 0Zm54.9 17s0-.1 0 0m1.5-.6v.1zM28.1 23.4V23s-.4-.1-.2 0c.1 0 0 .4.2.4m-.1 1.7c-.1 0-.3.4-.2.5 0-.2.2-.2.2-.5m-.5 3.4h.3c.1-.1.1-.5-.2-.4-.1.2 0 .3 0 .4Zm.7-4.6c0 .3-.2.4 0 .5 0-.1.3-.5 0-.5m65.6 23.7s0 .1 0 0v.1Zm-.3 1.6v-.1zm-1.6-27.3c.1.1.4.3.4 0-.1 0-.3-.2-.4 0m2.7.6c-.3.3-.5 0-.8-.3 0-.2.1-.2 0-.5-.2.1-.2.4-.5.3 0 0 .2 0 .1-.2-.2 0-.5.1-.8.1.1.4.8.2.9.4-.2.3 0 .6.2.6s-.1-.2 0-.4c.2 0 .2.1.2.2-.2 0-.1.1-.1.2 0 0-.1 0-.1.1.2 0 .1-.2.2-.2.2.2.4.3.6.4 0-.3-.1-.5-.4-.7.1 0 .4 0 .3-.3Z"/><path class="st0" d="M94.8 22.8c0 .1-.1 0-.3 0 .1.2.4.1.2.5h.3c0-.2 0-.4-.2-.4Zm.9.6c0 .2-.1.4.2.4 0-.2 0-.3-.2-.4m8.6 7.2v.3h.2c0-.1 0-.2-.2-.3m-.4-13.7c.1.2 0 .3.2.1 0 .2.1.3.1.1V17c-.2 0-.2-.3-.5-.2.1 0 0 .2 0 .3.3.1 0-.2.2-.2M92.3 49.6l.1.1Zm13.5-12c0-.1 0-.3-.2-.3 0 .3 0 .4.2.3m-.6 1.8c.1 0 .2.1.2.1s-.1 0-.2.1c.1.1.2.2.2.3v-.2c0 .1.1.2.1 0-.2 0-.2-.5-.5-.4Zm1.9-4.6c.2.2.2.3.4.4 0-.1-.3-.5-.4-.4m-.6-2.7c0 .4-.5 0-.5.4.3 0 .4-.1.7-.2 0 0 0-.1-.1-.2Z"/><path class="st0" d="M106.5 31.9c.2-.2.2.3.2.3 0-.1.5.1.6 0-.2 0-.5 0-.6-.4-.2.1-.2-.2-.3 0 0 .1 0 .2.1.2Zm.8 3.6c0 .1 0 .3-.1.3.3 0 .4-.2.1-.3M96.2 23.6h-.3c0 .3.3.3.3 0m9.9 11.2c-.3-.1-.3-.3-.6-.5 0 .2.4.7.6.5m1.7.5c0-.2.3 0 .3-.2V35c-.2 0-.5.2-.3.3"/><path class="st2" d="M0 59.5h112.7V0H0zm67.2-39.1s-.2.3-.3.2c0-.1.1-.2.3-.2m-.8 1c-.4 0-.3-.2-.1-.4.2 0 0 .3.1.4m-9.2-4.3c.2-.2 0 .4 0 .4-.2.1 0-.5 0-.4m-.6.4c-.1-.1 0-.2 0-.4.2 0 0 .1 0 .2 0 0 .1-.2.1-.3q.1.1.1-.1c.2 0-.2.5 0 .6-.4.4-.8.7-.8.9 0-.4 0-.7.5-1Zm-9.7 7c.1-.2 0 .1.2 0 0-.1-.2-.2-.2 0 0-2.5-.2-5.9 0-8.7 0-.6 0-1.3.2-1.8 2.1 0 3.1.2 5.3.2 0 5.1.1 8.5.1 14.6-.3.2-.4.4-.6.8-.3-.2-.8.3-.9.6-.1 0 0-.2-.2-.2-.2.1 0 .3 0 .5-.1-.3-.3.2-.3.2-.4 0-.5.5-.9.2-.2.3-.5.5-.6 1-.2 0-.2-.2-.4-.1-.3.4-.6.4-.9.5-.3-.3-.3-1-.3-1.1h-.1c-.3-.1-.2.4-.4.2-.2-.4.1-.1.3-.3 0-.4-.3-.3-.4-.5v-5.1h.2v-.8Zm.1 8.6c-.3-.2-.1-.3-.1-.6.3.3.3-.4.7-.3 0 .4-.3.6-.6.9m.2.2v.3c-.2 0-.2-.4 0-.3M12.6 15.5v.5c0 .1-.2.3-.2.5-.4-.1.3-.4 0-.5 0 0 0-.2.1-.3v-.2Zm-.3-1.6c.2-.2.1.3 0 .4-.2 0 0-.4 0-.4M4.8 44.1c-.2-.3-.1-.6 0-.8.3 0 .4.3.4.6-.2 0-.2.2-.4.1Zm16.6-3.3c-.2.3-.8 1.1-1 1.3s-.6.5-.8.7c-.8-.5-1.3-1.3-2.1-1.9-1.5 1.4-3.5 2.3-5.6 2.4.1-.1-.2-.1 0-.4 0 0-.2.1-.2 0 0 .1-.1.2-.4.1.2-.2-.2-.1-.1-.3 0 0-.1.2-.1 0 0 0 0 .1-.1.2 0 0-.1-.2-.2 0-.1 0 0-.1 0-.2-.3 0-.2.5-.2.5-.1.1-.3.1-.3.3 0-.2-.4-.2-.5 0-.7-.2-1.9-.4-2.6-1.2h-.3c-.1-.1 0-.1 0-.2-1.7-1.7-3-4.2-2.7-6.9-.4.2 0-.2-.2-.3 0 0 .2 0 .3-.2.4-2.2.9-4.1 1.8-5.5.6-.9 2.3-1.6 1.5-2.8-1-1.6-1.5-5.3-1-7v-.5c0-.1.2 0 .2-.1-.2 0-.1-.3 0-.4-.2-.6-.1-1.2.2-1.6.2-.4.7-.6.6-1 .2 0 .3-.2.6-.2 0-.2-.1 0-.2 0 .2-.2.3-.3.6-.2-.1.1 0 .1 0 .3.1 0 0-.5.2-.2.2-.2 0-.7.2-1 0 0 .2.1.2 0 .1 0 0 .3 0 .4.3-.2 0-.4.2-.6 0 0 0 .2.1.2s0-.4.2-.3v.1c.4-.3.8-.2 1.3-.5v.3c.2 0 .4 0 .3-.2.2-.1.2.4.2.6h.1c.1-.2.2-.4 0-.6.1 0 .2 0 .3-.1.2.1.1.1.2.4h-.2v.2c.2-.2.1.4.4.5-.1 0-.4.2-.5.2 0 0 .1-.2.2-.2-.2-.2.1-.2 0-.4 0 .1-.2.3-.1 0-.2.1 0 .1-.1.4v-.2c0 .1-.3.2-.2.2 0 .2-.2-.2-.1-.3 0 0-.1.4 0 .4-.2 0-.1 0-.4-.1v-.3.2-.3c-.1.2-.1.2-.2 0-.1 0 0 .3-.2.1v.6c-.1 0-.2.4-.2.2.2 0-.2 0 0-.2-.2 0-.2.3-.2 0-.2.2 0 .3-.2.5 0-.1-.2.1-.2 0-.2.1-.3.4-.2.8.2 0 .1-.2.1-.4 0 .2.4.5.6.8 0 0 .1-.4-.1-.5.1 0 .2 0 .4.2-.2.1.1.6-.2.4.5.5 0 2-.6 2v.1c.3.1.4.6.2 1 .2.6.3 1.6.6 2.6h.1c.1.5.2 1.3.4 1.7h.2c.1.4.1.7.4 1 .2 0 0 .2-.1.1 0 .1.2 0 .2.1.1 0 0-.2.1-.2 0 0 0 .1.1.1 0 0 0-.1.1-.3.2.4 0 .4.2.9 0 0 0-.1.1-.2.1 0 0 .4 0 .5.1-.2 0-.6.1-.8.1.1.1 0 .3 0-.1-.1 0 0 0-.2-.4-.6-.4-.8-.2-1.7-.1 0 0-.1-.2-.2h.2c-.1-1.2 1.2-1.9 1.4-3.2.1-1-.4-2-.4-2.8v.2c-.5 0 0-.5-.3-.7-.1 0 0 .2 0 .4-.3 0 0-.2-.2-.4-.1 0-.1.1-.1.2-.3-.1 0-.4 0-.6l.2.2c.3-.2-.2-.7 0-1 0-.1-.2.1-.2 0 0-.2.1-.9 0-1.1.1 0 0 .1.2.1s.1-.4 0-.5c.3 0 .2-.5.2-.6-.1 0-.1 0-.1.1-.2-.1.1-.2.1-.4v.2s0-.2.3-.2v.1c-.1.2-.2.4-.3.5.1.1.2-.2.5-.1v-.5c.1.2.5 0 .6.2 1.1 0 2.3 1.1 3 1.6.2.6.4 1.1.7 1.5 0 0 0 .4.2.5.2 2.2-.2 3.7-.9 5.3-.2.5-.5 1.1-.7 1.4 0 0-.2 0-.2.1-.4.6-.7 1.3-1.2 1.8v.2c-.4.4-.9.6-1.1 1.2-.3 0-.2.2-.6.2-.5 0-.7.8-.4 1.1 1 .7 1.2 2.2 2.3 3.1 0 .5.7.8 1 1.2.2.4 0 .9.6 1.1.4 0 .6-.4.5-.6.8-1.8.6-4 .7-5.6 1.2 0 2.6-.3 3.8-.2.3.9 0 2.1.2 2.7h-.1c0 .1.2.2 0 .3.1 0 .1.3.1.5 0 1-.2 2.1-.6 2.8 0 1.1-.7 2.4-1.1 3.4.2.4.4.8.9 1 0 .1.1.1 0 .3h.2c0 .4 1 .6.8 1 0 .2-.5.5-.9 1ZM11.7 16v-.4c.2 0 .2.5 0 .4m-.6-.9c-.2 0 0 .3-.2.4 0-.2.1-.2 0-.4zm28.4 28.3c.2 0 .1.2.2.3-.2 0-.2-.1-.2-.3m.9-1v-.2h-.1q0 .15 0 0c.2.1-.2.3-.2.5-.2 0-.1-.1-.2-.2 0-.2.2 0 .2-.2-.1-.2-.2.2-.4 0 0 .2.1.3.1.4-.9.6-1.8 1-2.7 1.1v-.2c-.2 0-.1.3-.3.4-.7 0-1.9.3-2.6 0v-.4c0-.3-.2.1-.4 0 0-.3-.1-.3-.1-.5.2-.2.1-.7.3-.9.3.1 0 .5.1.8.4-.3.4-.9.2-1.1 0-.1-.2.2-.3 0 .2-.4-.3-.7-.6-.6.1 1-.1 1.8 0 2.8-.8.2-1.4-.3-2-.5-.5-.2-.9-.2-1.3-.5-.3-.2-.6-.5-1.1-.8 0-.4-.5-.4-.7-.8-.6-.5-1.1-1.5-1.5-2.3v-.4c-.4-.7-.7-1.9-.4-2.7 0-.1-.3 0-.2-.3h.3c0-.2-.3-.2-.3-.4s.1-.2.3-.2c-.1 0 0-.3-.2-.3.2-1.4 0-3.4.2-4.3 0-.6-.3-1.7 0-2.1-.2-.3 0-.2-.1-.7 0 0 .1.2.2.3.1-.2.2 0 .5 0 0-.4-.2-.6-.4-.2-.1 0 0-.2-.2-.2s-.1.2 0 .2c0 .2-.1-.1-.3 0 .2 0 0-.5.3-.6-.2-.5-.4-1 0-1.3-.1-.1-.3-.2-.2-.5-.3 0-.1-.1 0-.2 0-.2-.1-.4-.2-.6 0-.1.2-.5 0-.7v.3c-.2-.8 0-1.8.5-2.1-.2-.5.1-.7.2-1-.1-.2-.2.1-.3 0v-.3c-.1.4-.3.7-.4 1-.1-.8-.2-1.6.2-2.1-.2-.8.3-1.4.7-2 0-.1 0-.4.2-.5 0-.1.3-.1.3-.2 0-.2.2-.5.4-.8.2-.2.5-.4.8-.6.2-.3.5-.5 1-.9.9-.7 2.5-1.5 3.5-1.5.2.2.3.5.5.8-.6.7.4 1.2.4 2.3h.3c-.2-.3 0-.5.3-.7.2.2 0 .5-.1.6q.3 0 .9.3c.2-.2 0-.5-.4-.5 0-.3-.4-.9-.5-.6-.1-.8-.6-.9-.2-1.5-.3-.2-.5-.2-.4-.8 1 0 2.1-.1 3.2.5-.2.1 0 .4 0 .4.3 0 .2-.3.4-.4.5 0 .5.2 1 .4 0 0-.2.6 0 .8.1-.1.2-.2.2-.5h.5c.6.5 1.1 1 1.8 1.3 1.5 1.9 2.5 4.3 2.3 7.2 0 1.1.1 2.5 0 3.7-.1 2.1-.2 3.4-.2 5.7.2 1.3.1 2.6-.1 3.7-.3 0-.3.2-.4.4.1 0 .4 0 .3.4.3 0 .1-.4 0-.6.4 0 .2.5.2.6 0 .5-.5 1.1-.2 1.4-.1 0-.1.2-.2.3-.2 1.4-1.2 2.5-1.9 3.6-.4.1-.5.5-.9.8Zm4.4 6.5c0 .4 0 .9-.3 1.2 0 0-.2 0-.3.1h-1.4V47h.1v-.7h1.4c.6.3.6 1.1.6 1.9Zm2.2 1.6h-.5c-.2 0 0 0 0 0h-1.1v-3.6h.2s.1 0 .1.2c0 0 .1.1 0 .2 0 0 0-.1 0 0l-.1-.1h1.2v.5h-1v.6c.1 0 0 .2 0 .3h.6v.5h-.7v1.1h.6v.2s.1 0 .1-.1h.1v.2Zm-.3-1v.3-.2Zm-.1-.3V49v.1Zm.4-.2v-.2.3Zm2.3-1.7h-.5v2.1h-.1c-.1 0 0 0 0 0h-.1v1h-.7v-2.9h-.7v-.4h.1s-.2 0-.2-.2v-.2h2.1v.3Zm1.6-4H47c-.4-.6-.1-1-.3-1.6.1.2 0-.4 0-.7v-1c0-.3-.1 0-.1 0 0-1.7.2-3.8 0-5.5 0 0 .3 0 .1.1 0 0 .3 0 .1.1 0 0 .1 0 .1.1 0 0 0-.2.1-.2-.1 0-.1 0 0-.1-.3 0-.2-.4-.3-.1-.2-.2-.1-.3 0-.4 0 0 .3.2.2.2 0 .1.1-.2.2 0 0 0 0-.1-.1-.1.3-.5.8-.9 1.3-1.3 0-.3-.2-.2-.2-.5.2 0 0-.3.2-.3 0 .3.2-.1.1.2 0-.1.2-.1.4 0 .3-.5.7-.8.8-1.1 0 .2.5.3.6 0 0-.1 0-.3-.2-.3.7-.3 1-.8 1.7-1.1 0-.2-.1-.3 0-.4v.1c0 .1.2 0 .2.2h.1c0-.3.4-.5.5-.8.3.1.3.2.6.1-.3.1-.5.4-.8.6.1 2 0 4.3.1 6.1h-.1c.3.8-.2 2.1.3 3.1h.1c.9-.2 2.4.4 3.3 0v.1s.1 0 .1-.1v.1c.4-.2 1.1.3 1.9 0 .3-.1.5-.7.6-.1.1 0-.1.3.1.3-.3 0 .2.5-.1.5.1.1 0 .3 0 .5.1 0 .1.7.1.8v.4c0 .1.2.7 0 1 .2 0-.1.3-.2.6-.2 0-.2-.1-.2 0-.1 0 0 0 0-.1-.5.2-.8.1-1.5-.2 0-.1.2 0 .2-.1-.3 0-.4.1-.8.2h.1c-.5 0-1.1.2-1.6.3v-.1c-.5 0-1.4.1-2 0-.3.1-.8 0-.8 0-.5.2-.6 0-1 .2Zm7.5 3.5h.3Zm-2 0h.3Zm-3.8.2h-.1Zm-.1-.4v-.1zm-1.6 1.9v-.1h.1v.4-.4Zm.8 2.5v-.2.1Zm.1-.4v.1zm1.2-.1s-.1 0 0 0h-.1s0-.2-.1-.3V50c-.1 0-.1-.3-.2-.4v-.1c0-.2-.1-.3-.2-.4v.1h.1-.1v.9s-.1 0 0 0v.5h-.7v-1.1h.1v-.1h-.1c0-.1 0 0 .1-.1-.1 0 0-.2 0-.3v-1.1h.3-.1.9v.1c0 .1 0 0 0 0 0 .1 0 .2.1.2v.7c0 .2-.2.5-.3.7-.1 0-.1 0 0 .2v.4-.1.3-.1.3c0 .2.1.3.2.4h-.2Zm2.5-.6-.2.2h-.8v-3h.1v2.7c0 .3.2.4.4.4s.3 0 .4-.3v-1.3h.1v-.9h.2v2.7Zm.5.7h-.1v-3.2h.5v3.2h.7v.5h-1.5Zm1.9 0h-.1v-3.2h.5v3.2h.7v.5h-1.5Zm1.6.4.1-.1v.2Zm.5-.4h.1c0 .2-.1.1-.2.1Zm1.6-.1h-.2c0-.2 0-.4-.1-.6v-.1h-.8c0 .2 0 .4-.1.6h-.1v.1s-.1-.1-.1-.2v-.9c0-.3.1-.7.2-1v-.3c0-.3.1-.6.2-1h.8c0 .3.1.6.2.9 0 .1 0 .5.2.8 0 0 0-.1.1-.1v.2c0 .3.1.5.1.8.1.4.2.7.2 1.1h-.3Zm.6-2v-.1h.1v.4-.4Zm.7 2.5v-.2.1Zm.2-.4v.1zm1.1-.1s-.1 0 0 0h-.1s0-.2-.1-.3V50c-.1 0-.1-.3-.2-.4v-.1c0-.2-.1-.3-.2-.4v.1h.1-.1v.9s-.1 0 0 0v.5h-.7v-1.1h.1v-.1h-.1c0-.1 0 0 .1-.1v-1.4h.3-.1.9v.1c0 .1 0 0 0 0 0 .1 0 .2.1.2v.7c0 .2-.2.5-.3.7-.1 0-.1 0 0 .2v.4-.1.3-.1.3c0 .2.1.3.2.4h-.2Zm-.5-3.8v-.1zm.1.3h-.1Zm2.7 3.4h-.2Zm.2-.3V50s0 .2-.1.2c-.2-.2-.3-.5-.3-.8v-2.2c0-.2.4-.3.6-.3s.5 0 .7.2c.2 0 .2.2.3.3 0 0 .1.4.1.5v.2h-.5c0-.2 0-.5-.2-.7h-.5c-.1.2-.1.4-.1.6v1.4c0 .2 0 .4.2.5 0 0-.2 0 0 .1h.1v.1h-.2V50Zm1.5-2v.1Zm0 .2v-.1Zm0 1.3v.1Zm.1-.1v-.1zv.2c0 .4-.5.6-.9.6h-.3v-.2s0-.1.1-.2c0-.2.1-.5 0-.7h-.4v-.3h.8v-.2V50Zm2.3.1v.2c0 .2-.1.3-.2.5h-.1c-.1 0-.2.1-.3.1h-.3v-.2.3h-.5s-.1-.2-.2-.3v-1.7.1-.6l.1-.1c.1 0 .3-.2.4-.2v.4h.1s0-.1 0 0v-.3h.5l.2.2q.3.3.3.9v1.7Zm-1.3-6.5V43c-.6.4-2.3.1-3.4.3-.1 0 0-.1 0-.1-.9-.1-1.7.2-2.2 0-.9.4-1.8.2-2.7.2-.7-1.5-.2-3.6-.2-5v-.5c0-.8 0-1.9.1-2.5v-.3c-.5-3.3.2-7.5-.1-11.5.1-.3.1-.8 0-.9.3-.7-.2-1.4.3-1.7-.5-.8 0-2-.4-2.8.3-1.4-.1-2.8.2-4 .1-.1.5 0 .5-.2.2.2.4.2.6.4.1 0 .3 0 .4-.2.7.5 1.7-.3 2.3.4 0-.4.8-.3 1.5-.3 0 .6.2 1.5-.2 2 .3.5.4 1 .1 1.5.1.5.3 1.7 0 1.8 0 .2 0 .6.1.6q-.2.2-.1.5c-.1 0-.3-.1-.5-.1 0 .2.1.3.4.3 0 .4-.2.3 0 .8 0 .1.3.2.4.1-.1.3-.1.5 0 .8h-.3c0-.4 0-.5-.1-.9-.2 0-.2.5-.6.4 0 .2-.1.2 0 .4-.2 0 0-.3-.2-.2-.4.6 0 1.3 0 1.9-.1-.1-.2-.3-.2-.5-.1 0 0 .3-.3.2v-.3h-.4v.2s.3 0 .4.3c-.2-.3-.1 0-.4.1V24c-.2 0 0 .2-.2.3-.3 0-.1-.2-.3-.2 0 .2 0 .5-.2.9-.2 0-.4.2-.3.3-.2.1-.1-.5-.3-.5s0 .4-.1.5c-.2 0-.1-.1-.3-.1 0 .3.1.5.4.7.2-.2.1-.5.3-.6.1 0 .1.1.1.3-.2-.5-.4.9-.3 1.3 0 .2.4.6.2.8-.1.2-.1 0-.4 0 0 .2 0 .3.2.5 0-.3.3-.4.4-.9.3 0 .4-.6.6-.8 0 0 .1.2.2 0 .4 1 .2 2.3-.2 3-.3-.5.2-.8 0-1.1-.2 0-.2.1-.3 0-.2.2-.2.5-.2.9-.3 0-.4.3-.3.6 0 .2.3 0 .3.2.2-.1.1-.2.1-.6h.1c.1 0 .3.2.3.4.4-.1.6-.3 1-.5.1.3-.2.7 0 1.1.2-.1.4-.3.6-.5-.1-.2 0 0-.3-.2.1 0 .1-.6 0-.8.1-.3.3.2.5-.2-.1-.6 0-1-.3-1.5-.1.2-.1-.1-.1-.3-.2 0-.2-.1-.3-.2-.3.2-.4-.3-.4-.5s.2.1.2 0c0 .1.2.2.1.4.3-.2-.2-.3 0-.5.1 0 .3 0 .2.2.3-.1.3-.3.5-.4-.3-.4-.3-.5-.3-1.1 0-.1-.3 0-.2.2 0 0-.2-.1-.3 0 0-.2-.2-.4-.3-.6.1 0 .2 0 .2-.2.2 0 0 .4.2.6.1 0 .1-.3.4-.2l-.2-.2s.1 0 .3-.1c0 0-.1-.1-.2-.1.1-.3.2-.2.2-.7h.2c-.3-.4.3-.5.5-.7 0 1.5 0 3.4.1 5 0 .9-.3 1.8-.1 2.7 0 .5.2.9.2 1.5v6c0 .4 0 .8.3 1.1.1 0 .2.2.2 0v.1c0-.2.5 0 .4 0 .3 0 .8-.1 1.1 0 0 0 .2.1.1.1.4 0 1.3-.2 1.8-.1 0 0 .3.2.2.2.6 0 1.1-.3 1.8 0 .2.8.1 2.4.2 2.5v1.1c-.4.5-1.6 0-2 .2-.7-.2-.9-.2-1.5 0Zm-3.7-20.9c0-.1.3 0 .4 0-.1.2-.4.3-.5.5-.2 0-.2-.1-.2-.3.2 0 .3-.2.4-.2 0 0-.1-.1-.2-.1Zm-.6 3.5c-.3 0-.5-.6 0-.6 0 .3-.1.5 0 .6m0 3.5c-.1.1-.2-.2-.4-.2 0-.2 0-.2.1-.3.2-.1.3.5.4.1.2 0-.3.3-.1.4m.2-1.9c.2.1 0 .2 0 .4-.1 0 0-.4 0-.4m-.8-1.7c0-.1.1-.1.1-.2.2 0 .2.3.2.6-.1-.1-.2-.3-.3-.4m-.7.3c.1-.2.3 0 .5 0v.5c-.3 0-.2.2-.4.4-.1-.3 0-.4 0-.9Zm.4-1.5v-.3h.2c0 .1 0 .3-.2.3m1.1.7c.1 0 .3.3.1.5-.3 0-.2-.3-.1-.5m7.7 22.2h-.5v2.1h-.1c-.1 0 0 0 0 0h-.1v1h-.7v-2.9h-.7v-.4h.1s-.2 0-.2-.2v-.2h2.1v.3Zm2.3 0h-.5v2.1h-.1c-.1 0 0 0 0 0h-.1v1h-.7v-2.9h-.7v-.4h.1s-.2 0-.2-.2v-.2h2.1v.3Zm2.3.7v1c0 .1 0 0 0 0v1.4h-.6v-.3c.1 0 0-.2 0-.3v-.2c.1-.2 0-.5 0-.5s-.2 0 0-.2 0 0 0-.1v-2.2h.6v1.1Zm3.7 1.2v.7c0 .2 0 .4-.1.6h-.3v-1.1c0-.2 0-.5-.1-.7 0-.2 0-.4-.1-.6v2.4h-.5v-3.7h.6c.1.6.3 1.1.4 1.6 0 0-.1 0 0 .1l.1.1s0 .2.1.3v.5-.3.2Zm.7-2.1v2.2c0 .1 0 0 0 0v1h-.6v-1.2c0-.1 0 0 0 0h-.1s0-.1-.1-.1H81v-.6c0 .1 0 .3-.1.4v.2l-.1-.1v-.3.1-.2c0-.3.1-.6.2-.8v-.5h.7v.2Zm-.5-3.7c.1.1-.1 0-.2 0 0-.1 0-.4.2-.3 0 .1-.2.2 0 .2Zm1-.7c0-.2-.2 0-.2.1-.2-.2-.5-.2-.7-.3 0 .4.4 0 .4.4-2.7 0-4.7 0-6.9.1-.2-1.5 0-3.6 0-5.1 0-.2-.1-.4 0-.7.3-1.8.3-4.1.3-5.7s0-1.4-.1-2c0-.3.2-1.3 0-1.5.2-1.4.1-3 0-4.3.2-.6.2-4 .2-5 0-1.4-.1-3 0-5.1.4-.2.7 0 1 0s.1-.2.3-.2c.3 0 1.1.1 1.5.1s0-.1 0-.1c.2 0 .5.2.6.2s0-.1 0-.1h1c.1 0 .4.1.5.1h1.4-.1c.1.1.4 0 .3.2.5-.4.6-.2 1-.5.1.3.6-.2.7.2v-.2c.2.2.7-.1 1 0 0 .2 1.2-.1 1.5 0-.1-.3.5 0 .8-.1.4.2 1.3-.3 1.4-1.2.5.2-.6 1.5.6 1.3 0 1.4-.2 3.1-.2 4.6-.5 0-1.4-.2-1.6.2-.4-.2-.8-.1-1.2 0-.2 0-.4-.2-.5 0 0-.2-.4 0-.5 0 0 0-.1-.1-.1-.2l-.3.3c-.1-.3-.1 0-.4 0s-.3-.3-.4-.3c-.3 0-1 .4-1.1 0 0-.1 0 0-.1-.2-.5.5-1.1.3-1.8.1h.1c-.3.4-.5 1-.5 1.6s.2 1 0 .9c.2 1.2-.4 3.3-.1 4.8h1.2c.2.5-.5.7-.1 1.2.5-.1.6 0 .7-.4-.1-.1-.3-.2-.4-.3.2 0-.1-.4.2-.6H84c-.1.2.7.2.8 0 .5.2.3.8.5 1.3.5-.4-.2-.5 0-1.2.3 0 .3-.4.4-.6 0-.3-.3-.4 0-.6 0 0-.3.1 0-.1-.1 0-.1-.4-.2-.6-.3.3 0-.4-.2-.3 0 0 .1-.1.2-.1-.1 0-.3-.1-.1-.4 0-.2.2.1 0 .2.2 0 .5-.2.4-.3 0-.2.2 0 0 .1.3 0 .4-.6.6-.5.1 0-.2 0-.2.2.1 0 .3-.2.1.2.1-.1 0 0 .3 0-.2-.3.2-.5 0-.6.4-.2 0 .5.2.6-.1.2-.1-.3-.3-.2.3.2-.1.6.3.6v.7c0 .2-.2.1-.3.2.1.6-.2 1.5.3 2-.1 0-.2.4 0 .5-.1 0 0 .4-.1.5 0 .1.3 0 .2.3.1 0 0-.2.3-.1 0 .1-.2.2-.3.4 0 0 0-.1-.1-.1s.3.4 0 .2c0 .2.3 0 .3 0 .2.2 0 .3 0 .6-.2-.2-.4-.2-.4-.5-.4 0-.4.6-.2.8 0 0 .2-.1.2 0s-.2.1-.3.1c0 .5.2 1.2.7 1.5v.2c-.5-.3-.9-.8-1-1.5-.2 0-.1.2-.1.4s.1 0 .3.1c0 .3 0 .4-.2.5-1.3 0-2.5 0-3.9.1 0-.1-.2-.1-.2-.2-.3.4-1 0-1.5.1-.4 1.3-.1 2.9-.1 4.5v3.3c0 1-.3 0-.3.2.3.1 0 .2 0 .3.3.1.4 0 .5.4 0-.1.3 0 .3-.1 0 0 0 .2.3.2s0-.1.1-.1c-.3 0 .1-.3 0-.4.1 0 .2-.2.3 0 0-.2.3 0 .2 0 .3-.1.5 0 .5-.2.1 0 .3.1.3.3.3-.3.4 0 .8 0v.5c.5 0 0-.5.1-.7.2 0 .2.1.3.3.9 0 1.3 0 2.2.3v.2c.1-.2.4 0 .5-.2h-.2c.1-.3.4 0 .6-.3 0 .1.1 0 .1.2 0 0 .2-.1.2-.3.3 0 .2.4.6.3v.3c-.2 0 0-.2-.2-.2-.1 0-.2 0-.2.2s0 0 .1 0c0 .3-.3 0-.2.2-.1 0-.2-.1-.2-.3-.1 0 0 .2-.2.2v-.3c-.2 0-.1.2-.3.2 0 .1.3 0 .2.2-.1.1-.2 0-.4 0 0 .2.5 0 .5.5.3-.2.3.2.6.2-.2.3.1.2.2.5-.2.1 0-.1-.2 0 0 .3.1.4 0 .7 0 .1.2-.2.2-.3 0 .2 0 .5.3.6 0 .2-.3 0-.2.3-.1 0-.1-.2 0-.2 0-.1-.2.2-.2-.1-.3.2-.4.6-.8.8-.1 0-.1-.2-.3-.2-.2.1 0 .4-.1.5-.2 0-.3 0-.2-.2-.1 0-.1.2-.2.3 0 .1.1.1.1.3-.7 0-1.3-.2-1.8 0 0-.1-.2 0-.1-.3.2.1.2-.1.5-.2h-.6c0-.3.5-.3.6-.2 0-.2.8-.4.8 0h-.3c.1 0 .3.1.2.4.2-.2.2.1.5-.1-.1 0-.2-.1-.4-.2.2-.4-.3-.2-.2-.7H85c0 .1.2 0 .2.2-.5.1-.9.2-1.4.3v.5c-.3.1-.4 0-.9 0 0 .2.3.2.3.5-.4 0-.3-.6-.6-.4v-.1c0-.1.1-.1.1-.2Zm6.3-.8s-.2.4 0 .9c-.1 0-.5.2-.5 0-.2.2-.3.2-.4.5 0 0 0-.2-.2-.1-.1-.8.3-.5.3-1.1.2 0 .3.2.5.2 0 0 .1 0 .1-.1h-.1c-.1 0 0 0 0-.1-.4 0-.2 0-.3-.5 0 0 0 .1.2.1 0 0 .1 0 .1-.1-.8.2-.4-1.3-.7-1.1-.2-.2 0-.5.1-.6 0 .2-.1.2-.1.4 0 0 .1-.1.3-.1 0-.2-.1-.2 0-.4.4 0 .3-.5.5-.8h.3c-.2 1 0 2.3-.2 3.1h.2Zm-1.3-2.2c0-.2 0-.4-.1-.4.2-.3.5.4.1.4m.7-.5c0 .2-.2.2-.3.3-.1 0 0-.4.3-.3m-.9-19.1c0 .1-.1-.2-.3-.1 0-.1 0-.2.1-.2 0 .1 0 .2.1.3Zm0 .3c.1.2.2 1.1-.1 1.6-.2-.5.1-1 .1-1.6m.1 2.6v.3c-.1 0-.1-.2-.1-.3h.2Zm-1.2 8.1c0-.5-.3-.5-.2-.8 0 .2.3.2.4.3 0 0 .1.3 0 .4 0 .1.2.2.2.3 0 .2-.2 0-.2-.2-.3 0-.2.5-.5.6 0-.2 0-.5.1-.8.1 0 0 .1 0 .2h.1Zm-.8 2c-.2-.4.1-.6-.2-.9.2 0 .3 0 .3-.2-.2-.1.1 0 0 .1h.2v-.3c.2 0 .1.1.2.2-.2.3-.1.8-.4.8.1.1 0 .3 0 .4Zm-.4.9c0-.1 0-.1.1-.1v-.4.1-.1c.1.1 0 .4-.3.5Zm2.5 8c-.1 0-.1 0-.1-.1h-.2c-.2 0 0-.3 0-.3.2.2.2 0 .4 0h-.1v.2Zm-1.2.5c-.1.1-.1.3-.4.3v-.2c.1.1.2-.1.4 0Zm-2.3.7c.1.1.2.3.3.5-.2 0-.2.1-.4.1-.2-.3.2-.4 0-.6Zm-.6.5v-.3c0 .2.1 0 .3 0 0 .1.1.3.1.5 0 0-.1 0-.1.1 0-.1 0-.6-.3-.4Zm1.2 6.2-.2.2h-.8v-3h.1v2.7c0 .3.2.4.4.4s.3 0 .4-.3v-1.3h.1v-.9h.2v2.7Zm2.2.7h-.1v-.1Zm.3-1.4v.2zv.1h-.1v-.1.3-.1.7h-.1s0 .1 0 0h-.1v-.2.1s0-.2-.1-.3v-.3h-.1v-.2l-.3-.6V50h-.1v.7h-.5v-1h-.2v-.4c0-.1 0 0 0 0v-2.2h.2v.2-.1s.3 0 .3.1c0 .3.2.5.3.8 0 0 0 .1.1.2.1.4.3.6.4 1v-1.9h.6v2.3Zm.1-6.4c-.1-.1-.3-.2-.5-.1 0-.2.2 0 .2-.2 0-.1-.2 0-.4 0 0-.2 0-.2.1-.4.1 0 0 .2.1.2s.2-.4.3 0c.1 0 .1-.2.4-.2-.2.2-.3.3-.3.5 0 0 .1-.1.1-.2.2 0 .3.2.4.1 0 .4-.3 0-.4.2Zm2.1 7.8h-.1v-.1Zm.3-1.4v.2zv.1zv.3-.1.7h-.1s0 .1 0 0h-.1v-.2.1s0-.2-.1-.3v-.3h-.1v-.2l-.3-.6V50h-.1v.7h-.5v-1H88v-.4c0-.1 0 0 0 0v-2.2h.2v.2-.1s.3 0 .3.1h-.1c0 .3.2.5.3.8 0 0 0 .1.1.2.1.4.3.6.4 1v-1.9h.6v2.3Zm.2-7.3s0-.5-.1-.6c.2 0 0 .5.2.3.2 0-.2 0 0 .3Zm1.9 8.6h-.5c-.2 0 0 0 0 0H90v-3.6h.2s.1 0 .1.2c0 0 .1.1 0 .2 0 0 0-.1 0 0l-.1-.1h1.2v.5h-1v.6c.1 0 0 .2 0 .3h.6v.5h-.7v1.1h.6v.2s.1 0 .1-.1h.1v.2Zm-.3-1v.3-.2Zm0-.3V49v.1Zm.3-.2v-.2.3Zm2.2 1.6h-.1v-.1Zm.3-1.4v.2zv.1zv.3-.1.7H94s0 .1 0 0h-.1v-.2.1s0-.2-.1-.3v-.3h-.1v-.2l-.3-.6V50h-.1v.7h-.5v-1h-.2v-.4c0-.1 0 0 0 0v-2.2h.2v.2-.1s.3 0 .3.1c0 .3.2.5.3.8 0 0 0 .1.1.2.1.4.3.6.4 1v-1.9h.6v2.3Zm14.7-11.9c.1 1.5-.7 3.1-1.6 3.8v-.2c-.2.3-.1.8-.7.8.2.2-.1.2-.1.3-.2-.1-.3 0-.3.1-.2 0-.1-.3-.4-.3 0-.4 0-.7-.1-.9-.3.6.2.8-.5 1 0 0 .2.1 0 .1.1 0 .3 0 .3.2 0 0 .3-.2.2-.2 0-.1.2.1.3 0-.2.1 0 .2-.1.5-.1 0-.3 0-.5-.1 0 .2-.2.3-.3.4-.2-.1-.1.2-.5 0-.4.6-1.6.8-2.3.8-.6.8-1.5-.1-2.4.2v-.1c-1.2.1-2.5 0-3.8-.5h-.1c-.2 0-.5-.4-.8-.5-.5-.3-1.2-.6-1.4-1s-.8-.8-1.2-1.3c-.8-1.1-1-2.8-1.3-4.4 0-.6-.1-1.3-.1-2.1 1.3 0 3.1.3 4.3.2.2 2 1.1 3.7 2.5 4.2.1 0 .6.2.7.1.8.3 1.5.2 2.1.1.6 0 1.5-.1 1.8-.6.2 0 .5 0 .4.1.5 0 .5.1.8 0-.1.1 0 .6 0 .5 0 .1 0 0-.2 0-.2.2-.1.6.2.6.1.2-.2.3 0 .2-.2.2 0 .6-.5.6 0 .1.2.1.1.2-.1-.2-.3.3-.4.1 0 0 0 .3-.2.4.2-.1.1.1.2.2h.4v.2c.1-.1 0 0 .2 0-.1.1 0 .3.3.4 0 .1 0 0-.1 0 .3.3.3.6 1 .5 0-.3 0-.4-.4-.6 0 .2 0 .1-.3 0-.2-.2 0-.5-.4-1 0-.2.2 0 0-.2 0-.2.3 0 .3-.2 0 0 0-.4-.2-.2.4-.3-.1-.5 0-.9.2 0 0 .3 0 .3.5-.2.4-.6.7-1 .4.2.3 0 .4-.2.4.3.3-.5.1-.6-.1.1 0 .3-.3 0 0 0 0 .2-.2.1 0 .2.2.1.2.2 0 .6-.5.2-.6 0 0 0 .3 0 .3-.1-.1 0 0-.2-.1-.6v.5c-.2.3-.3-.1-.6-.1 0 .1-.1.2-.2.3l-.4-.2c.5-.5.3-2.3.3-2.8-.1.3-.4-.4-.2-.6-.3.5-.3-.3-.5-.4 0-.1.1-.2.2-.2 0 0-.1-.1-.3-.2v.2c-.1 0-.1-.1-.3-.2.1 0 .4.1.4-.3.1 0 .2.1.2.2.2 0 0-.2 0-.3.2 0 .2.1.3 0 0 .2 0 .1-.2.1.5.4.9.4 1.1.9.2 0 0-.1 0-.2.1.2.8.5.6-.1.1.1.1 0 .2 0v.2c.1-.2.2-.6.3-.8 0-.1-.2 0-.3 0 0 .1.1 0 .2 0 0 .2-.4.1-.4.4-.3-.2.3-.3.2-.7.2 0 .1.1.3.1 0 0 0-.2-.1-.3-.2 0-.4.4-.5 0 .1 0 .1 0 .1.1.2 0 .1-.2 0-.4.2 0 .3.2.4 0 .2.2 0 .4.4.4v-.2c.2 0 0-.2.2-.3 0-.1 0 .1-.2 0 0-.2.2-.1 0-.2.3-.1.4 0 .6-.3 0-.2 0-.5.3-.5-.4 0-.8 0-1 .5-.5.1-.3-.5-.9-.4v-.3h-.1c-.2 0-.5 0-.6-.2 0 0 0 .1-.1.2-.2-.1.2-.2 0-.4-.3 0-.7-.5-.5-.8 0-.1-.3-.1-.3-.4-.1.2-.2 0-.3.2.1.3.2.2.2.5-.2 0-.2-.3-.6-.3.2.3.5.5.8.6-.1.1-.4.1-.4.3.1.2.4.3.5.5h.2q.1.2.2.2c0 .3-.2.1-.3 0 0 .3.1.5.1.7.1 0 0-.2.2-.1 0 .2.2.2.3.3-.1.1-.5-.1-.6-.3v.2s0-.2-.1 0c-.2 0-.2-.1-.5 0 0-.4-.1-.2-.3-.4.3-.1.4.3.4.3.1 0 0 0 0-.2.2.1.2.2.4 0V31c-.1 0-.2.1-.5 0-.3.3-.5 1-.8 1.2 0-.1.3-.4 0-.5.1-.1.1-.4.3-.5 0 0-.2 0-.3-.1.4.5-.8.5-.2.8 0 .1-.2.3 0 .5-.1.1-.2-.1-.4 0l-.2-.1c.1-.1-.2-.2 0-.2 0-.2-.2 0-.5 0-1-.9-2.5-1.5-3.4-2.4-2.1-1.1-4.5-3.3-5.5-6.1 0-.8-.3-1.3-.1-2-.2 0 0-.6-.2-.8h.2c-.4-2.1.5-4.4 1.6-5.6 1.4-1.3 3.4-2 5.4-2.2.1 0 0 .1 0 0 .4.2 1.3 0 1.8 0 0 0 .5.2.6 0v.1c1.6 0 2.7 1 3.6 1.3.1.2.4.5.5.6 2 1.6 3 4 2.5 7.3-.5 0-1.2.2-1.4 0-.5.1-.5 0-1.1 0-.1-.1 0-.4-.3-.3 0-.4.4 0 .2-.6.1.1.2 0 0 0 0 0 .2-.1.3 0v-.3s.3-.1.3 0c.3-.9 0-.9-.3-1.5.3.1 0 0 .1-.1 0 0-.1 0-.2-.1.2 0-.1.6 0 .5.2 0-.1.2-.2 0 .1.2-.1.2 0 .6 0 0 0-.1-.1-.2 0 0 .1.3-.2.2.2.2 0 .2-.1.4.2-.2.2.3 0 0 0 .6.3 1-.1 1.5-.4-.2-.4 0-1 0 0-.9-.1-1.1-.3-1.9h-.2c0-1-.8-.7-1.1-1.6 0 0-.6 0-.6-.4 0 0-.1.1-.3 0-.9-.6-2.5-.5-3.3 0-1.1.8-1.5 2.5-1.1 3.9.2.6.6 1 .8 1.5.8.6 1.2 1.6 2.3 2v.4h.4v.4c.3-.3.9.1.9.5.2 0 .5.1.5.3v-.1c.2.4.9.6 1.2.9-.1.3-.5.2-.4 0-.3.2.1.3.1.4-.1-.1 0 .2-.3.1.3-.2-.3-.1-.3-.5-.3.1-.4.4-.4.8.2 0 .4 0 .3-.3.1 0 .2.1.3 0 0 .2-.1.2-.3.2.1.2.4 0 .4 0v.5h.1c0-.1.2-.5.4-.3 0 .1 0 0-.1 0 0 .3.2.1.2.3 0-.1.3 0 .3-.3 0 0 .2 0 .2.1.1 0 0 0 0-.1.3-.1.6.3.7.5.4 0 .8.8 1.1.8 0 .2.3.2.3.4h.4c-.2.2.2.2.1.4.3-.2.8.6 1.1.8v.4c.2-.3.5.1.6.2 0 .1-.3 0-.4.3.2.2.2-.1.4-.1.6.5.8 1.3 1.1 1.9 0 .4-.2.6-.5.8 0 .1.3 0 .4-.2.5.5.5 2 .2 2.6Zm-6.9-4.9c.2 0 .5.6.1.5.1-.2 0-.2-.1-.5m2.1.1c0 .4.1 0 .4.1 0 .2-.2.3-.2.5l-.2-.2s0 .2-.1.3c0 0 0-.1-.1-.3.2 0 .2-.1.2-.2-.1.4-.1-.2.1-.2Zm.1-.6c-.2 0 0-.3-.3-.3 0-.1.2-.1.2-.3.3 0 .1.3.3.3-.1.3 0-.2-.4-.1 0 .2.3.2.2.4m.9-.3c0 .2 0 .2-.2.2 0 .2.3.1.2.3h-.4c.1.2.1.6.3.6v.7h-.3.1c0-.2-.2-.3.1-.3 0-.2-.2-.1-.4-.2.2-.1 0 0 0-.2.1 0 .2 0 .2-.1-.1-.1-.3-.1-.5-.2 0-.1.2-.1.3 0 .1 0 0-.3.1-.3 0 .1-.4-.3-.2-.3 0-.2-.4-.1-.4-.5h.3c.2 0 .3.3.5.1.3.1-.1.4.2.3Zm-.4 1.4q0 .3-.3.3c-.1-.1.1-.3.3-.3m1.2-3c-.1 0-.2 0-.2-.1-.1 0-.2.2-.2 0-.1 0 .4-.1.4.1m-2.5-3c.3.3.3-.3.4-.6.2.1.3.2.2.5 0 0-.1.1-.2 0 0 .1.1.2 0 .3.2 0 .4 0 .4-.2.2.1.1.3 0 .4-.2-.1-.3 0-.8 0 .1-.2-.2-.1-.2-.4Zm-.2 1.6h.1l-.2-.1c.1-.1.3.1.3.3h-.1Zm-1.8-5.8c.3 0 .1-.2.3-.5.1 0 0 .4.1.3 0 .1 0 0-.1 0 .2 1.1.3 2-.1 3.3-.4-.5 0-1.3 0-1.9 0-.4.1-.8 0-1.2Z"/><path class="st0" d="M107.7 36c-.2-.2-.5 0-.6-.2 0-.1.1 0 .2-.1 0 0-.2 0-.3-.1 0-.2.2-.3.3-.4-.1 0-.3.3-.3.5-.2 0 0-.1-.1-.3.4 0 .1-.4.2-.7-.1 0-.1-.3-.3-.4 0-.1.3.2.2-.1-.2 0-.2.1-.2-.3-.3 0-.2-.4-.5-.2 0 0 .3-.5.2-.8 0-.2-.4 0-.1-.2-.3-.2-.1.5-.5 0-.1.1.2.2.1.4h-.2c.2-.1 0-.2 0-.2-.2.2 0 .4 0 .6-.1 0 0-.1-.3-.1 0 .1.3.1 0 .1.1.1.3.2.4.2 0 .4-.3.5-.1.9.1-.2.2 0 .5 0 0 .2 0 .3.2.4 0 .1-.4 0-.4-.2-.1.3.3.5.4.5-.1 0-.3.2-.4.1 0 .2.2.3.2.1.1.4 0 .6-.2.8-.3 0 0 0-.1-.1-.3.3 0 .8-.3.8v.3c.1.1.3 0 .3.2h.3s0 .3.2.2c-.1.2 0 .5.1.5-.3.5.1.7.1.9.2 0 .3 0 .3-.2.2.2.2.4.4.3v.3c.2 0 .2-.2.2-.3-.2-.1 0-.1 0-.3 0 0-.1-.1-.3-.2 0 0 .2 0 .1-.3.2 0 .2.2.1.3.2 0 .1-.1.2-.2 0-.1-.4-.1-.5-.4 0 .3-.2 0-.3.2 0 0-.1-.5 0-.7 0-.1-.2 0-.3-.3 0 0 .2 0 .1-.2.1 0 0 .2.3.2 0 .4.1.4.1.6.3 0 .3-.6.4-.3.1 0 0-.1 0-.3s-.1 0-.1-.1c-.1 0-.2.1-.2.3-.2-.1.2-.1 0-.4.1.1.2 0 .3 0 0-.2-.4-.2-.3-.5-.3 0 0 .5 0 .4 0 .2-.1.1-.3.3-.1 0 0-.2 0-.4s0 0-.1-.2c-.1 0 0 .2-.3.2h-.1c-.2 0 0-.1 0-.2.2.1.3.1.3-.2.2 0 .1.1.2.1.2 0 .2-.2.2-.4.1.2.2.3.2 0 .2 0 0 .3 0 .3.2-.1.4-.3.5-.5 0 .1-.3 0-.3.2Zm-.9 2.3c-.3 0 0-.3-.3-.4.2-.2.3.3.3.4m0-3.5c.1.1.1.6-.1.5 0-.1.2-.2.1-.5m-.5 1.9c-.3 0-.3 0-.5-.6.2 0 .3.3.3 0 .1 0 .2.4.1.6Zm0-.9c-.2 0 .1-.2 0-.4h.4v.3c-.3-.1-.3 0-.4.2Zm.3.6c-.2 0 0-.4-.1-.7.3.2.1.1.4 0-.2.4.3.2.2.5-.1-.2-.5 0-.5.3Z"/><path class="st0" d="M106.7 38.7c.1.5-.3.3-.3.8.5.2.4-.8.3-.8m.4.8c0 .2 0 .3.1.3s0-.2-.1-.3m-1.5-.3c.1-.2 0-.1 0-.3-.1 0-.2 0-.3.1.2 0 .1.2.2.2Zm-4.4-7.5c0 .3.2.3.3.2v-.3c0 .1-.2.1-.3.1m.9-2.6c0 .2.2.3.3.4 0-.2 0-.4.1-.3 0-.3-.4 0-.4-.2Zm-3.2-3.7c0 .1 0 0-.2 0 0 .3.3.5 0 .6.1-.2.8.4.6-.2-.2.2-.3-.3-.4-.4m3.9 13.6s-.2-.1-.3 0c.1 0 0 .3 0 .5h.1s.1 0 0 0l.1-.2c-.1 0-.1 0 0-.2Zm-6.1-14.7c.2.3.6.4.7.6 0 0 .1-.1 0-.3-.4 0-.5-.4-.8-.3Z"/><path class="st0" d="M102.6 29.5c0-.2.3-.1.2-.4-.2 0-.5.3-.2.4m-2.2 13.1c0 .1 0 .1-.1.2.2 0 0 .3 0 .4.1 0 .2 0 0-.1h.2c-.1-.2 0-.1 0-.4h-.2Zm4.3-11.5c.3 0 .6 0 .6-.2-.3.1-.5-.2-.6.2m-.1 4.1c.4.5.1.3.2.8-.1 0 0-.1-.2-.2v.5h.2v-.5c.1.1.1 0 .3 0 0-.3-.1-.4-.1-.6zm-.2 1.7c.1 0 .2.1.2.1v-.3c-.1 0-.2 0-.2.1Zm.5-1.9c.1 0 0-.2 0-.4 0 .3-.2.1-.4 0 0 .5.2.2.5.3ZM90.2 48H90Zm.4.8v-.2.1Zm.3-1.7s.1 0 0 0h.2-.3Zm-.8 2v.1zm.9-1.9"/><path class="st2" d="M13.8 15v.3c-.2 0-.4 0-.3-.3-.4 0-.1-.1-.3-.1-.1 0 0 .2-.1.4.1 0 .2-.2.3 0-.2.3-.3.6-.4.9.2 0 .1-.2.4-.2 0 .2.2.2.3.4.1-.4.5-1 .2-1.2Z"/><path class="st0" d="M49.8 20.2c-.1 0 0 .4.1.4s0-.3 0-.4h-.2Zm-2.4 4.7c-.3 0-.4.3-.4.5h.4zm.2-.5c-.3-.2-.6 0-.5.3.2 0 .5-.1.5-.3m.7-1.5c.5 0 .6-.6.1-.7-.2.2.1.2.1.4-.2 0-.2.2-.2.3"/><path class="st2" d="M14.3 16.2c-.2.2-.2-.3-.4-.2 0 .3.6.6.4.2m2.3-.7c-.2-.1-.5 0-.5.4.2 0 .4-.2.5-.4"/><path class="st0" d="M48.9 22.1c0-.3.5-.1.6-.3-.3-.2.1-.3.1-.5h-.3c.1-.2.3-.4.3-.6h-.1s0-.1 0 0c0 .2-.3.4-.4.6 0 0-.2-.1-.3 0 0 .2 0 .3-.2.6.2 0 .2.3.3.4Zm.7-2.2c0-.3.3 0 .2.3.2-.1.2-.3.5-.1-.1-.4-.1-.6 0-1-.2-.1-.3 0-.5 0 0 .5-.3.1-.3.4.3.1-.1.3 0 .5Zm1.3-1.4c-.3-.1-.5.2-.3.4 0-.2.2-.2.3-.4m-.8-1.3c0 .1-.2.3-.2.5.2 0 .3-.4.2-.5m40.2 31.3h-.1Zm-.1.6s0 .1 0 0m-.1.2h.1Z"/><path class="st2" d="M13.8 14.4c0 .2-.4.5-.2.8.1-.3.4-.7.2-.8"/><path class="st0" d="M90.1 48H90zm.1 1.3"/><path class="st2" d="M13.5 17.7c0-.1.2-.4 0-.5 0 .1-.2.4 0 .5"/><path class="st0" d="M90.6 48.6c0-.1 0-.1-.2-.2 0 0 .1-.1.2 0Zm0 0"/><path class="st2" d="M13.7 17.1c0-.5-.2-.7-.3-1-.2.4.1.8.3 1"/><path class="st0" d="M98 24.8c0 .1-.1.5 0 .3 0-.2 0 0 .2 0v-.2h-.1Zm-35.1-1.5c0 .1 0 .3.1.4 0-.2.1-.5-.1-.4m14.3 26.2v.1ZM30.3 36c.3-.1.6.1.8-.1-.1.1-.7-.2-.8.1m35.1-15.1c.3.1.3-.4 0-.3 0 .1-.1.1 0 .3M30.8 32.7c-.3 0-.4 0-.6.2v.1c.3 0 .3 0 .5.1v-.4Zm43.3 17.2v.1Zm-3.6-.2v.3zm-5.2-23.1c.1 0 .1.2.2 0 0-.1-.2 0-.2-.1-.1 0-.3.3-.2.3 0-.1.2 0 .1-.3ZM29.8 23c0 .3.1.2.3.2 0-.2-.2-.2-.3-.2m49.7 27.2h.1ZM30.7 23c-.1.1-.3.1-.3.2.1 0 .1.2.3.2 0 0 .1-.4 0-.4m.1 4.1c0-.2 0-.2-.3-.2 0 .2.1.2.3.2m.6 5.9v-.3c-.1 0-.2 0-.3.1.1 0 0 .3.3.2m48 17.2v.1zm-4.8-3.3v-.1Zm-2.8 3v.1Zm-8.9-19.8c.2-.5.5-1.1.3-1.7-.1.5-.5 1-.3 1.7m2.1.8c-.1 0 0-.1 0-.1l-.2.2c.3-.2-.2-.4-.2-.6-.1.3 0 .5.1.7-.1.1-.6.6-.2.5 0 0 .2 0 .3-.1 0-.5-.1-.4.2-.5Zm1-7.7s0-.1 0 0c0 0 0-.2.1-.2-.2 0-.3.2-.2.3Zm-1 8.2s-.1.1-.1 0c-.1.1.1.3.2.4v-.4Zm19.8 8.1v-.2s-.1-.1-.2 0c0 .1 0 .2.2.2M64.7 15.3s.1.3.3.3c0-.2.2-.3 0-.4-.2 0-.2-.8-.6-.8-.2.4-.2.6-.1 1.2.3 0 .2-.2.4-.3m-.7 6.3c0 .3-.4 0-.5 0-.2.1 0 .4 0 .5 0-.2 0-.2.3-.2s.1 1 .6.8c-.2-.3-.1-.7-.1-1-.1 0-.1-.1-.2 0Zm.2 1.8c0-.1.3 0 .3-.2-.1-.2-.5 0-.3.2M62 21.1c0 .2-.2.1-.1.3.2-.1.1 0 .3.1 0-.3.3-.3.3-.5-.2 0-.3.1-.4 0Zm1.4 2.1v-.3h-.2c0 .1 0 .3.2.3m.3-5.1c-.1.1 0 .5.1.6 0-.2 0-.5-.1-.6m-2 7.5c0-.2 0-.4-.2-.4 0 .5 0 .9-.1 1.5.3-.1.2-.5.2-.7h.3c.2.1.4.5.5.8.2-1-.1-1-.2-1.8-.3 0 0 .5-.4.6Zm10.6 21.3v-.1ZM62 28.4c0 .1 0 .4.1.4 0-.1 0-.5-.1-.4m.1-4.6c0 .1-.2 0-.1.3.2 0 .1.1.3.2.2-.2 0-.3-.1-.4Z"/><path class="st0" d="M63.2 22c0 .1-.2.1-.3.2 0 .2.2.1.1.3.3 0 .2-.5.2-.8h-.3v-1c0-.1.1-.3.3-.3s.2 0 .2.2-.3 0-.3.2c.3 0 0 .5.2.6 0-.4.1-.8.4-1 .2.2-.1.6 0 .9 0-.5.3 0 .3-.2-.2-.1.1-.7-.2-.8.3-.3 0-1.5 0-1.5 0 .2-.3.2-.4.2 0 .3 0 1-.3 1.2 0-.2.3-.5 0-.6-.6.6-.2 1.5-.2 2.3h.3Zm.6-2v.3h-.2c-.3 0 .2 0 .1-.3Zm-2.1 4.4h-.2c0 .1 0 .4.3.5v-.2c-.1 0-.3-.1-.2-.3Zm-.5 3.2c0 .2-.2.3 0 .4 0-.2.1-.4 0-.4m.5-3.5c.1-.2-.1-.4.1-.3-.2-.2 0-.2-.1-.4-.1.1-.2.3-.3.5.2 0 0 .2.3.2m4.2-7.8c0-.2-.1-.2 0-.3v-.1c0 .2-.1.4.2.5Zm15.5 31.2v.1Zm3.6-7.9c0 .1 0 .3.2.4.1-.2-.1-.3-.2-.4M36.1 16.8v.6c.3 0 .3-.7 0-.6m1.8 1v.3c.1 0 .1.1.3.1 0-.1 0-.4-.3-.4m-6.5 9.7v.3s-.1 0-.1.1c.2 0 .3-.4 0-.4Zm1-8.3v-.3c-.1 0-.2 0-.2.1.2 0 0 .3.3.2Zm-4.1 16.7c0 .2-.4.1-.6 0v.3c.3 0 .3-.1.6 0 0-.1.1-.3 0-.3M82 46.8v.1zm-.2 2.4h.1Zm3.5-9.7s0-.2.2-.1v.3c.2 0 .2-.2.3-.4h-.5c0 .1-.1.3 0 .2m1.2 1c.1 0 .2 0 .3-.1-.2-.1-.2-.4-.4-.4 0 .2.3.2.1.5m0 1.4c-.2-.4.3-.4.5-.5-.2 0-.6 0-.9.2v.1c.2 0 .2 0 .4.1Zm-1 .3c.3 0 .7-.2.5-.4-.1.1-.4.1-.5 0-.2.2 0 .2.1.4Zm-3.4 7.2v.1Zm-1.2.5v.1Zm-.4-.5v-.2Zm4.6-10.2H85v.1c.1 0 .1.1.2.2v-.3ZM80.6 50s0 .1 0 0m.3.2v.2-.1ZM31.7 32.3c-.1 0-.2-.2-.3 0 0 .3.3.3.3 0m-.5-2.9c0-.2 0-.2.2-.3 0-.1 0-.3-.1-.4 0 .2 0 .6-.3.4v.3c0-.1 0 0 .2 0M81 49.2"/></svg>      `,
      brittas: `
<svg id="Lager_1" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 410.9 170.1"><defs><style>.st0{fill:#fff}</style></defs><path class="st0" d="M409.5 11.4c-1.4-.9-3.2-1.6-5.6-2.2-2.3-.6-4.9-1-7.6-1.3s-5.2-.2-7.4.1c-1.2.2-3.6.8-7.3 1.8s-8.5 2.2-14.5 3.7-12.9 3.1-20.9 5c-8 1.8-16.8 3.6-26.4 5.5-7.6 1.5-36.8 6.8-43.3 7.8-1.3-1.4-2.9-2.5-4.9-3.4s-3.7-1.3-5.3-1c-1.7.3-3.3 1.1-4.9 2.6q-2.25 2.1-4.8 5.1c-1.4.2-12 2-15.7 2.6-1.3-1.4-2.9-2.5-4.9-3.4s-3.7-1.3-5.3-1c-1.7.3-3.3 1.1-4.9 2.6-1.6 1.4-3.3 3.2-5 5.3-7.4 1.5-11.3 2.5-11.8 3.3-1.2 1.7 1.4 2.8 7.6 3.1-2.4 4.4-4.4 9.3-6.1 14.6-.4 1.2-.7 2.4-1 3.6-.3.3-.6.7-.9 1-2 2.4-4 4.7-6 6.7-2.1 2.1-4 3.8-5.8 5.3s-3.3 2.6-4.7 3.5c-1.4.8-2.3 1.2-2.7.9-.6-.3-.6-1.3-.1-3.1s1-3.8 1.7-6 1.3-4.4 2-6.5c.7-2.2 1-3.7.9-4.8 0-1-.4-1.9-1-2.6s-1.4-1.2-2.3-1.7c-.9-.4-1.9-.8-3-1q-1.65-.45-3-.6c-1 0-2.1.9-3.1 2.5s-2 3.6-2.9 6c-.7 2-1.3 4-1.8 6.3-.7 1-1.6 2.3-2.8 4-1.6 2.2-3.3 4.5-5.1 6.8s-3.6 4.4-5.3 6.2-3.1 2.8-4.1 3-1.3-.5-.9-2 1-3.3 1.9-5.4 1.7-4.1 2.4-6.2 1-3.6.7-4.6c-.5-1.1-1.2-2-2.3-2.6-1.1-.7-2.3-1.1-3.5-1.4-1.2-.2-2.4-.3-3.5 0-1.1.2-1.7.6-1.9 1.1-.3.5-.9 1-1.8 1.7s-1.8 1.3-2.8 1.9q-1.5.9-3 1.2c-1 .2-1.8.2-2.4-.3 1.7-2.3 2.4-4.4 2.1-6.4s-1.1-3.4-2.4-4.3-3-1-4.9-.4-3.7 2.3-5.3 5.1q-1.2 1.95-1.5 3.6c-2-2.8-4.8-4.9-8.4-6.5s-7.4-2.3-11.4-2c1.9-1.6 4.8-3.8 8.7-6.8 3.8-3 7.9-6.3 12.3-10.1 4.3-3.7 8.6-7.6 12.6-11.7q6.15-6.15 9.9-12c2.5-3.9 3.9-7.5 4-10.8s-1.6-6.1-5.2-8.3c-5.8-3.3-12.9-4.7-21.2-4s-17.4 2.8-27 6.2c-9.7 3.4-19.5 7.9-29.6 13.4S55.5 31.6 46.4 38 29.1 51 21.8 57.6 8.8 70.3 4.7 75.8C1.6 79.5 0 83.3 0 86.9s.5 6.6 1.6 9q1.65 3.6 3.9 5.1c1.5 1 2.4.9 2.7-.2.8-3.9 3.3-8.3 7.3-13.3s9-10.3 15-15.8c6-5.6 12.7-11.2 20.1-16.9 7.5-5.7 15.1-11.2 23-16.5S89.3 28.2 97 23.8c7.8-4.4 15-8.1 21.6-11q9.9-4.35 17.1-6c4.8-1.1 8.3-.9 10.4.6 1.9 1.3 1.6 3.9-.9 7.7q-3.6 5.7-11.1 12.9c-5 4.9-10.7 9.9-17.2 15.3-6.5 5.3-12.8 10.3-19 14.9s-11.8 8.6-16.7 11.9c-5 3.3-8.3 5.4-10 6.1.3-1.9.7-3.9 1.2-6.1.5-2.1.2-3.8-1-5-.5-.4-1.3-.8-2.4-1s-2.3-.4-3.6-.4q-1.95 0-3.6.3c-1.1.2-1.8.6-2.3 1-.5.6-1.1 1.8-1.6 3.4-.6 1.6-1.2 3.6-1.8 5.9-.7 2.3-1.4 4.8-2.1 7.4-.7 2.7-1.6 5.3-2.7 8-.3.3-1.2 1-2.5 2.1-1.3 1-2.8 2.2-4.4 3.5s-3.1 2.6-4.4 3.8c-1.3 1.3-2.1 2.2-2.4 2.9-1 2.5-1.1 4.3-.6 5.3.6 1 1.5 1.5 2.9 1.6 1.3 0 2.8-.2 4.3-.7 1.5-.6 2.8-1.2 3.7-1.9-.2 1.2-.3 2.6-.4 4.1s-.1 3 0 4.4c0 1.4.2 2.8.5 4 .2 1.2.6 2.1 1.1 2.7.2.2.6.6 1.4 1 .7.5 1.5.8 2.4 1.1.8.3 1.6.4 2.4.4.7 0 1.1-.4 1.3-1 1.2-4.5 2.5-9.2 3.8-14.2s2.8-9.6 4.6-13.7c1.2-.6 3.2-1.9 6.1-3.9s6.3-4.2 10.1-6.6 7.8-4.8 11.9-7.2q6.3-3.6 12-5.7c3.9-1.4 7.3-2 10.4-1.9s5.3 1.5 6.7 4.1c1.6 2.8 1.6 6.5 0 11s-4.2 9.4-7.9 14.7-8.3 10.7-13.6 16.3c-5.4 5.6-11.1 11.1-17.3 16.4-6.1 5.3-12.4 10.2-18.7 14.7-6.3 4.4-12.3 8.2-17.9 11.2s-10.6 5-14.9 5.9c-4.4 1-7.6.6-9.8-1.1-2.3-1.7-3.5-4-3.6-7s.2-6.1 1-9.4c.8-3.2 1.7-6.3 2.9-9.1 1.2-2.9 2-5.1 2.5-6.6.4-1.3 0-2.1-1.5-2.5-1.4-.4-3-.4-5-.1-1.9.3-3.8.8-5.5 1.6-1.8.7-2.8 1.6-3.1 2.6-2.6 8.4-3.4 15.3-2.5 20.8s3.2 9.6 6.9 12.5c3.6 2.9 8.5 4.3 14.5 4.4 6 0 12.8-1.1 20.3-3.4 7.5-2.4 15.6-6 24.2-10.9 8.7-4.9 17.5-11 26.5-18.3 2.3-1.8 5-4.2 8-7.2s6.1-6.4 9.1-10.1 5.9-7.6 8.5-11.7 4.7-8.3 6.2-12.6c1.5-4.2 2.2-8.4 2.2-12.4 0-1.6-.2-3.1-.5-4.6.2.2.5.4.7.5 1.7 1 3.9 1.5 6.4 1.6 2.5 0 4.8-.4 7-1.5-.6 2.3-1.2 4.5-1.7 6.5s-.6 3.8-.3 5.5c.2 1.9 1.1 3.5 2.8 4.7s3.5 2.1 5.6 2.7q3.15.75 6 .9c1.9 0 3.3-.2 4.3-.8 2.1-1.3 4.2-3.2 6-5.8 1.9-2.6 3.7-5.2 5.3-8 .4-.7.7-1.3 1.1-1.9.4 1.1 1 2.2 1.7 3.1 1.4 1.7 3.1 3 5 4s3.9 1.6 5.9 1.9 3.6.3 5 0c1-.4 2.3-1.5 4-3.1 1.7-1.7 3.5-3.6 5.4-5.8q2.4-2.85 4.8-6c.2 4 1.2 7.2 3.1 9.7 2.1 2.6 5.7 3.5 10.9 2.6 2.5-.4 5.4-1.9 8.6-4.5s6.2-5.5 9-8.6c1.4-1.6 2.7-3.1 3.9-4.6.2 3.9 1.3 7 3.1 9.3 2.1 2.6 5.7 3.5 10.9 2.6 2.6-.4 5.4-1.9 8.6-4.5s6.2-5.5 9-8.6c.8-.9 1.6-1.8 2.3-2.7 0 .3.2.5.2.8.8 2 2.1 3.6 3.9 4.9s3.7 2.4 5.9 3.1c2.2.8 4.3 1.2 6.4 1.3 2.1 0 3.8-.1 5.2-.6 1.5-.7 2.9-1.8 4.2-3.1 1.4-1.3 2.8-2.7 4.3-4.1 2.4 1.5 5.2 2.4 8.4 2.9 3.1.4 5.5.3 7.1-.3 1.2-.5 2.7-1.7 4.3-3.8s3.3-4.4 4.8-7c1.6-2.6 6.2-10.4 6.8-11.4h.1c2 0 4 0 5.9-.4 1.9-.3 3.6-.6 5.2-.9 1.5-.3 2.5 0 2.9.9.2.9-.1 2.3-1.1 4.2s-2.2 3.8-3.5 5.8c-1.4 1.9-2.8 3.6-4.2 4.9-1.5 1.3-2.5 1.8-3.2 1.3-.4-.3-.4-1 0-2 .5-1 1-2 1.7-3.1s1.4-2.1 2.1-3.2 1.2-1.8 1.5-2.3c1.1-1.6 1.4-2.8.8-3.7-.5-.9-1.8-.7-3.8.6q-1.95 1.2-3.9 3c-1.3 1.2-2.4 2.4-3.4 3.6-1 1.3-1.8 2.5-2.3 3.7-.5 1.3-.8 2.3-.6 3.2.2 1.3.9 2.6 2.1 4.1 1.3 1.5 2.8 2.7 4.5 3.8 1.8 1.1 3.7 1.8 5.9 2.1 2.1.4 4.3.1 6.4-.7 2-.8 4-2.2 6-4.3s3.7-4.4 5.1-6.8 2.5-4.8 3.3-7.3 1-4.5.8-6.2-1-3.1-2.2-4.2c-1.3-1.1-2.9-2-4.8-2.5-2-.5-4.2-.8-6.6-.8s-4.9.4-7.6 1.1q1.35-2.7 3.6-4.8c1.5-1.4 2.1-3 1.9-4.8-.1-.9-.6-1.8-1.4-2.7s-1.7-1.8-2.8-2.5-2.2-1.2-3.4-1.6c-1.2-.3-2.3-.4-3.3-.1-1.5.4-3 1.5-4.4 3q-2.1 2.4-3.3 5.4c-.8 2.1-1.1 4.2-1 6.3s.8 4 2.2 5.5l.1.1q-1.95 2.4-3.9 4.5-3.15 3.45-5.7 6c-1.7 1.7-3.2 3.1-4.4 4.2-1.2 1-2 1.5-2.5 1.3q-.9-.45 0-2.7c.6-1.5 1.3-3.3 2.2-5.2.9-2 1.7-3.9 2.5-5.8s1.1-3.3.9-4.4c0-.9-.4-1.7-1.1-2.4-.8-.7-1.7-1.2-2.7-1.6s-2.2-.7-3.4-.9-2.3-.4-3.4-.5c-1.3 0-2.7 1-4.3 2.8q-.9-1.65-2.7-2.7c-1.2-.7-2.5-1.3-4-1.7-1.4-.5-2.8-.7-4.2-.8-1.4 0-2.5 0-3.4.3-1.4.4-3.2 1.7-5.4 4-2.2 2.4-4.2 5.1-6.1 8.1-.5.8-1 1.6-1.4 2.5l-.3.3c-1 .8-2.9 2.6-5.5 5.3s-5.4 5.5-8.3 8.3-5.6 5.3-8.1 7.4-4.2 3-5.1 2.6c-1-.5-1.3-1.6-1-3.5.3-1.8 1-4 2.2-6.5s2.6-5.3 4.4-8.4c1.8-3 3.6-6 5.5-8.8s3.8-5.4 5.6-7.8 3.4-4.2 4.6-5.5a843 843 0 0 1 31.7-6c10.6-1.8 92.9-14.4 96.8-15.1s6.1-1.4 6.4-1.9c.6-1 .2-2-1.2-2.9ZM291 69.1c.3-1.6 1-3.3 1.8-5.4.9-2 2-4.2 3.2-6.5 1.3-2.3 2.6-4.2 3.9-5.9 1.3-1.6 2.6-2.8 3.8-3.5s2.1-.5 2.8.5c.2 1.3-.2 3.3-1.2 6.1s-2.2 5.5-3.8 8.2q-2.4 4.05-5.1 6.9c-1.9 1.9-3.6 2.6-5.1 2-.7-.2-.8-1-.5-2.6Zm-38.8-27.5c-2.4 4.5-4.4 9.3-6.1 14.6-.5 1.5-.8 2.9-1.2 4.4-1.1 1-2.7 2.5-4.7 4.6-2.6 2.7-5.4 5.5-8.3 8.3s-5.6 5.3-8.1 7.4-4.2 3-5.1 2.6c-1-.5-1.3-1.6-1-3.5.3-1.8 1-4 2.2-6.5s2.6-5.3 4.4-8.4c1.8-3 3.6-6 5.5-8.8s3.8-5.4 5.6-7.8 3.4-4.2 4.6-5.5c4.1-.9 8.4-1.8 12.8-2.6l-.7 1Z"/><path class="st0" d="M191.9 48.1c1.1.5 2.2.8 3.4 1q1.8.3 3 0c.7-.2 1.6-.9 2.6-2q1.5-1.65 2.7-3.6c.8-1.3 1.5-2.7 2.1-4s.8-2.4.6-3.2c0-.7-.4-1.4-1.3-2.2s-1.9-1.6-3.2-2.2-2.6-1-4-1.3q-2.1-.3-3.3 0c-.8.4-1.7 1.1-2.5 2.2s-1.5 2.3-2 3.6c-.6 1.3-1 2.7-1.4 4.1-.3 1.4-.5 2.4-.5 3.2 0 .9.4 1.7 1.1 2.5q1.05 1.05 2.7 1.8Zm-49.3 96.8c-1 0-1.8-.3-2.3-.8-.7-.8-.9-1.8-.9-3.6h-3.3c0 3.1.4 4.6 1.7 5.9 1.1 1.1 2.7 1.6 4.8 1.6 2.2 0 3.8-.7 4.9-1.8 1.3-1.4 1.7-3.3 1.7-6.2 0-4.4-.7-6.4-3.9-7.5l-3.1-1.1c-2.2-.8-2.6-1.6-2.6-4.4s.3-2.6 1-3.4c.5-.5 1.2-.9 2.1-1 1 0 1.8.2 2.2.8.7.8.8 1.8.8 3.3l3.3-.2c0-2.6-.4-4.4-1.8-5.7-1-.9-2.6-1.4-4.6-1.3-1.8.1-3.3.8-4.4 1.9-1.4 1.4-2.1 3.4-2.1 5.8 0 4.2.9 5.7 3.8 6.7l3.1 1.1c2.2.9 2.7 1.8 2.7 5.1s-.2 2.9-.9 3.8c-.5.6-1.2.9-2.4 1ZM313.3 107v37.2l3.3-.1v-25.5l7.1 25.4 3.1-.1V106l-3.3.3v25.8l-7.1-25.3zm-8.7 28.7 1.3 8.6h3.5l-6.4-36.6-3.2.2-6.4 36.6h3.5l1.3-8.7 6.4-.2Zm-3.1-20.7 2.6 16.7-5.2.2zm-140.8 32.3v-25.8l4.6-.3v-3.1l-12.6.9v3.1l4.7-.4v25.7zm183.3-6.5c1.9-3 1.9-7.2 1.9-16.8s0-13.8-1.9-16.6c-1-1.5-2.5-2.5-4.7-2.4l-6.4.5v38.2h6.4c2.2-.2 3.7-1.4 4.7-3Zm-2.5-2.8c-.5.9-1.2 1.5-2.3 1.5h-2.9v-30l2.9-.2c1.1 0 1.9.5 2.3 1.3 1 1.8 1.1 4.8 1.1 13.6s-.1 11.9-1.1 13.7Zm18.8-4.1 1.3 9.3h3.5l-6.4-39.6-3.2.2-6.4 39.6h3.5l1.3-9.4 6.4-.2Zm-3.1-22.4 2.5 18.1-5.1.2zm-174.7 13.8c0-6.6-2.3-8.4-6.5-8.1l-6.2.5v29.4h3.3v-12.8h3c0-.1 3.8 12.6 3.8 12.6h3.5l-4.2-13.5c2.4-1.3 3.3-3.8 3.3-8ZM176 131h-2.9v-10.4l2.9-.2c2.6-.2 3.1 1.9 3.1 5.1s-.6 5.4-3.1 5.5m21.4 8.3 1.3 7.3h3.5l-6.4-30.7-3.2.2-6.4 30.7h3.5l1.3-7.3zm-3.2-17.4 2.6 14.1-5.1.2 2.6-14.2Zm42.6 21.5c1.9-2.5 1.9-6.1 1.9-14.3s0-11.8-1.9-14.1c-1-1.3-2.5-2.1-4.7-2l-6.4.5v32.4h6.4c2.2-.2 3.7-1.2 4.7-2.5m-2.5-2.4c-.5.8-1.2 1.3-2.3 1.3h-2.9v-25.5l2.9-.2c1.1 0 1.9.4 2.3 1.1 1 1.5 1.1 4 1.1 11.6s-.1 10.1-1.1 11.7m-28.2-26v31.4l3.3-.1v-21.6l7.1 21.5 3.1-.1V114l-3.3.3v21.8l-7.1-21.3zm51.2-3.8-3.6.3-4.1 27.4-3.9-26.8-3.7.2 5.9 33.2 3.4-.1zm32.4 7.8c0-7.9-2.3-10.1-6.5-9.7l-6.2.5V145h3.3v-15.3h3c0-.1 3.8 15.1 3.8 15.1h3.5l-4.2-16.2c2.4-1.6 3.3-4.5 3.3-9.5Zm-6.5 6.7h-2.9v-12.4l2.9-.2c2.6-.2 3.1 2.3 3.1 6.1s-.6 6.4-3.1 6.5m-11.5-11.8v-3.8l-10.6.8v34.3l10.6-.2v-3.7l-7.3.1v-11.7l6.3-.3v-3.7l-6.3.3v-11.6zM136.1 154h229.1v4.1H136.1zm0-40.7L365.2 93v-4.8l-229.1 21.7z"/></svg>      `,
      strandkollektivet_original: `
<svg id="Lager_1" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 580.3 106.2"><defs><style>.st0{fill:currentColor}</style></defs><path class="st0" d="M167.4 105.6c-3.8 1.1-7.6.5-10.5-1.8s-2.9-4.5-3.2-7.3L146.2 38l-.6-4.7c-.5 1-.4 2-.3 3.2l.4 5.2.4 5.5.8 20.7.4 27.3c0 2.5.5 4.9-1.1 7.1s-4.7 3.3-7.6 2.8-5.5-3.2-5.5-6.9V7.6c0-5.7 5.6-7.6 10.5-7.6s8.5 2.8 9.2 7.7l8.4 65.2c.8-1.3.3-3 .1-4.5l-.9-11.3-.4-6.1-.2-9.1-.5-28.4c0-2.5-.4-5 0-7.4.5-3.8 3.5-6 7.3-6s6.9 2.1 6.9 5.8v93.2c0 3.3-3.3 5.7-6.2 6.5Zm37.8-4c-5 4.3-15.7 3.6-22.4 3.4s-6.1-2.6-6.6-6.2v-92c.6-2.9 2.5-5.7 5.6-5.8 5.1-.1 10.2-.2 15.2.1 7.7.6 12.3 5.9 12.3 13.6v76.5c0 4-1.4 7.8-4.2 10.3Zm-11-87.1h-2.7v77h2.7zm-99.8 85.7c0 4-4.5 6.1-7.8 5.9s-7.1-3-7.1-7v-38c0-.6-.5-1.4-.8-1.7s-2-.1-2 .4v39.6c0 3.4-2.3 5.6-5.3 6.5s-5 .2-7.1-1.3-2.7-3.6-2.7-6.4V7.3c0-3.2 3.2-6.1 6-6.2 5.1-.1 9.6-.2 14.5 0s6.6 1.5 8.9 3.7 3.4 5 3.4 7.9v31.8c-.1 3.5-2.5 6.1-5.6 7.6 5.2 2.3 5.7 7 5.7 12.3v35.7ZM79.5 14.5h-2.8v31.1h2.8zm198.8 85.8c-4.5 5.3-11.6 6.8-18.1 5.1s-11.5-7.2-11.5-14.4V15.9c0-7.7 4.6-13.8 12.3-15.4s20.4 4 20.4 13l.2 78.1c-.5 3.2-1.2 6.2-3.4 8.8Zm-11.8-86.6h-2.8v78.6h2.8zm-26.4 34.9 7.3 49.1c.4 2.5-.7 5-2.2 6.4s-4.5 2.3-6.9 1.8-5.7-2.8-6-6.2l-4.7-37.9-.6 38.5c0 3.7-3.9 5.6-7.1 5.7s-7.5-1.9-7.5-5.8V5.8c0-3.9 4.2-5.7 7.3-5.8s7.5 2.4 7.6 6.6c.2 10.9-.4 21.4.4 32.4l4.4-32c.4-4.5 3.4-7.2 8-7.1s7.8 2.7 7 6.9l-7 41.7Zm183.5 0 7.3 49.1c.4 2.4-.8 5-2.1 6.4s-4.3 2.2-6.4 1.9c-4.7-.5-6.3-3.7-6.8-7.9l-4.4-36.5-.5 38.3c0 4.6-5.3 6.9-9.4 5.9-2.4-.7-5.4-2.5-5.4-5.5V5.8c0-3.9 4.2-5.8 7.4-5.8s7.4 2.5 7.5 6.7l.4 32.2 4.4-31.8c.6-4.3 3.1-7 7.7-7.1 3.7 0 8.2 2.8 7.4 7.4l-7 41.2ZM97.4 59.2c0-9.9 9.7-14 17.8-16.5V15c0-.4-.8-1.3-1.2-1.4s-1.5.9-1.5 1.4v18.3c0 4-4 7-7.7 7s-7.4-3-7.5-7.1c-.2-6.2-.2-12.3 0-18.5S102.6 1.8 109.7.4s5.8-.6 8.6.1c7 1.8 12.1 7.6 12.1 15.1v82.9c0 4.5-4 7.7-8 7.5s-7.4-4-7.4-8.8c-1.3 2.7-2 5.3-4.2 7s-4.8 2.3-7.7 1.4c-4.5-1.4-5.8-7.5-5.8-11.4v-35ZM112.5 91c0 .6 1.2 1.6 1.6 1.4s1.1-.9 1.1-1.4V55.1c-2.1 1.2-2.6 3.5-2.6 5.6V91Zm240.2.1V68.4c.1-4.1 4.1-7 7.7-6.9s7.6 3.2 7.5 7.5v21.5c0 7.9-5.1 13.8-12.8 15.2-10.3 1.9-20.2-4.5-20.2-14v-77c0-7.5 5.8-13.1 12.6-14.3s5.4-.5 8 0c7.4 1.4 12.3 7.3 12.3 14.8v33.4c0 3.4-2.9 7.3-6.3 7.3l-11.6.2V91c0 .5.8 1.2 1.2 1.3s1.5-.8 1.5-1.2Zm.1-49.3v-27c0-.5-1.2-1.4-1.6-1.3s-1.1 1-1.1 1.5v27.1c0 .7 2.7.7 2.7-.4Zm178.4 49.3V68.8c0-4 3.5-7.2 7.2-7.4s7.9 2.8 8 7c.2 7.8.2 15.3 0 23-.3 7.4-5.4 12.8-12.4 14.2s-10.5.2-14.7-3.1-5.6-6.2-5.6-10.6V15c0-7.5 5.3-13.3 12.6-14.6s5.6-.5 8.2 0c6.8 1.4 11.9 7 12 14.2v33.7c.2 3.6-2.6 7.7-6.4 7.7l-11.5.2v34.5c0 .6.8 1.4 1.2 1.6s1.5-.7 1.5-1.2Zm0-49.2v-27c0-.5-1.2-1.5-1.5-1.3s-1.2 1-1.2 1.4v27.1c0 .7 2.6.7 2.7-.2m-35-27.4.3-8.3c.1-3.8 3.3-6.2 6.9-6.2s4.5.6 5.9 2.2 1.9 3.8 1.7 6.3l-5.7 79.1-.6 8.4c-.2 3.4-1.5 6.8-4.6 8.5s-9.6 2.3-13.8-.3c-2.3-1.4-3.8-4.1-4-7l-6.6-88.7c-.4-5.1 3.2-8.5 8-8.5s8 2.4 8.1 6.8l.4 11.9.8 29.3.4 16.8c0 3.9.3 7.5.3 11.4l.8 4 .4-18.3.9-29.6.4-17.9ZM20.7 105.6C10.9 107.8.8 101.9.2 92.8S0 81.3 0 75.3s4-7.4 8.4-7.1 6.5 2.9 6.5 6.7v15.3c0 .7.9 2.3 1.5 2.1 1.5-.5 1.2-2.2 1.2-3.4v-16c0-3.3-1-6.5-2.6-9.5-4.3-8.2-8.2-13.8-12.3-22s-2.2-6.1-3-9.3l.5-18.4C.3 4.9 9.9-1.6 20.8.4s11.5 6.5 12 13.4.3 8.7 0 12.9-3.5 6.3-7.4 6.4-7.4-2.4-7.6-6.6-.1-7.8 0-11.3-.9-1.6-1.4-1.6-1.4 1.1-1.4 1.7c-.2 7.9-1 16.4 2.8 23l4.4 7.6c4 7 10.3 16.1 10.6 24.3s.3 14.5 0 21.8-5.4 12.2-12.1 13.6m550.7-7.4c0 5-3.6 8.1-8.3 7.9s-7-2.7-7-6.6V14.4c-4.9.8-8.6-1.7-8.9-6S549 1 553.1 1c7.3 0 14.6-.3 21.9.2 4.6.3 6.2 6.1 4.6 9.5-2.7 5.6-8.2 3-8.3 4.2s0 1 0 1.6v81.6Zm-263.3 0c.2 3.7-2.4 6.9-6.3 6.9h-11.3c-2.8 0-6.1-2.4-6.1-5.7V6.7c-.1-4.4 3.9-6.7 7.8-6.7s7.8 2.4 7.8 7v84.5c2.5 0 4.4.3 6 1.6s2 3.1 2.2 5.2ZM60.4 99.3c0 3.4-1.7 6.2-5.1 6.6-6 .6-13.9.7-15.6-6.4s-1.1-4.8-1.1-7.3V32.9c-3.1-.9-4.6-3.3-4.6-6.2s1.6-5.5 4.5-6.4V9.7c.1-3 2.7-5.3 5.5-5.8s4.4 0 6.2 1.1S53 8.3 53 10.6V20c2.4.2 4.2.5 5.5 1.7 2.7 2.3 2.3 7.8.2 9.8s-2.8 1.6-5.7 1.6V91c0 3.7 7.2 0 7.4 8.2Z"/><path class="st0" d="M457.3 99.3c0 3.3-1.8 6.2-5.3 6.6s-5.4.2-8 0c-7.5-.8-8.6-8.3-8.6-14.7v-58c-3.1-1-4.6-3.3-4.6-6.3s1.4-5.5 4.5-6.4l.2-10.7c0-3.9 3.9-5.9 7.4-5.8s6.8 2.1 6.9 6l.2 10.2c2.2.2 3.9.5 5.3 1.6 2.7 2.4 2.7 7.6.2 10s-2.9 1.6-5.5 1.6v57.9c0 .5 0 1.2.3 1.4.9.8 7.1.2 7.1 6.8Zm-124.2-.9c0 3.8-2.6 6.6-6.3 6.7s-7.2 0-10.9 0-6.1-2.7-6.1-6.1V6.7c0-4.2 3.7-6.7 7.5-6.7s7.4 1.6 7.4 5.4l.2 86.1c5-.5 8.3 2.2 8.3 6.9Zm60.9.3c0 3.3-2.6 6.3-6.1 6.4s-7.1.1-11 0-6.1-2.2-6.1-5.2v-94c0-3.9 4.2-5.8 7.3-5.8 4.4 0 7.6 2.7 7.6 7.1v84.2c2.7.1 4.6.3 6.2 1.7s2.1 3.2 2.1 5.5Zm70.7 7.2c-3.6-.6-6.2-3.1-6.2-6.7v-73c0-4.2 3.3-6.7 7.2-6.9s7.9 2.3 7.9 6.7v73.4c0 4.6-4.7 7.2-8.9 6.5"/><circle class="st0" cx="466" cy="8.8" r="8.6"/></svg>   
`,
        nisses: `
<svg baseProfile="tiny" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 112.9 28.4" overflow="visible" xml:space="preserve"><path d="M1.7 20.7V3.3h6.5c1.3 0 2.5.2 3.4.7s1.6 1.1 2.1 2c.5.8.7 1.8.7 2.9s-.2 2.1-.7 2.9-1.2 1.5-2.1 1.9-2.1.7-3.4.7H3.6v-2.6h4.2c.8 0 1.4-.1 1.9-.3s.9-.5 1.1-1c.2-.4.4-.9.4-1.6 0-.6-.1-1.1-.4-1.6-.2-.4-.6-.8-1.1-1-.5-.3-1.1-.4-1.9-.4H4.9v14.8zm9-7.9 4.3 7.9h-3.5l-4.2-7.9zM22.4 21c-1.3 0-2.4-.3-3.4-.8s-1.7-1.3-2.2-2.3-.8-2.2-.8-3.6c0-1.3.3-2.5.8-3.6.5-1 1.2-1.8 2.2-2.4q1.35-.9 3.3-.9c.8 0 1.6.1 2.3.4s1.4.7 1.9 1.2c.6.5 1 1.2 1.3 2.1s.5 1.8.5 3v.9H17.5v-2h7.8c0-.6-.1-1.1-.4-1.6s-.6-.8-1-1.1-1-.4-1.6-.4-1.2.2-1.7.5-.8.7-1.1 1.2-.4 1-.4 1.6V15c0 .8.1 1.4.4 2 .3.5.7 1 1.2 1.2.5.3 1.1.4 1.8.4.4 0 .9-.1 1.2-.2q.6-.15.9-.6c.3-.2.5-.6.6-.9l2.9.3c-.2.8-.5 1.4-1 2s-1.2 1-1.9 1.3-1.8.5-2.8.5M36 21c-1.3 0-2.4-.3-3.4-.9-.9-.6-1.7-1.4-2.2-2.4s-.8-2.2-.8-3.5.3-2.5.8-3.5 1.2-1.8 2.2-2.4q1.35-.9 3.3-.9c1.1 0 2 .2 2.8.6s1.5.9 2 1.6.8 1.5.8 2.5h-2.9c-.1-.6-.4-1.2-.8-1.6s-1-.5-1.8-.5c-.6 0-1.2.2-1.7.5s-.8.8-1.1 1.5-.4 1.4-.4 2.3.1 1.7.4 2.3.6 1.1 1.1 1.5 1 .5 1.7.5q.75 0 1.2-.3c.4-.2.7-.4.9-.8.2-.3.4-.7.5-1.2h2.9c-.1.9-.3 1.7-.8 2.5-.5.7-1.1 1.3-1.9 1.7-.8.3-1.7.5-2.8.5m13.4 0c-1.3 0-2.4-.3-3.4-.8s-1.7-1.3-2.2-2.3-.8-2.3-.8-3.6.3-2.5.8-3.6c.5-1 1.2-1.8 2.2-2.4s2-.9 3.3-.9c.8 0 1.6.1 2.3.4s1.4.7 1.9 1.2c.6.5 1 1.2 1.3 2.1s.5 1.8.5 3v.9H44.5v-2h7.8c0-.6-.1-1.1-.4-1.6s-.6-.8-1-1.1-1-.4-1.6-.4-1.2.2-1.7.5-.8.7-1.1 1.2-.4 1-.4 1.6V15c0 .8.1 1.4.4 2 .3.5.7 1 1.2 1.2s1.1.4 1.8.4c.4 0 .9-.1 1.2-.2q.6-.15.9-.6c.3-.2.5-.6.6-.9l2.9.3c-.2.8-.5 1.4-1 2s-1.2 1-1.9 1.3-1.8.5-2.8.5m7.8 4.6v-18h3v2.2h.2c.2-.3.4-.7.7-1s.7-.7 1.2-.9c.5-.3 1.1-.4 1.9-.4 1 0 1.9.3 2.7.8s1.5 1.3 1.9 2.3c.5 1 .7 2.2.7 3.7 0 1.4-.2 2.7-.7 3.7s-1.1 1.8-1.9 2.3-1.7.8-2.8.8c-.8 0-1.4-.1-1.9-.4s-.9-.6-1.2-.9c-.3-.4-.5-.7-.7-1h-.1v7h-3zm3-11.4c0 .8.1 1.6.4 2.2.2.6.6 1.1 1 1.5.5.4 1 .5 1.7.5s1.3-.2 1.7-.5c.5-.4.8-.9 1-1.5s.4-1.4.4-2.2-.1-1.5-.3-2.2c-.2-.6-.6-1.1-1-1.5-.5-.4-1-.5-1.7-.5s-1.2.2-1.7.5-.8.8-1 1.5c-.3.6-.5 1.3-.5 2.2m18-6.6V10h-7.5V7.6zm-5.7-3.1h3.1v12.3c0 .4.1.7.2 1s.3.4.5.4c.2.1.4.1.7.1h.5c.1 0 .3-.1.4-.1l.5 2.4c-.2.1-.4.1-.7.2s-.7.1-1.1.1c-.8 0-1.5-.1-2.1-.4q-.9-.45-1.5-1.2c-.4-.5-.5-1.2-.5-2zm9.2 1.3c-.5 0-.9-.2-1.3-.5-.3-.3-.4-.7-.4-1.2s.2-.9.5-1.2c.4-.3.8-.5 1.3-.5s.9.2 1.3.5c.3.3.5.7.5 1.2s-.2.9-.5 1.2-.9.5-1.4.5m-1.5 14.9V7.6h3.1v13.1zm11.4.3c-1.3 0-2.4-.3-3.3-.8-.9-.6-1.7-1.4-2.2-2.4s-.8-2.2-.8-3.5c0-1.4.3-2.5.8-3.6.5-1 1.2-1.8 2.2-2.4.9-.6 2-.8 3.3-.8s2.4.3 3.3.8c.9.6 1.7 1.4 2.2 2.4s.8 2.2.8 3.6-.3 2.5-.8 3.5-1.2 1.8-2.2 2.4c-.9.5-2 .8-3.3.8m0-2.5c.7 0 1.3-.2 1.7-.6.5-.4.8-.9 1-1.5s.3-1.4.3-2.2-.1-1.5-.3-2.2-.6-1.2-1-1.6c-.5-.4-1-.6-1.7-.6q-1.05 0-1.8.6c-.5.4-.8.9-1 1.6s-.3 1.4-.3 2.2.1 1.5.3 2.2c.2.6.6 1.2 1 1.5s1.1.6 1.8.6m11.4-5.4v7.7h-3.1V7.6h3v2.2h.2c.3-.7.8-1.3 1.4-1.7.7-.4 1.5-.6 2.5-.6q1.35 0 2.4.6c.7.4 1.2.9 1.6 1.7.4.7.6 1.6.5 2.7v8.3h-3.1v-7.9c0-.9-.2-1.6-.7-2.1s-1.1-.7-1.9-.7c-.5 0-1 .1-1.4.4s-.7.6-1 1-.4.9-.4 1.6" fill="#3e2b00"/></svg>  `,
johns: `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 142.3 53.8"><path d="M82.3 29.7H60c-.5 0-.9.4-.9.9v22.3c0 .5.4.9.9.9h22.3c.5 0 .9-.4.9-.9V30.6c0-.5-.4-.9-.9-.9m-6.9 21.2-1.1-3.3H68l-1.1 3.3H62l6.8-18.2h4.8l6.8 18.2h-4.9ZM23.2 0H.9C.4 0 0 .4 0 .9v22.3c0 .5.4.9.9.9h22.3c.5 0 .9-.4.9-.9V.9c0-.5-.4-.9-.9-.9m-5.5 15.2c0 4.1-2.1 6.1-6.4 6.1s-6.4-2.8-6.4-6.8v-.8h4.5v1.7c0 1.2.7 1.9 1.8 1.9s1.7-.6 1.7-2.4V2.8h4.7v12.4Zm53.4 22.5L69 44.1h4.1zM41.6 6.6c-3.1 0-4.2 2.7-4.2 5.4s1.2 5.4 4.2 5.4 4.2-2.7 4.2-5.4-1.2-5.4-4.2-5.4M82.3 0H60c-.5 0-.9.4-.9.9v22.3c0 .5.4.9.9.9h22.3c.5 0 .9-.4.9-.9V.9c0-.5-.4-.9-.9-.9M79 21.2h-4.7v-7.5h-6.2v7.5h-4.7V3h4.7v6.6h6.2V3H79zm-26.2 8.5H30.5c-.5 0-.9.4-.9.9v22.3c0 .5.4.9.9.9h22.3c.5 0 .9-.4.9-.9V30.6c0-.5-.4-.9-.9-.9m-4.6 21.2H35V32.7h4.7v14.1h8.5zM52.8 0H30.5c-.5 0-.9.4-.9.9v22.3c0 .5.4.9.9.9h22.3c.5 0 .9-.4.9-.9V.9c0-.5-.4-.9-.9-.9M41.6 21.5c-5.7 0-9-4.2-9-9.5s3.2-9.5 9-9.5 9 4.2 9 9.5-3.2 9.5-9 9.5m99.8 8.2h-22.3c-.5 0-.9.4-.9.9v22.3c0 .5.4.9.9.9h22.3c.5 0 .9-.4.9-.9V30.6c0-.5-.4-.9-.9-.9m-3.7 21.2h-14.8V32.7h14.5v3.8h-9.8v3.2h8.9v3.7h-8.9v3.5h10V51ZM111.9 0H89.6c-.5 0-.9.4-.9.9v22.3c0 .5.4.9.9.9h22.3c.5 0 .9-.4.9-.9V.9c0-.5-.4-.9-.9-.9m-3.3 21.2h-4.9L97.4 9.9v11.3h-4.5V3h4.9l6.3 11.2V3h4.5zM12.4 36.4H9.2v4.7h3.2c1.5 0 2.5-.6 2.5-2.3s-1.1-2.4-2.5-2.4m10.8-6.7H.9c-.5 0-.9.4-.9.9v22.3c0 .5.4.9.9.9h22.3c.5 0 .9-.4.9-.9V30.6c0-.5-.4-.9-.9-.9M13.1 44.8H9.2v6.1H4.5V32.7h8.6c3.4 0 6.6 1.6 6.6 5.9s-2.6 6.3-6.6 6.3Zm98.8-15.1H89.6c-.5 0-.9.4-.9.9v22.3c0 .5.4.9.9.9h22.3c.5 0 .9-.4.9-.9V30.6c0-.5-.4-.9-.9-.9M101 47.2c2.2 0 3.5-1.3 3.7-3.4h4.7c-.3 4.7-3.7 7.4-8.3 7.4S92 47 92 41.7s3.6-9.5 9.1-9.5 8.2 2.5 8.3 6.9h-4.7c-.3-1.8-1.7-2.8-3.7-2.8-3.1 0-4.2 2.7-4.2 5.4s1.2 5.4 4.2 5.4ZM141.4 0h-22.3c-.5 0-.9.4-.9.9v22.3c0 .5.4.9.9.9h22.3c.5 0 .9-.4.9-.9V.9c0-.5-.4-.9-.9-.9m-11.1 21.5c-4.2 0-7.9-1.8-7.9-6.5h4.7c.1 2.1 1.4 2.8 3.4 2.8s2.9-.5 2.9-1.9-2.6-1.9-5.2-2.7c-2.6-.7-5.3-1.9-5.3-5.2s4-5.5 7.4-5.5 7.3 1.8 7.3 5.9h-4.7c0-1.7-1.5-2.2-2.9-2.2s-2.3.4-2.3 1.6 2.6 1.7 5.3 2.4c2.6.7 5.3 2 5.3 5.3s-3.9 6.1-7.9 6.1Z" style="fill:#fff"/></svg>
   `,
da: `<svg id="Lager_1" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 131.4 60.6"><defs><style>.st0{fill:#1d1d1b}</style></defs><path d="M59.2 52.6c-.5-.3-.6-.7-.4-1.1.2-.3.6-.5 1.1-.2s.6.6.3 1c-.2.4-.6.5-1 .3m4.6 5.7c-.2 0-.8-.3-1.2-.5.4-.9 1.4-3.8 1.5-4.2.2-.6.4-1.1.5-1.6.2-.6.4-1.4.5-1.7.3.1.7.2 1.2.4 1.4.5 2.2 1.8 1.9 2.8-.4 1.1-1 1.4-1.5 1.4.4.5.9 1.2.6 2-.4 1.2-1.7 2.1-3.4 1.5Zm1.3-3.5c-.1.3-.3.9-.5 1.3-.1.4-.2.7-.4 1.1l.3.1c.6.2 1.1-.1 1.4-.9.2-.7 0-1.4-.9-1.6Zm1-3c-.1.3-.6 1.7-.8 2.1.6.3 1.3.2 1.5-.6.2-.7-.1-1.2-.8-1.5Zm7.5 8.8c-1.1 0-2.2-1.6-1.9-4.5.2-2.8 1-3.9 2.7-3.8 1.3.1 2.5 1.1 2.2 4.2s-2 4.1-3 4Zm.6-7c-.6 0-.9.9-1.1 2.6-.2 2 .1 3.1.8 3.2.5 0 1.2-1.3 1.4-2.9.2-2.4-.4-2.9-1.1-2.9m8.7 6.8h-1.4c0-.6-.5-3.9-.7-4.6-.2-1.2-.5-2.7-.6-3.2.4-.2.9-.3 1.2-.3 2-.3 3.5.4 3.9 3 .5 2.9-.8 4.9-2.4 5.1m-1.2-7c.3 1.9.7 4.4 1 5.8h.1c1-.2 1.4-2 1.1-3.7-.4-2.1-1.2-2.2-2.2-2.1m12.7 3.5c-.3 0-.9.3-1.3.5-.8.3-1.6.6-2.1.8-.2-.6-.8-2.1-1.3-3.4-.6-1.5-1.5-3.3-1.8-4 .4-.2 1.1-.6 1.3-.7.4-.2 1.6-.7 2.1-.9 0 .4.2.9.3 1.2-.4.1-1.2.4-1.6.5-.2 0-.4.2-.5.2.3.7.5 1.2.8 1.9.2 0 .5-.2.7-.3.1 0 .8-.4 1.1-.6.1.3.3.7.5 1.1-.4.2-.8.3-1.1.4-.2 0-.5.2-.7.3.2.7.7 1.7 1.1 2.4.2 0 .4-.2.5-.2s1.2-.5 1.7-.7c0 .3.2.8.3 1.2Zm7.9-5.7c-.2.5-.7 1.1-1 1.2-1.3 1-3 .9-4.8-1.6-2.1-2.7-.7-4.2 1-5.7.3.3.5.5.9.8-.1 0-.3.2-.4.3-1 .8-1.8 1.9-.4 3.8 1.2 1.6 2.3 2 3.1 1.3l.1-.1c-.4-.5-1.2-1.5-1.5-1.8-.2.1-.5.3-.6.4-.3-.4-.4-.6-.7-.9.6-.4 1.3-.8 1.8-1.2.4.5 1.5 2.3 2.5 3.5m6.2-5.9c-.4-.2-1.1-.5-1.5-.8s-.1 0-.2-.1c-.2.2-.8 1-.9 1.2.2.3 1 1.1 1.2 1.4-.4.2-.9.5-1.2.7-.3-.4-2.6-3.3-4.4-5.2s-.7-.7-.8-.9c.2-.3.6-.9.7-1.1.4.2 7.1 3.3 7.6 3.5-.2.3-.4.9-.6 1.2Zm-5.6-2.8c.4.5 1.9 2 2.1 2.3.1-.2.5-.7.6-.9-.4-.2-2.2-1.2-2.8-1.4Zm6-4.5c-.3.5-.7.6-1.1.5-.3-.2-.5-.6-.3-1.1s.6-.6 1-.4.5.6.3 1Z" style="fill:#855e21"/><path class="st0" d="M29.5 18c0 .1 0 .4-.1.5-1 3.2-6.9 15-16.3 16.2-6 .7-12.5-2.8-13-7.2C-1.2 17 18.7 2 34.2.1 40.6-.7 45.5 1.6 46.1 7c.3 2.1-.3 5.1-1.6 9.1C52.8 8.5 58.6 2.5 63.9 1.9c2.1-.3 5.9 1.7 6.1 3.5.7 6-12.6 22-11.3 32.3.4 3.4 2.2 4.4 4.2 4.2.2 0 .5 0 .6.3 0 .2-.4.4-.9.5-2.5.3-8.1-1.1-8.7-5.8-1.3-10.8 12-27.8 11.4-32.6 0-.8-.7-1.1-1.6-1-5.1.6-11.9 7.9-20.3 15.9-5.9 13.5-9.7 23.9-14.9 24.5-1.8.2-4.4-.6-4.6-2.3-.3-2.6 5.9-10.9 13.3-19.1 2.6-6.9 4.3-13 3.9-16.6-.4-3.3-1.8-5.2-7-4.6C19.8 2.8 3.2 18 4.6 29.1c.4 3.3 2.6 4.8 5.7 4.4 11.4-1.4 16.9-12.3 18.1-15.1.2-.5.3-.7.6-.8.3 0 .4.2.4.4Zm-3.7 23.7c.9-.1 5.7-6.9 9.3-14.9-5.2 6-10.1 12.9-9.9 14.5s.2.4.6.3Z"/><path class="st0" d="M74.5 20.9c.1 1.1-6.4 9.6-6.1 11.8 0 .7.5.7.8.7 4-.5 10.5-7.5 10.5-7.5s.2-.3.4-.3c.1 0 .3.1.3.2s-.5.6-.6.8c0 0-7.1 7.7-11.3 8.2-1 .1-3.7-.9-3.9-2.8-.3-2.6 4.5-9.6 5.4-12.5.2-.4.4-.9 1.1-1 1.6-.2 3.3 1.2 3.4 2.3Zm5.1-10.7c0 .4-.6 1.8-1.1 2.1-.4.2-1.4.7-2 .9-1.2.5-1.4 1.2-1.8 1.2s-.7-.3-.7-.5c-.2-1.4 1.9-4.6 1.8-6s.2-.5.5-.5c1.2-.2 3.3 1.8 3.4 2.7Z"/><path class="st0" d="M81.4 34.2c-3.3.4-5.8-2.9-6-4.5 0-.4.2-.9.9-1 1.2-.1 3.3.2 6.6-.1.1-.6.2-1.3.1-2-.1-1.2-.3-2.2-.8-3-1.3 1.7-1.8 2.2-2.6 3s-.2.2-.3.2-.3 0-.3-.2.2-.4.5-.7c0 0 .9-.9 2.3-2.9-.4-.7-.9-1.4-1-2.4-.3-2.1 2.6-4.9 4.2-5.1 1-.1 2.8 1.2 2.9 2.1s-3.9 3.1-3.7 4.7c.3 2.5 2.3 2.9 2.9 5.5 1.8-.5 4-1.5 5.7-3.5 0 0 .2-.3.4-.3.1 0 .3.1.3.2s-.4.6-.6.8c-1.7 1.9-3.5 2.8-5.6 3.5.3 2.4-2.8 5.3-5.9 5.7m1.3-4.9c-2.4.1-4.8 0-5.6 0-.2 0-.3 0-.3.3s.8 1.7 2.9 1.5c.8-.1 2.2-.3 3-1.9Z"/><path class="st0" d="M94.7 32.5c-3.3.4-5.8-2.9-6-4.5 0-.4.2-.9.9-1 1.2-.1 3.3.2 6.6-.1.1-.6.2-1.3.1-2-.1-1.2-.3-2.2-.8-3-1.3 1.7-1.8 2.2-2.6 3s-.2.2-.3.2-.3 0-.3-.2.2-.4.5-.7c0 0 .9-.9 2.3-2.9-.4-.7-.9-1.4-1-2.4-.3-2.1 2.6-4.9 4.2-5.1 1-.1 2.8 1.2 2.9 2.1s-3.9 3.1-3.7 4.7c.3 2.5 2.3 2.9 2.9 5.5 1.8-.5 4-1.5 5.7-3.5 0 0 .2-.3.4-.3s.3.1.3.2-.4.6-.6.8c-1.7 1.9-3.5 2.8-5.6 3.5.3 2.4-2.8 5.3-5.9 5.6Zm1.2-4.8c-2.4.1-4.8 0-5.6 0-.2 0-.3 0-.3.3s.8 1.7 2.9 1.5c.8-.1 2.2-.3 3-1.9Z"/><path class="st0" d="M121.6 20.6c.2 0 .3.1.3.2s-.4.6-.6.8c0 0-5.7 7-10.7 7.6-3.4.4-5.7-1.2-6.1-4.2-.6-5.2 4.7-11.4 7.9-11.8 2-.2 3.2 1.7 3.3 2.4.2 1.4-3 4.8-6.4 7.2v2c.2 1.8 1.2 3 2.7 2.8 3.4-.4 9.1-6.8 9.1-6.8s.2-.3.4-.3Zm-7.6-4.7c0-.2-.1-.4-.4-.4-1 .1-2.9 2.1-4.4 6.4 2.5-2.1 4.9-5 4.7-6Z"/><path class="st0" d="M123.8 18.5c-1.4 1.8-2.5 3-2.5 3-.1.1-.2.3-.3.3s-.3 0-.3-.2.2-.4.5-.8c0 0 .9-1 2.3-2.8-.4-.7-1-1.5-1.2-2.4-.3-2.1 2.6-5 4.3-5.2 1.1-.1 2.9 1.2 3 2 0 .8-4 3.2-3.8 4.7.2 2 1.7 2.7 2.5 4.6 2.1 0 3 .6 3.1.8 0 .3-.4.7-.7.7-.2 0-.8-.5-2.1-.7 0 .3.2.5.2.9.3 2.5-2.7 5.3-5.8 5.6-3.4.4-6.4-2-6.6-3.5 0-.5.4-.9 1-1.2 1-.5 4.4-1.7 7.2-2.3v-.6c-.2-1.4-.3-2.2-.8-3Zm-6 7.1c0 .4 1.3.8 3.4.5s3-1.7 3.3-3.4c-3.3.8-5.3 1.9-6.2 2.3-.4.2-.5.4-.5.5ZM29.5 18c0 .1 0 .4-.1.5-1 3.2-6.9 15-16.3 16.2-6 .7-12.5-2.8-13-7.2C-1.2 17 18.7 2 34.2.1 40.6-.7 45.5 1.6 46.1 7c.3 2.1-.3 5.1-1.6 9.1C52.8 8.5 58.6 2.5 63.9 1.9c2.1-.3 5.9 1.7 6.1 3.5.7 6-12.6 22-11.3 32.3.4 3.4 2.2 4.4 4.2 4.2.2 0 .5 0 .6.3 0 .2-.4.4-.9.5-2.5.3-8.1-1.1-8.7-5.8-1.3-10.8 12-27.8 11.4-32.6 0-.8-.7-1.1-1.6-1-5.1.6-11.9 7.9-20.3 15.9-5.9 13.5-9.7 23.9-14.9 24.5-1.8.2-4.4-.6-4.6-2.3-.3-2.6 5.9-10.9 13.3-19.1 2.6-6.9 4.3-13 3.9-16.6-.4-3.3-1.8-5.2-7-4.6C19.8 2.8 3.2 18 4.6 29.1c.4 3.3 2.6 4.8 5.7 4.4 11.4-1.4 16.9-12.3 18.1-15.1.2-.5.3-.7.6-.8.3 0 .4.2.4.4Zm-3.7 23.7c.9-.1 5.7-6.9 9.3-14.9-5.2 6-10.1 12.9-9.9 14.5s.2.4.6.3ZM74 14c0 .2.3.5.7.5.3 0 .6-.7 1.8-1.2.6-.2 1.6-.7 2-.9.5-.3 1.2-1.7 1.1-2.1-.1-.9-2.1-2.9-3.4-2.7-.3 0-.5.5-.5.5.2 1.4-2 4.5-1.8 6Z"/><path class="st0" d="M128.3 21.8c-.8-1.8-2.2-2.6-2.5-4.6-.2-1.6 3.9-4 3.8-4.7 0-.8-1.8-2.2-3-2-1.7.2-4.6 3.1-4.3 5.2.1 1 .7 1.7 1.2 2.4-1.4 1.8-2.3 2.9-2.4 2.9-.3.4-1.7 1.9-3.4 3.4-.1 0-.2 0-.3.1-.5.3-.9.5-1 .9-1.5 1.2-3.1 2.2-4.4 2.3-1.5.2-2.5-1-2.7-2.8 0-.4-.1-1.7 0-2 3.3-2.5 6.5-5.8 6.4-7.2 0-.6-1.3-2.6-3.3-2.4-3 .4-8 6-7.9 11-1.3 1-2.8 1.6-4 2-.6-2.6-2.6-3-2.9-5.5-.2-1.6 3.8-3.8 3.7-4.7s-1.9-2.2-2.9-2.1c-1.6.2-4.4 3-4.2 5.1.1 1 .6 1.7 1 2.4-1.2 1.7-2 2.6-2.2 2.8v.1c-1.7 1.9-3.9 2.9-5.6 3.4-.6-2.6-2.6-3-2.9-5.5-.2-1.6 3.8-3.8 3.7-4.7s-1.9-2.2-2.9-2.1c-1.6.2-4.4 3-4.2 5.1.1 1 .6 1.7 1 2.4-1.3 1.9-2.3 2.9-2.3 2.9-.2.2-1.3 1.4-2.7 2.7h-.5c-.8 0-1 .6-.9 1v.2c-2 1.7-4.4 3.3-6.3 3.6-.3 0-.7 0-.8-.7-.3-2.2 6.3-10.7 6.1-11.8-.1-1.1-1.9-2.5-3.4-2.3-.7 0-1 .6-1.1 1-.9 2.9-5.7 9.9-5.4 12.5.2 1.9 2.9 2.9 3.9 2.8 2.1-.3 5-2.3 7.3-4.3.7 1.7 3 4 5.8 3.6 3.1-.4 6.2-3.3 5.9-5.7.5-.1.9-.3 1.3-.5.2 1.6 2.7 4.9 6 4.5 3.1-.4 6.2-3.3 5.9-5.6 1.4-.4 2.7-1 3.9-1.9.4 3 2.7 4.6 6.1 4.2 2-.2 4.2-1.6 6-3 .7 1.5 3.4 3.3 6.4 2.9 3.1-.4 6.1-3.1 5.8-5.6 0-.3-.1-.6-.2-.9 1.3.3 1.9.8 2.1.7.3 0 .7-.4.7-.7 0-.2-.9-.8-3.1-.8Zm-48.6 9.4c-2.1.3-2.8-1.2-2.9-1.5 0-.2 0-.3.3-.3h5.6c-.8 1.6-2.2 1.8-3 1.9Zm3.2-2.6c-2.2.2-4 .1-5.2 0l2-2c.1-.1.3-.4.5-.5.5-.6 1.1-1.2 2.1-2.5.4.8.6 1.7.8 3 0 .8 0 1.4-.1 2Zm10 1c-2.1.3-2.8-1.2-2.9-1.5 0-.2 0-.3.3-.3h5.6c-.8 1.6-2.2 1.8-3 1.9Zm3.3-2.6c-2.5.2-4.3 0-5.5 0 .8-.5 1.6-1.2 2.3-2l.1-.1c.7-.8 1.2-1.3 2.5-2.9.4.8.6 1.7.8 3 0 .8 0 1.4-.1 2Zm17.4-11.5c.3 0 .4.2.4.4.1 1-2.2 4-4.7 6 1.5-4.3 3.4-6.3 4.4-6.4Zm7.6 10.6c-2.1.3-3.4-.1-3.4-.5 0-.2 0-.3.5-.5 1-.5 3-1.6 6.2-2.3-.3 1.7-1.1 3.1-3.3 3.4Zm3.4-4c-1.7.4-3.7 1-5.2 1.5 1.2-1.2 1.9-2.1 1.9-2.1s.1-.2.2-.3c.4-.5 1.3-1.5 2.3-2.7.4.8.6 1.5.8 3z"/></svg>`,
surfcenter: `<svg baseProfile="tiny" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 170.1 58" overflow="visible" xml:space="preserve"><g fill="#fff"><path d="m10.5 19.1.7.5.7 1.8.5.6.1 1.2-.6.8-.9.1-1.1-.1-.3-.8h-.2L9 24.3l-.3.5-.3 1.5.3 1.2-.1 1.5.8.3.9 2.8 1.1 2.4-.4 1.3v2.3l-1.9 3.6-.9.9-.8 2-.5.4-.6.2-.6.7-1.3.9V48l-1.1 1-.7 1-.5.1-.8-.4-.5.3-.8-.5.1-.8 1.5-2.1v-.4l.6-.6 1.3-.4.9-1.3 1.8-1.3.3-1.4.4-1.5-.1-1.1v-1.8l.2-1.2V35l-.6-.8-1.3-2.8-.4-1.3-.4-.6L4 26l.5-1.5-.4-.5.1-1.3 3.5-3.5.5-.1 1-.1.1-.1zm8.9 3.7.2.7-.3.8-.4 1.1v1.1l-.4.9-.3 1.4-.2 1v.8l.6.5.5.1.7.2.7-.3.7-.9.6-1.1.2-1.1.2-.8-.2-.6.3-.9.1-.8.1-1.4.4-.6H24l1.9.6.6.6.5 1.5-.1 1.1.2.8-.1 1-.2.9-.1 1 .4.9.6.4.6-.6.6-.1 2-1 .6.1.3.4-.4 1.4-.5.6-1.4.8-.9.4-1 .8-.9.3-.9.4-.9-.1-.9.1-1-.5-.3-.6-.7-.9-.4.6-.6.8-.9.7-.9.4-1.2-.1-1.5-.5-.6-.6-.4-.5-.7-.4-.3-.6-.3-.8-.1-.8-.1-1.1.3-1.1-.2-.7.1-.7v-.7l.3-.8v-1.8l.5-.9.9-.8 1.8-.3z"/><path d="m35.4 18.6.8.2.6.4.4.4.6.8.1 1.2.6.4.1 1 .2 1.1 1.8.1.4-.3 1.5.4 1.1.5.8.8.5 1 .6.8.6 1.2.1.9-.1.9-.1 1.1.2.9.4 1 1.1.7 1.1.1 1.2-.5.9-.4.8-.3.3.3v.8l-.4.9-.1.8-.8.5-.7.2-1 .1-1.4.3-1.8-.3-1.1-.2-.8-.4h-.4l-.8-1.3-.7-1.1-.4-1.1-.4-1.5.2-1.3.1-1.1-.5-.7-.7-.9-.9-.3h-.8l-.3.9L38 29l-.4.7-.1.8-.4.9-.4.8-.6.6-.5.6-.8.9-.3.4-.6.4-.6.1-.9.8-.8-.3-.4-1.1.4-.8.5-.4.6-.1.6-.5.7-.9.8-1.8.8-1.1.4-1.7-.2-.9-.8-.4-.8-.8-.8-1-.4-.6-.1-1.2.1-1 .5-1.5.7-.7.6-.4zm-.5 2.9-.1.6.2.6.4.7.4.3.8.1-.2-1.2-.4-.8-.2-.3-.6-.2zM64 0l.1.1 1.1.2 1.4.6 1.1 1 .3 1.6V4l.4.7-.6 5.9-.3 1.2-.5.5-.1 1.3-.5.6-.7 2.6-.1.6-.9.9-.4 1.1-1 1.8-.4.6-.6.8-.2.5-2.8 2.5-.4.5v.3l1.7.8h.6l5.1 3.7.2.4.8.9 1.1 1.8-.1 1.1.4 1.4.4 2 .1 1.4.4.9v1.3l.8 1.8.4 2.8v1.6l-.5 1.8v2.5l-.9 1.9-.3 1.5-.6.6-.9 1.1-1 .3-1.3-.1-1.5-.6-1.1.1-.8-.8-.8-.5-1-1.1-1.3-2-.8-1.1-.6-1.5-.8-.8-1.3-3.6-.6-1.4-.4-2.8v-.9l-.4-1.4v-1l-.5-5.2-.1-.8.5-1.8.1-1.3-.1-.8-.7-.6-.8.3-.2-.3-1.1-.2v-.6l.7-.1.8-.7.7-.3.9-.8.3-4.7.3-.4-.3-1.1.6-2.3.1-1 .6-3 .3-.8.1-1.4.5-1.6.9-.6-.2-.6L59 4.6l1-1.3.9-.4.8-1.4L63.5 0zm-5.9 31.3.3 2-.4 2.5v5.3l-.3.5.4 1.7.5 4 1.1 2.4.3 1.3.6.5 1.5 1.9 2.5 1.5.6.1 1.2-.4.5-1.3.2-3.3-.7-1.3-.1-4-.8-1.5-.3-.6v-.9l-.5-1.4-.3-1.4.1-.3-.3-1.3v-.6l-.5-.2-.3-.8-.8-.9-.2-.8-1.1-.3-.4-.7-.1-1-1.4-1.4-.9-1.4-.4-.2zm5-26.7-1.7 1.5-.6 1.4-.8 1.4-1 2.9-.1 1.2.3 2.6-.4 1.3-.3 2.5v.8l-.2 3.4h.2l3-2.6.7-1.6.5-.4-.3-.6.2-.9.8-.5.8-1.6v-.9l.6-1.2.1-2.6.1-1.6V8l.1-.8V6l-.1-.4-.3-1.4-.6-.2zm15.5 16 .6.3h.5l1.3.6 1 1.3.5 1 .1 1.3-.4 1.4-.6 1.8-.9.9-1.3.6-.8.2-.6-.2h-1l-.6-.5-.5-1.2-.2-1.1.4-1 .6-.4.5-.3.7.1.6.4.3.7.1.8.8.1.3-.6.1-1.1-.3-1.2-.4-.6-1.4-.6-.6.1-1.3.3-1.1 1.2-.3.5-.4 1.1-.1.9.4.6-.2 1 .9 2.4 1.3.8.8 1 2 .3 1.8.5 1.7-.2 1.7.4 2.1-.6.6-.4.9.1.4.5-.1.6-2.2 1.4-1 .4h-1.1l-.6.4-.9.4-.7.3-2.8.3-1.8-.3-.8-.3-.8.1-.4-.4-2.8-1.6-1.9-2.1-.5-1.6.1-3.4.6-2.1 1.4-2.7.6-.8h.1l1.7-1.4 2.1-.4zm16.6-.5 2.3.5 1.3.9.3.8.4 1.1.2 1.1.1.9-.3 1.1-.4.4-.4.7-.9.9-1.1.7-.8.2-.9.4-.7.2.4.9v.8l.3.9.6.6.9.8.8.3h.4l.6.3.8-.1.6.3.9.2 1.1-.3 1-.4h.8l1.1-.6.9-.3.8.1.4.4-.1.5-.4.7-.4.4-.5.8-.6.6-1 .4-.8.6-1 .4-.8.1-.9.3-1-.1-1.1-.7-.8.3h-.7l-.9-.1-1.2-.3-1.5-1.4-.8-.3-1-1.2-.2-.2-.6-.7-.3-.8-.3-.9-.8-1-.2-1.3-.4-.4-.3-.6-.1-.8.1-.6.1-.4-.1-1 .3-1.1.5-.7.4-.9.6-.4.5-.3v-.6l.1-.3.8-.6.6-.6 1.4-.4zm-.9 2.7-.4.6-.4.9.2.5-.4.8-.1 1.1.5 1.1 1.3-.4.5-.7.9-.3.4-1 .5-1V23l-.3-.6h-2z"/><path d="m108.4 22.5.6.4 1.4.4.2.5-.2.8.1 1.6.6-1.2.7-.6 1.1-.1.9.5.8.8.3 1.1.8 1 .2.7.4.8.1.8.6.7.4.7.6.7.8.3 1.1.1.7.3.6-.3.8-.2.6.3.1.7-.5.9-.5.4-.6.3-.8.4-1.3.3-1.3-.3-1.6-.4-1.1-.8-.9-.8-.1-.5-.4-.6-.3-.6-.6-.6-.6-1.3-.6-.2h-.6l-.3 1.3.1.9-.2 1.3.1 1.1v1.3l-.8.6h-1.6l-.8.1-.7-.4-.4-.6-.1-1.4v-.9l-.3-1.1.1-1.2-.3-.9-.1-1.1.3-.8v-.9l.3-1.6-.1-.9.1-.8.8-.6h1.4zM128 11.9l.1.3.6-.3h.8l.5.4.6 1-.1.9-.3 1.1.1 1-.3.6-.1.8.1.1.9-.3.6.3h.8l.5-.3h1.6l2.3-1.4h1l.3.2.1.7-.4.6-3 2.3-1-.1-1.1.5-1.1.4h-.6l-1.1-.3-.4.9v.6l-.9 2.8-.1.8-.6 1.8v1.8l.2.8-.6.9-.1.6.5.3 2.4-1.1 1.5.2.6.6-.1.3-2.6 2-.9 1-.3.9-1.8.9-.8 1.1-.7-.1-.6-.4-1-2.8v-2l.4-2.2.1-1.5-.3-1.1v-1.2l.8-1.6.5-2.6.1-.4v-2l-1.5-.4v-.9l.8-1.6.4-.6h1.8l.2-1.5.6-1.4-.1-.6.2-1h.5zm13.8 8.2 2.3.5 1.3.9.3.8.4 1.1.2 1.1.1.9-.3 1.1-.4.4-.4.7-.9.9-1.1.7-.8.2-.8.5-.8.2.4.9v.8l.3.9.6.6.9.8.8.3h.4l.6.3.8-.1.6.3.9.2 1.1-.3 1-.4h.8l1.1-.6.9-.3.8.1.4.4-.1.5-.4.7-.4.4-.5.8-.6.6-1 .4-.8.6-1 .4-.8.1-.9.3-1-.1-1.1-.7-.8.3h-.9l-.9-.1-1.2-.3-1.3-1.1-.8-.3-1-1.2-.3-.2-.6-.7-.3-.8-.3-.9-.8-1.1-.2-1.3-.4-.4-.3-.7-.1-.8.1-.6.1-.4-.1-1 .3-1.1.5-.7.4-.9.6-.4.5-.3v-.6l.1-.4.8-.6.6-.6 1.4-.4zm-.9 2.7-.4.6-.4.9.2.5-.4.8-.1 1.1.5 1.1 1.3-.4.5-.7.9-.3.4-1 .5-1V23l-.3-.6-1.8-.1z"/><path d="m153.6 18.2.8.2.6.4.4.4.6.8.1 1.2.6.4.1 1 .2 1.1 1.8.1.4-.3 1.5.4 1.1.5.8.8.5 1 .6.8.6 1.2.1.9-.1.9-.1 1.1.2.9.4 1 1.1.7 1.1.1 1.2-.5.9-.4.8-.3.3.3v.8l-.3.6-.1.8-.8.5-.8.2-.9.1-1.4.3-1.8-.3-1.1-.2-.9-.4h-.4l-.8-1.3-.7-1.1-.4-1.1-.4-1.4.2-1.3.1-1.1-.6-.8-.6-.9-.9-.3h-.8l-.3.9-.3 1.4-.4.7-.1.8-.4.9-.4.8-.6.6-.5.6-.8.9-.3.4-.6.4-.6.1-.9.6-.8-.3-.4-1.1.4-.8.5-.4.6-.1.6-.5.7-.9.8-1.8.8-1.1.4-1.7-.2-.9-.8-.4-.8-.8-.8-1-.3-.6-.1-1.2.1-1 .5-1.5.7-.7.6-.4zm-.5 2.8-.1.6.2.6.4.7.4.3.8.1-.2-1.2-.4-.8-.2-.3-.6-.2z"/></g></svg>`,
livs: `<svg baseProfile="tiny" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 236.4 50.8" overflow="visible" xml:space="preserve"><path fill="#2c384b" d="M7.4.6h4.9l7.4 20.8H15l-1.4-4.3H6l-1.4 4.3H0zm-.3 13h5.3L9.8 5.4zm29.3-1.2c-1.2 1-3 1.5-5.2 1.5h-4.3v7.5h-4.3V.6h8.9c2.1 0 3.7.5 4.9 1.6s1.8 2.7 1.8 5c0 2.5-.6 4.2-1.8 5.2M33 4.9c-.6-.5-1.3-.7-2.3-.7h-3.9v6.1h3.9c1 0 1.8-.2 2.3-.7.6-.5.8-1.3.8-2.4s-.2-1.8-.8-2.3m23.8-.6H46.1v4.4H56v3.6h-9.9v5.4h11.3v3.7H41.8V.6h15zM61 .6h4.4v17.1h10.4v3.7H61zm29.8 0h4.5l-7.1 20.8h-4.1L77.1.6h4.6l4.5 15.8zm11.1 20.8h-4.3V.6h4.3zM106.1.6h4.3v8.6l8-8.6h5.6l-8.5 8.6 9 12.3h-5.6l-6.4-9.1-2.1 2.1v7h-4.3zm36 3.7h-10.8v4.4h9.9v3.6h-9.9v5.4h11.3v3.7H127V.6h15v3.7zm4-3.7h4.6l8.3 14.5V.6h4.1v20.8h-4.4l-8.5-14.8v14.8h-4.1zm29 0h4.4v17.1h10.4v3.7h-14.7V.6zm21.7 20.8h-4.3V.6h4.3zM213 .6h4.5l-7.1 20.8h-4.1l-7-20.8h4.6l4.5 15.8zM223.3 15c.1 1 .4 1.7.8 2.1.7.9 2 1.3 3.7 1.3 1 0 1.9-.1 2.6-.3 1.2-.4 1.9-1.2 1.9-2.4 0-.7-.3-1.2-.9-1.6s-1.6-.7-2.9-1l-2.3-.5c-2.2-.5-3.7-1-4.6-1.6q-2.1-1.5-2.1-4.5c0-1.9.7-3.4 2.1-4.6s3.4-1.9 6-1.9c2.2 0 4.1.6 5.7 1.7 1.6 1.2 2.4 2.9 2.5 5.1h-4.2c-.1-1.3-.6-2.1-1.7-2.7-.7-.3-1.6-.5-2.6-.5-1.1 0-2.1.2-2.8.7s-1 1.1-1 1.9c0 .7.3 1.3 1 1.7.4.2 1.4.5 2.8.9l3.7.9q2.4.6 3.6 1.5c1.2 1 1.9 2.4 1.9 4.3s-.7 3.5-2.2 4.7c-1.5 1.3-3.5 1.9-6.2 1.9s-4.9-.6-6.5-1.9q-2.4-1.8-2.4-5.1h4.1zM1.4 43.1c.5-.7 1.4-1.5 2.5-2.2l.4-.2c-.5-.6-.9-1.1-1.2-1.7s-.4-1.2-.4-1.8c0-1.3.4-2.3 1.3-3s2-1.1 3.3-1.1c1.2 0 2.3.4 3.1 1.1s1.2 1.7 1.2 2.8c0 1-.2 1.9-.7 2.5q-.75.9-2.1 1.8l2.5 3c.3-.4.5-.9.7-1.3.2-.5.2-1 .2-1.5h3c-.1 1.1-.3 2.1-.8 3.2-.3.6-.7 1.3-1.2 2l3.1 3.8h-4.1L11 48.9c-.6.5-1.1.9-1.6 1.2-.9.5-1.9.7-3.1.7-1.8 0-3.2-.5-4.2-1.6S.6 47 .6 45.7c0-.9.2-1.8.8-2.6m3.2 4.2c.5.4 1.1.7 1.9.7.6 0 1.1-.1 1.6-.4s.9-.5 1.2-.8l-3.2-4c-.8.6-1.4 1-1.7 1.5-.3.4-.4.9-.4 1.4-.1.6.2 1.1.6 1.6M6.1 38c.1.2.5.6 1 1.2.5-.3.8-.6 1-.8.4-.4.6-.9.6-1.4 0-.4-.1-.7-.4-1-.2-.3-.6-.4-1.1-.4-.3 0-.6.1-.9.2-.3.3-.5.7-.5 1.2 0 .3.1.6.3 1m21.7 7c.1.8.3 1.4.7 1.8.6.7 1.6 1.1 3.1 1.1q1.35 0 2.1-.3c1-.4 1.6-1 1.6-2 0-.6-.3-1-.8-1.3s-1.3-.6-2.4-.8l-1.9-.5c-1.8-.4-3.1-.9-3.8-1.3-1.2-.8-1.8-2.1-1.8-3.8 0-1.6.6-2.8 1.7-3.9 1.1-1 2.8-1.5 5-1.5 1.9 0 3.4.5 4.7 1.5q1.95 1.5 2.1 4.2h-3.5c-.1-1-.5-1.8-1.4-2.2-.6-.3-1.3-.4-2.2-.4-1 0-1.7.2-2.3.6-.4.3-.7.8-.7 1.5 0 .6.3 1.1.8 1.4.4.2 1.1.4 2.3.7l3 .7c1.3.3 2.3.7 3 1.3 1 .8 1.6 2 1.6 3.5 0 1.6-.6 2.9-1.8 4-1.2 1-3 1.6-5.2 1.6q-3.45 0-5.4-1.5c-1.3-1-2-2.5-2-4.3h3.5zm26.1-12v3.1h-5.2v14.3h-3.6V36.1h-5.2V33zm13.3.5c.6.3 1.2.7 1.6 1.2q.6.6.9 1.5.3.75.3 1.8 0 1.2-.6 2.4c-.4.8-1.1 1.4-2.1 1.7.8.3 1.4.8 1.7 1.4s.5 1.5.5 2.7v1.2c0 .8 0 1.3.1 1.6.1.4.3.8.7 1v.4h-4c-.1-.4-.2-.7-.2-.9-.1-.5-.1-1-.2-1.5v-1.6c0-1.1-.2-1.8-.6-2.2q-.6-.6-2.1-.6h-3.5v6.8h-3.5V33h8.3c1.1 0 2 .2 2.7.5M59.7 36v4.7h3.9c.8 0 1.4-.1 1.7-.3.7-.3 1-1 1-2 0-1.1-.3-1.8-1-2.1-.3-.2-.9-.3-1.6-.3zm18.7-3h4.1l6.1 17.4h-3.9l-1.1-3.6h-6.4L76 50.4h-3.8zm-.2 10.8h4.4L80.4 37zM90.8 33h3.8l6.9 12.1V33h3.4v17.4h-3.6l-7.1-12.3v12.3h-3.4zm27.6.4c1.2.4 2.2 1.1 3 2.2.6.9 1 1.8 1.2 2.8s.3 2 .3 2.9c0 2.3-.5 4.3-1.4 5.9-1.3 2.2-3.2 3.2-5.8 3.2h-7.5V33h7.5c1.1 0 2 .2 2.7.4m-6.6 2.6v11.3h3.3c1.7 0 2.9-.8 3.6-2.5q.6-1.35.6-3.3c0-1.8-.3-3.1-.8-4.1-.6-.9-1.7-1.4-3.3-1.4zm15.5-1.2c1.4-1.4 3.2-2.1 5.3-2.1 2.9 0 5 1 6.3 2.9.7 1.1 1.1 2.2 1.2 3.2h-3.6c-.2-.8-.5-1.5-.9-1.9-.6-.8-1.6-1.1-2.9-1.1s-2.3.5-3.1 1.6c-.7 1.1-1.1 2.6-1.1 4.5s.4 3.4 1.2 4.4q1.2 1.5 3 1.5c1.2 0 2.2-.4 2.8-1.2.4-.4.7-1.1.9-2h3.6c-.3 1.9-1.1 3.4-2.4 4.6s-2.9 1.8-4.9 1.8c-2.5 0-4.4-.8-5.8-2.4q-2.1-2.4-2.1-6.6c.1-3.2.9-5.5 2.5-7.2m20.8-1.8h4.1l6.1 17.4h-3.9l-1.1-3.6h-6.4l-1.2 3.6h-3.8zm-.3 10.8h4.4L150 37zM160.5 33h12.4v3h-8.8v4h7.7v3h-7.7v7.3h-3.6zm27.4 3.1h-9v3.7h8.2v3h-8.2v4.5h9.4v3.1h-13V33h12.5v3.1z"/></svg>`,
tba: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" version="1.1" id="svg5"><defs id="defs2"/><g id="layer1"><g id="g17" transform="matrix(0.13333333,0,0,-0.13333333,206.40732,736.76249)"><path d="m 4204.2212,1185.1572 6.4514,-9.282 7.0252,26.9661 h -30.1662 z m 4446.363,-719.43887 433.3692,1682.05647 c 8.3894,32.3593 13.9866,60.8554 17.6076,85.4117 H 8646.0835 L 8378.2208,1202.8413 H 7349.431 l -191.58,-737.12297 h 886.6538 z M 6745.5064,-1798.8685 c 0,0 -419.6758,0 -665.5195,0 h -346.7845 c -500.727,0 -1126.913,54.6453 -1527.9867,480.7466 l -30.74,32.6665 -25.7293,36.7605 c -66.3888,94.7675 -116.8401,195.6461 -154.1082,300.64404 -143.5639,-193.68504 -317.0518,-356.82384 -519.737,-488.32634 -370.6907,-240.5254 -824.1665,-362.4913 -1347.8305,-362.4913 h -3614.8781 l 533.02634,2049.04972 h 450.30488 l -15.33433,16.11587 -27.65197,40.07296 c -210.83618,305.57692 -270.58608,688.87727 -177.6023,1139.25485 l 1.06076,5.1638 1.16153,5.1509 c 30.57425,136.3475 54.71999,244.0331 97.22183,366.8657 l 1.17044,3.3404 c 20.73901,58.8663 50.39782,138.056 95.9889,228.7843 l 10.15019,19.9409 c 21.75902,42.6995 48.79268,95.79 84.34316,154.0954 30.71968,50.5406 78.41192,126.275 140.24896,204.7889 105.39454,137.4439 226.952085,257.4332 371.38297,366.6234 126.13482,96.3255 267.70973,179.3911 420.86164,246.9273 v 0 c 62.39797,27.6419 119.44102,47.1237 169.75217,64.2978 10.59517,3.621 21.29239,7.2675 32.05326,11.0287 169.39522,60.2815 310.07767,82.7342 412.94387,99.1561 10.5314,1.683 37.4592,6.0179 37.4592,6.0179 49.0361,7.5224 104.1795,13.0431 163.9255,16.3836 l 29.5033,1.7085 c 57.5276,3.3659 122.7305,7.1782 197.598,7.1782 17.9263,0 37.1786,-0.2804 56.6861,-0.6121 12.8773,-0.2167 25.9333,-0.4717 38.4537,-0.4717 H 4750.5418 L 5105.703,4617.431 H 8237.1685 L 7882.2878,3251.9929 h 590.7668 l 353.8225,1365.3999 1643.7179,0.1403 c 458.333,0 1117.643,-54.5441 1550.374,-526.2396 l 24.735,-27.0297 21.42,-29.7838 c 306.38,-425.1583 363.372,-1011.7559 174.547,-1793.3122 l -2.296,-8.8866 -454.533,-1766.21862 h 936.99 l -588.79,-2264.93108 H 6745.5064" style="fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:1.27499" id="path19"/><path d="m 3510.6519,1397.0351 c 213.8542,-66.8733 387.9541,-170.887 520.7062,-311.5313 l 21.7895,-23.09 18.1304,-26.0609 c 97.473,-140.00661 157.1935,-300.23464 179.0213,-479.46001 l 218.4441,840.06561 z M 8801.0458,271.60106 9271.9379,2099.3379 c 52.6827,203.2462 21.3435,303.8175 8.7465,322.5216 -11.6279,2.4353 -32.8055,5.4442 -66.4397,5.4442 H 8495.9661 L 8228.1162,1396.9585 H 7199.301 L 6967.4695,504.86053 C 6934.715,379.41424 6933.7333,316.82497 6935.3524,293.04639 l 2.7413,-3.73573 3.5827,-6.75744 c 16.9319,-3.69747 62.959,-10.95216 163.186,-10.95216 h 970.5482 z M 6745.5064,-1604.7358 c 0,0 -416.3098,0 -665.5195,0 h -346.7845 c -309.9885,0 -561.1106,25.5341 -767.7354,78.0931 -263.0816,66.8961 -465.5246,178.6223 -618.8931,341.5825 l -21.1394,22.4374 -17.6841,25.2703 c -158.443,226.23556 -211.2276,500.27943 -207.8361,782.32131 C 3779.5347,-1163.9985 3089.5354,-1604.7358 2127.0707,-1604.7358 H -1236.7235 L -804.69689,56.051196 H 188.20563 C -30.671964,118.33447 -209.23436,221.46844 -345.59585,364.7901 l -23.06832,24.27581 -19.02545,27.55254 c -179.56958,260.27649 -229.11954,593.27845 -147.2665,989.76225 l 1.53385,7.089 c 29.24066,130.3805 52.32436,233.3614 91.25612,345.8538 l 0.79694,2.2951 c 18.84173,53.4475 45.6714,125.1785 86.36146,206.1658 l 9.68101,18.9974 c 21.44654,42.1129 45.7657,89.8486 77.77441,142.2252 44.67439,73.5159 84.16209,131.2092 127.06553,185.5748 94.910219,123.9674 204.737889,232.3543 335.59013,331.2298 114.34119,87.3623 243.14074,162.8545 382.85412,224.3855 53.76635,23.8041 106.51269,41.8069 153.03714,57.7061 11.1944,3.8122 22.50358,7.6754 33.8765,11.6406 152.80754,54.4549 283.50681,75.301 379.01631,90.5499 10.8374,1.7338 36.3245,5.8394 36.3245,5.8394 42.9162,6.5917 91.8121,11.4494 145.3234,14.4457 l 29.9495,1.7212 c 54.8883,3.2129 117.0696,6.8594 186.2761,6.8594 16.9064,0 35.0495,-0.2932 53.4476,-0.5864 13.9611,-0.2423 28.1135,-0.4973 41.6922,-0.4973 H 4900.6336 L 5255.795,4423.3138 H 7986.1358 L 7631.2549,3057.8757 h 992.0317 l 353.8226,1365.4126 1493.4978,0.1276 c 421.69,0 1026.343,-48.029 1407.308,-463.3444 l 16.957,-18.5893 14.791,-20.4635 c 271.19,-376.4665 318.11,-911.0316 143.308,-1634.2571 l -1.529,-6.1072 -517.009,-2008.70909 h 936.354 L 11982.848,-1604.7358 H 6745.5064" style="fill:#231f20;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:1.27499" id="path21"/><path d="m 7776.2468,-155.45696 h -671.3844 c -237.8367,0 -335.7686,32.89475 -413.0841,90.60082 -50.8849,38.479212 -90.7538,78.284407 -116.3428,126.530047 -85.8452,116.954853 -86.2915,301.637203 -21.3051,550.604573 l 314.9098,1211.75072 h 1028.828 l 209.7359,806.7757 h -957.5942 l -53.7663,66.3123 337.6555,1299.1386 H 5585.9792 L 5230.8179,2630.8049 H 4443.4093 1636.888 c -31.3649,0 -65.4581,1.0965 -95.1271,1.0965 -67.9188,0 -129.4115,-4.386 -192.3834,-7.9177 -36.1459,-2.0273 -72.7763,-5.3167 -104.3833,-10.1617 -94.1709,-15.4911 -206.3573,-29.9494 -337.92348,-76.9583 -54.92659,-19.2269 -108.20846,-35.9166 -157.00231,-57.5404 C 640.50848,2431.1032 542.01545,2373.5628 453.41641,2305.7079 352.27138,2229.4125 268.09657,2146.2066 196.67165,2052.4311 158.98289,2004.9632 126.98064,1955.876 96.852654,1906.3172 69.899309,1862.228 48.33918,1818.5468 26.587894,1776.0386 -0.96467474,1721.2013 -20.739765,1670.3165 -38.576847,1619.6738 -68.47539,1533.2805 -86.911694,1452.9434 -116.70829,1320.0129 -176.32686,1031.2531 -143.17709,814.23698 -36.179852,659.15986 126.6236,488.01791 402.21275,412.20699 754.22489,412.20699 h 663.86201 c 59.9755,0 115.0295,-1.52999 162.9055,-6.3877 49.9031,-5.31671 106.9206,-16.06488 158.9785,-40.2897 40.3406,-19.02285 73.006,-43.75766 99.105,-74.57419 95.6498,-97.02676 115.4886,-242.107901 85.9471,-335.296945 C 1871.8813,-210.77878 1721.509,-371.01956 1367.5844,-371.01956 H -474.51389 L -684.35943,-1177.6792 H 2127.0707 c 728.0322,0 1412.3579,290.15978 1656.5694,1228.745181 84.8762,326.856509 56.6223,569.665679 -62.8569,741.292119 -175.12,185.54941 -481.1814,267.4548 -877.5376,267.4548 h -607.941 c 0,0 -194.2574,-2.8942 -283.3411,43.0053 -30.5105,15.9757 -78.6286,46.9197 -110.7201,85.8323 -13.9994,15.708 -28.9806,34.7053 -41.4372,49.7502 -69.283,72.853 -84.4681,172.6465 -58.7515,271.573 68.9514,266.0649 308.2161,314.2978 540.0731,314.2978 l 1799.738,-0.2423 h 869.1354 l 53.8684,-66.1465 -355.1485,-1365.7823 c -162.8036,-626.2625 -167.1003,-1033.26237 8.8357,-1284.46095 195.1244,-207.31465 548.1183,-285.31865 1075.6456,-285.31865 h 346.7845 c 846.6191,0 1106.5132,621.18934 1637.8654,986.07628 17.9518,12.67339 37.7141,24.41606 58.3945,36.14596" style="fill:#ed192d;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:1.27499" id="path23"/><path d="m 6755.3749,-1173.6744 c 74.7144,29.9074 140.1469,63.0075 191.8477,98.5924 -51.7135,-35.5849 -117.3501,-68.685 -191.8477,-98.5924" style="fill:#ed192d;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:1.27499" id="path25"/><path d="m 11054.655,-155.12546 -53.996,66.388751 637.177,2475.827109 c 151.213,625.6251 108.756,1029.746 -74.716,1284.2979 -226.692,247.1696 -613.359,324.9568 -1092.475,324.9568 l -1163.02,-0.09 -295.9126,-1141.8813 h 202.5323 c 178.7281,0 304.2892,-48.4242 380.406,-142.8117 132.0125,-143.3599 174.6483,-395.4382 90.8431,-718.7758 L 9132.0206,-155.45696 h -533.8768 c -847.9578,0 -1060.6517,-603.43761 -1631.3118,-985.95004 -18.411,-12.1621 -39.1294,-24.3638 -60.0776,-36.262 h -161.2097 c -0.013,-0.01 -0.026,-0.01 -0.038,-0.01 h 65.5855 4841.5338 l 265.963,1022.55376 h -863.934" style="fill:#ed192d;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:1.27499" id="path27"/><path d="m 6232.9603,3173.224 c 7.4077,30.9695 51.7136,19.9281 43.9361,-10.9903 -194.4104,-778.6622 -103.5546,-898.1288 672.7232,-898.1288 31.6198,0 31.6198,-45.7848 0,-45.7848 -778.0756,0 -956.9057,-125.3954 -1151.2781,-898.6897 -8.0451,-32.8183 -53.5623,-24.5818 -45.1729,8.1217 192.3833,772.0959 117.6944,890.568 -656.4415,890.568 -31.6962,0 -31.6962,45.7848 0,45.7848 781.1867,0 940.3946,126.7213 1136.2332,909.1191" style="fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:1.27499" id="path29"/><path d="M 8956.4161,67.806609 9479.1749,2098.4327 c 123.9417,477.3181 6.1837,598.6845 -264.9302,598.6845 h -477.2544 l 392.7353,1522.6572 1287.1534,0.2677 c 1334.43,0 1653.433,-659.2719 1373.317,-1872.5145 L 11204.147,68.7246 h 935.142 l -365.03,-1403.6854 -4117.8229,-0.2549 H 7546.3024 5733.2151 c -1262.0365,0 -1643.0162,477.08608 -1290.6345,1832.94904 L 4746.5,1666.8357 h -665.6342 -1799.738 c -224.5769,0 -349.0541,-46.8941 -387.9286,-196.425 -36.2862,-140.2107 73.006,-187.0665 288.2371,-187.0665 h 607.8389 c 813.3674,0 1385.0474,-355.21238 1146.8537,-1271.649914 C 3668.6105,-1017.135 2903.3613,-1335.2157 2127.0707,-1335.2157 H -958.80622 l 308.55273,1187.89318 H 1313.8053 c 214.887,0 371.8255,28.06255 417.8909,205.630448 46.4351,177.644402 -98.1615,196.412252 -313.6093,196.412252 H 754.22489 c -766.664432,0 -1289.20138,364.72374 -1055.74812,1262.55912 257.846368,991.2795 1067.58003,1337.0823 1834.63963,1337.0823 h 2856.6923 665.4175 l 355.123,1365.4128 h 2244.289 L 7299.7065,2854.3616 H 8328.2156 L 8019.4766,1666.8357 H 6990.789 L 6706.3897,572.95778 C 6601.9935,170.45607 6678.1232,67.806609 6996.0547,67.806609 H 8789.6601 Z M 7919.186,-89.170208 h -923.1313 c -459.0729,0 -561.8627,240.208178 -441.9243,701.448688 l 314.9098,1211.73802 h 1028.828 l 226.9482,873.1007 H 7096.2436 l 354.919,1365.2086 H 5531.9834 L 5177.0644,2697.1172 H 4389.8087 1533.1164 C 812.28795,2697.1172 84.867678,2377.5918 -149.16953,1477.4359 -347.62179,714.99166 50.493998,412.20699 754.22489,412.20699 h 663.86201 c 59.9755,0 115.0295,-1.54274 162.8927,-6.40044 49.9159,-5.31672 106.9334,-16.03939 158.9913,-40.2642 141.5876,-66.37601 181.4821,-202.96571 144.3161,-346.78462 -36.2351,-138.6807 -122.552,-228.22327 -238.7802,-275.49991 -103.1594,-41.90893 -222.9958,-48.05439 -331.7015,-48.05439 H -528.50205 L -755.42995,-1177.669 H 2127.0707 c 728.0322,0 1412.3579,290.14958 1656.5694,1228.72223 199.7911,768.72993 -227.9046,1074.98267 -994.3649,1074.98267 h -607.8389 c -109.1774,0 -229.1286,9.9577 -318.4161,62.6146 -121.9655,71.8076 -154.2611,197.3176 -121.9655,321.3232 68.9514,266.0521 308.2161,314.2978 540.0731,314.2978 l 1799.738,-0.255 h 869.1354 L 4594.7252,458.47638 C 4265.6757,-808.55926 4585.0481,-1177.669 5733.2151,-1177.669 h 346.7718 c 846.6191,0 1106.5132,621.18935 1637.8654,986.06608 53.9958,37.1532 122.5903,71.42495 201.3337,102.432712 M 6811.1174,-1177.669 h 4841.5086 l 283.302,1088.932291 h -935.269 l 637.177,2475.840009 c 329.074,1362.1486 -260.737,1675.6815 -1220.957,1675.6815 l -1162.8036,-0.459 -313.3671,-1207.9642 h 273.5364 c 427.925,0 551.446,-278.1901 417.1513,-795.4664 L 9078.0119,-89.170208 h -493.1662 c -848.7866,0 -1107.0868,-620.971292 -1637.6231,-985.897792 -54.0086,-37.1685 -123.0875,-71.6531 -201.7162,-102.601 h 65.611" style="fill:#fab218;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:1.27499" id="path31"/></g></g></svg>`,
tba2: `<img src="https://res.cloudinary.com/dmgmoisae/image/upload/v1776518000/lollipop_logo_suxcty.png" alt="" style="width:44px;height:auto;display:block" />`,
tba3: `<img src="https://res.cloudinary.com/dmgmoisae/image/upload/v1776517817/RockyPoint_All_RGB_Mo_E2_95_A0_C3_AArkgra_E2_95_A0_C3_A8___serialized1_rszxdb.png" alt="" style="width:44px;height:auto;display:block" />`,
tba4: `<span style="font:700 11px/1.1 var(--sektion73-font);color:#fff;text-align:center;display:inline-block">Åsa la<br>pizza</span>`,
tba5: `<span style="font:700 11px/1.1 var(--sektion73-font);color:#000;text-align:center;display:inline-block">STRANDBAREN</span>`,
tba6: `<svg id="Lager_1" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 53 72" width="32" height="43"><defs><style>.st0{fill:#fff}.st1{fill:#ffe100}.st2{fill:#0e4156}</style></defs><path class="st0" d="M11.4 71.9c-1 0-2.1-.3-3.2-.5-.7-.2-1.4-.3-1.9-.4-4.5-.5-5.7-3.1-6-5.3-.3-2.1.5-3.6 1.1-4.7.2-.5.4-.8.5-1.1.3-.6.5-1.4.7-2 .4-1.3.8-2.6 1.5-3.8l.8-1.2c2-3.3 4.3-7 6.8-10.3 1.1-1.5 2.1-3.1 3.1-4.8 1.9-3.2 3.7-6.3 6.7-8.7 1.9-1.5 4.7-2.4 8-2.4s8.7 1.6 11 4c3.2 3.5 3 8.3 2.7 12.5 0 .5 0 .9-.1 1.3-.1 1.7-.1 3.5-.1 5q0 4.05-.3 8.1v.3c-.3 3.7-.9 9.2-3.9 12-1.2 1.1-3 1.7-5.1 1.7-3 0-5.7-1.1-7.3-2.7-.7-.7-1-1.5-1.2-2.1-.3-.8-.5-1-.8-1.3-.3-.2-.7-.3-1.1-.3-.6 0-1.3.2-2 .5-1 .4-2.1 1.5-3.2 2.5-1.6 1.6-3.4 3.4-5.8 3.7h-.8Z"/><path class="st0" d="M11.4 70.2c-.8 0-1.8-.2-2.8-.5-.8-.2-1.5-.4-2.1-.4-2.7-.3-4.2-1.6-4.5-3.8-.2-1.5.4-2.6 1-3.7.2-.5.4-.8.6-1.2.3-.7.6-1.5.8-2.2.4-1.2.7-2.4 1.4-3.4l.7-1.2c2-3.3 4.2-7 6.7-10.2 1.2-1.6 2.3-3.3 3.3-5 1.9-3.1 3.6-6 6.3-8.2 1.6-1.3 4.1-2 6.9-2s7.8 1.4 9.8 3.4c2.7 2.9 2.5 7.3 2.3 11.2 0 .5-.1 1-.1 1.4-.1 1.7-.1 3.4-.1 5 0 2.7-.1 5.4-.3 8v.3c-.3 3.4-.8 8.6-3.4 11-.9.8-2.3 1.3-4 1.3s-4.8-.9-6-2.2c-.5-.5-.7-1.1-.9-1.6-.3-.8-.6-1.5-1.5-2-.6-.4-1.3-.6-2-.6s-1.6.2-2.6.6c-1.4.5-2.6 1.7-3.9 2.9-1.5 1.5-3 3-4.9 3.3-.4-.2-.6-.2-.7-.2"/><path class="st0" d="M11.4 72c-1.1 0-2.2-.3-3.3-.6-.7-.2-1.4-.3-1.9-.4-4.8-.5-5.9-3.6-6.1-5.4-.3-2.1.5-3.6 1.1-4.8.2-.4.4-.7.5-1.1.3-.6.5-1.3.7-2 .4-1.3.8-2.6 1.6-3.9l.7-1.2c2.1-3.5 4.3-7.1 6.8-10.3 1.1-1.5 2.1-3.2 3.1-4.8 1.8-3.1 3.7-6.3 6.7-8.7 1.9-1.5 4.8-2.4 8-2.4s8.8 1.6 11.1 4c3.3 3.5 3 8.3 2.7 12.6 0 0-.1 1-.1 1.4-.1 1.6-.1 3.4-.1 4.9q0 4.05-.3 8.1v.3c-.3 3.7-.9 9.2-4 12.1-1.2 1.1-3.1 1.8-5.2 1.8s-5.8-1.1-7.3-2.8c-.7-.8-1-1.6-1.3-2.2-.3-.7-.4-.9-.7-1.1s-.6-.3-1-.3-1.2 0-1.9.4c-1 .4-2.1 1.4-3.2 2.5-1.6 1.6-3.4 3.4-5.9 3.8h-.7Zm18.1-41.5c-2.3 0-4.3.6-5.5 1.5-2.4 2-4 4.7-5.8 7.6h-.1c-1 1.8-2.1 3.6-3.3 5.2-2.4 3.1-4.5 6.6-6.6 10L7.4 56c-.5.9-.8 1.9-1.2 3-.2.8-.5 1.6-.8 2.4-.2.5-.4.9-.7 1.4-.6 1-.8 1.5-.7 2.3 0 .8.4 1.7 2.5 1.9.7 0 1.5.3 2.4.5h.2c.8.2 1.7.4 2.2.4h.2c1.1-.2 2.3-1.4 3.6-2.6 1.4-1.4 2.9-2.8 4.7-3.5 1-.4 2.1-.7 3.3-.7s2.2.3 3.2.9c1.4.9 1.9 2.1 2.3 3 .2.5.3.8.6 1 .6.7 2.3 1.4 4.3 1.4s2.1-.3 2.4-.6c2-1.8 2.4-6.7 2.7-9.5V57c.2-2.5.3-5.2.3-7.8s0-3.4.1-5.1c0-.5 0-1 .1-1.5.2-3.6.4-7.4-1.6-9.6-1.4-1.4-4.7-2.5-8-2.5m2.7-5.7c-2.1 0-3.3-.9-3.9-1.7-.8-.9-1.2-2.2-1.2-3.6 0-3.1 2.1-6.6 5.5-7.1.3-.1.5-.1.7-.1 0 0 1.8 0 2.7.8 1.9 1 3.2 3.1 3.2 5.4.1 2.9-1.9 5.3-5.1 6.1-.7 0-1.4.2-1.9.2"/><path class="st0" d="M32.2 23.1c-1.4 0-2.2-.6-2.6-1.1-.5-.6-.8-1.5-.8-2.5 0-2.5 1.7-5.3 4.3-5.4.2-.2.5-.3.8-.3h.2c.4.1.7.3.8.6 1.5.6 2.6 2.3 2.6 4.1.1 2.1-1.4 3.8-3.8 4.4-.6.2-1.1.2-1.5.2"/><path class="st0" d="M32.1 24.9c-2.1 0-3.3-1-4-1.8-.8-1-1.2-2.2-1.2-3.7 0-3.5 2.5-7.2 6.3-7.2s.7 0 1.1.1c2.8.5 4.9 3.1 5 6.1.1 2.3-1.3 5.3-5.2 6.2-.7.3-1.4.3-2 .3m1.1-8.5c-1.2 0-2.2 1.7-2.2 3.1s.1.9.3 1.1.5.3.9.3h.9c1-.2 2.1-.8 2.1-2.1s-.8-2-1.7-2.2h-.1c0-.1-.1-.1-.2-.1Zm16 12.3c-.7 0-1.3-.3-1.8-.8-.7-.8-1.8-1.3-3.1-1.9-1.2-.5-2.4-1.1-3.5-2-1.1-.8-1.2-2.4-.4-3.4.5-.6 1.2-.9 1.9-.9s1.1.2 1.5.5c.7.5 1.6.9 2.5 1.4 1.5.7 3.2 1.5 4.6 3 .4.5.7 1.1.6 1.8 0 .6-.3 1.2-.8 1.7q-.6.6-1.5.6m-6.6-14.5c-1.3 0-2.4-1-2.4-2.4s1-2.5 2.4-2.5 2.2-.5 3.4-1c1.4-.5 2.8-1.1 4.3-1.3h.3c1.2 0 2.3.9 2.4 2.2s-.8 2.5-2.1 2.7c-.9.1-1.9.5-3.1 1-1.6.5-3.3 1.2-5.2 1.3"/><path class="st0" d="M32.6 12.8c-1.2 0-2.3-.9-2.4-2.1-.3-2.3.7-7.2 1.9-9.4.4-.8 1.2-1.3 2.1-1.3s.8.1 1.1.3c1.2.6 1.6 2.1 1 3.3-.7 1.4-1.5 5.1-1.3 6.5.1.6-.1 1.3-.5 1.8s-1 .8-1.6.9zm-6.4 2.1c-.4 0-.8-.1-1.1-.3-1.4-.7-3.2-2.4-4.8-4.1l-.4-.4c-.5-.3-.8-.8-.9-1.3-.3-1.1.2-2.2 1.1-2.8.4-.2.8-.4 1.2-.4 1 0 1.7.7 2.5 1.4.8.8 2.8 2.7 3.6 3.2.6.3 1 .8 1.2 1.4s.1 1.3-.1 1.9c-.6.8-1.4 1.4-2.3 1.4m-9.3 12.7c-.8 0-1.5-.3-1.9-.9-.4-.5-.6-1.1-.5-1.8.1-.6.4-1.2.9-1.6 1.5-1.2 3.4-2 5.8-2.5h.5c1.1 0 2.1.8 2.4 1.9.3 1.3-.6 2.6-1.9 2.9-1.6.3-2.9.9-3.8 1.6-.5.3-1 .5-1.5.5Z"/><path class="st1" d="M11.4 70.8c-.9 0-1.9-.3-2.9-.5-.8-.2-1.5-.4-2-.4-3-.3-4.7-1.8-5-4.3-.2-1.7.4-2.9 1-4 .2-.5.4-.8.6-1.2.3-.7.5-1.4.7-2.1.4-1.3.7-2.5 1.4-3.6l.8-1.2c2-3.3 4.2-7 6.8-10.2 1.2-1.5 2.2-3.2 3.2-5 1.9-3.2 3.6-6.1 6.4-8.4 1.7-1.4 4.3-2.1 7.2-2.1s8.1 1.4 10.2 3.6c2.9 3.1 2.6 7.7 2.4 11.7 0 .5 0 1-.1 1.4-.1 1.7-.1 3.5-.1 5 0 2.7-.1 5.4-.3 8v.3c-.3 3.5-.8 8.8-3.6 11.3-1 .9-2.5 1.4-4.4 1.4s-5.1-.9-6.4-2.4c-.5-.6-.8-1.2-1-1.8-.4-.8-.6-1.4-1.2-1.8-.5-.3-1.1-.5-1.7-.5s-1.6.3-2.4.5c-1.3.4-2.5 1.6-3.7 2.8-1.5 1.5-3.1 3.1-5.2 3.4h-.6Z"/><path class="st1" d="M40.4 42.8c0 .5-.1 1-.1 1.4-.1 1.7-.1 3.4-.1 5 0 2.6-.1 5.3-.3 7.9v.3c-.3 3.2-.8 8.1-3 10.2-.6.6-1.8 1-3.2 1-2.1 0-4.2-.7-5.1-1.8-.4-.4-.5-.8-.8-1.4-.4-.8-.7-1.8-1.9-2.5-.8-.5-1.7-.8-2.6-.8s-2 .3-2.9.6c-1.6.6-3 1.9-4.3 3.2-1.4 1.4-2.8 2.7-4.2 2.9-.7 0-1.8-.2-2.9-.5-.8-.2-1.6-.4-2.2-.5-2.2-.2-3.3-1.1-3.5-2.9-.2-1.2.3-2 .8-3 .2-.4.5-.8.7-1.3.3-.8.6-1.5.8-2.3.4-1.1.7-2.2 1.3-3.2l.7-1.2c2.1-3.4 4.3-7 6.7-10.1 1.2-1.6 2.3-3.4 3.3-5.1 1.8-3 3.5-5.8 6-7.9 1.4-1.1 3.6-1.7 6.2-1.7s7.2 1.2 8.9 3.1c2.1 2.8 1.9 6.8 1.7 10.6"/><path class="st2" d="M11.4 70.9c-.9 0-2-.3-3.1-.5-.7-.2-1.5-.4-2-.4-3.8-.4-4.9-2.6-5.1-4.4s.4-3 1-4.1l.6-1.2c.3-.7.5-1.4.7-2.1.4-1.2.8-2.5 1.5-3.6l.7-1.2c2.1-3.5 4.3-7 6.8-10.2 1.2-1.5 2.2-3.3 3.2-5 1.8-3 3.6-6.1 6.4-8.4 1.7-1.4 4.3-2.1 7.3-2.1s8.2 1.4 10.3 3.7c2.9 3.1 2.7 7.7 2.4 11.7 0 .5-.1 1-.1 1.4-.1 1.6-.1 3.3-.1 5 0 2.6-.1 5.4-.3 8v.3c-.3 3.5-.8 8.8-3.6 11.4-1 .9-2.6 1.4-4.5 1.4s-5.2-1-6.5-2.4c-.6-.6-.8-1.3-1.1-1.9-.3-.7-.5-1.2-1.2-1.7-1.1-.7-2.6-.4-4 0-1.2.4-2.4 1.6-3.6 2.8-1.6 1.5-3.2 3.1-5.2 3.4h-.5Zm18.1-41.6c-2.6 0-4.8.6-6.2 1.7-2.6 2.1-4.3 4.9-6 7.9-1 1.7-2.1 3.5-3.3 5.1-2.4 3.1-4.6 6.6-6.7 10.1l-.7 1.2c-.6 1-.9 2.1-1.3 3.2-.2.8-.5 1.5-.8 2.3-.2.5-.4.9-.7 1.3-.5 1-1 1.8-.8 3 .2 1.7 1.3 2.6 3.5 2.9.7 0 1.4.3 2.2.5 1.1.3 2.2.6 2.9.5 1.5-.2 2.8-1.5 4.2-2.9 1.3-1.3 2.7-2.6 4.3-3.2.9-.3 1.9-.6 2.9-.6s1.8.2 2.6.8c1.1.7 1.5 1.7 1.9 2.5.2.5.4 1 .8 1.4 1 1.1 3.1 1.8 5.1 1.8s2.6-.3 3.2-1c2.3-2.1 2.7-7 3-10.2v-.3c.3-2.6.3-5.3.3-7.9s0-3.4.1-5c0-.5 0-1 .1-1.4.2-3.9.5-7.8-1.9-10.4-1.5-2-5.1-3.3-8.7-3.3"/><path class="st2" d="M35.4 46.8c-.5.5-1 1-1.5 1.6-2 2.1-4.3 4.5-7.3 5h-1.5c-1.5 0-3.2-.5-4.4-2.4-.7-1.1-.9-3.3-1-5.6V45c-.2-.5 0-1 .5-1.2s1 0 1.2.5c0 0 0 .2.1.2.6 1.2 1.7 2.1 3.3 2.5 2.9.8 7 0 9.5-1.7.4-.3.9-.2 1.2.2.3.3.2.9-.1 1.2Z"/><path class="st1" d="M32.2 23.7c-1.6 0-2.6-.7-3.1-1.3-.6-.7-.9-1.7-.9-2.9 0-2.8 1.8-5.7 4.6-5.9.3-.2 2.2.1 2.5.5 1.6.8 2.7 2.6 2.8 4.5.1 2.4-1.6 4.3-4.3 5h-1.6Z"/><path class="st1" d="M36.3 18.6c0 1.6-1 2.8-3 3.3-1.4.3-2.4 0-3-.5-.4-.4-.5-1.1-.5-1.8 0-2 1.4-4.3 3.3-4.3s.4 0 .6.1V15c.1 0 0 .4 0 .4 1.5.1 2.6 1.6 2.6 3.2"/><path class="st2" d="M32.1 23.8c-1.7 0-2.6-.7-3.1-1.4-.6-.8-1-1.8-1-3 0-2.9 2.1-6.1 5.1-6.1s.6 0 .9.1c2.3.4 4 2.6 4.1 5 .1 1.9-1.1 4.3-4.4 5.1-.5.2-1 .3-1.6.3m1.1-8.6c-2 0-3.3 2.2-3.3 4.3s.2 1.4.5 1.8c.6.7 1.6.9 3 .5 1.9-.5 3-1.7 3-3.3s-1.2-3-2.6-3.3zm16 12.4c-.4 0-.7 0-1-.4-.9-1-2.1-1.5-3.4-2.1-1.1-.5-2.2-1-3.2-1.8-.6-.4-.7-1.3-.2-1.8.4-.6 1.3-.7 1.8-.2.8.6 1.7 1 2.7 1.5 1.5.7 3 1.4 4.3 2.7.5.5.4 1.3-.1 1.8q-.45.3-.9.3M42.6 13c-.7 0-1.3-.6-1.3-1.3s.5-1.3 1.3-1.3c1.2 0 2.5-.5 3.8-1.1 1.3-.5 2.6-1 4-1.2s1.4.4 1.4 1.1c.1.7-.4 1.4-1.1 1.4-1.1.1-2.2.6-3.3 1-1.6.8-3.1 1.4-4.8 1.4m-10-1.3c-.6 0-1.2-.5-1.3-1.1-.3-2.1.6-6.7 1.7-8.7.3-.6 1.1-.9 1.8-.5.6.3.9 1.1.5 1.8-.8 1.6-1.7 5.6-1.5 7.2.1.7-.4 1.4-1.1 1.4 0-.1-.1-.1-.1-.1m-6.4 2c-.2 0-.4 0-.6-.1-1.3-.6-3-2.3-4.6-3.8l-.5-.5c-.3-.2-.5-.4-.6-.7-.2-.6.1-1.2.6-1.5.9-.5 1.4 0 2.3.9s2.9 2.9 3.9 3.4c.6.3.9 1.1.6 1.7-.2.4-.6.6-1.1.6m-9.3 12.8c-.4 0-.8-.2-1-.5-.4-.6-.3-1.4.2-1.8 1.4-1.1 3.1-1.8 5.3-2.3.7-.2 1.4.3 1.5 1 .2.7-.3 1.4-1 1.5-1.8.4-3.2 1-4.3 1.8-.2.2-.4.3-.7.3"/></svg>`

};

const sektion73Pins = [
  {
    id: "sektion73Pin_ica_0001",
    label: "ICA",
    filter: "Butiker",
    iconKey: "ica",
    ui: {
      bubbleBg: "#fff",
      pointerTop: "#fff"
    },
    lngLat: [12.12257, 57.351106],
    modal: {
      kicker: { sv: "BUTIK", en: "SHOP", de: "LADEN" },
      title: { sv: "Ica Supermarket", en: "Ica Supermarket", de: "Ica Supermarket" },
      images: [
        "https://res.cloudinary.com/dmgmoisae/image/upload/v1776524733/45cfc144-4d39-4274-b625-36f870a3ac5d_o0et5q.jpg",
        "https://res.cloudinary.com/dmgmoisae/image/upload/v1776524770/original_jfpdh5.jpg"
      ],
      h: { sv: "Ica Supermarket", en: "Ica Supermarket", de: "Ica Supermarket" },
      p: {
        sv: "Åsas egna matbutik, mitt i samhället. Hit går ortsborna, sommargästerna och de som bara ska ha något snabbt på vägen till stranden. Stora helger och vanliga tisdagar, picknick till Åsa havsbad eller söndagsstek hemma. Bred hylla, färsk fisk, eget bageri och personal som känner igen sina kunder.",
        en: "Åsa's own grocery store, right in the heart of the village. Locals, summer guests and people grabbing something quick on the way to the beach all come here. Big holidays and ordinary Tuesdays, picnics to Åsa havsbad or a Sunday roast at home. Wide aisles, fresh fish, an in-house bakery and staff who recognise their customers.",
        de: "Åsas eigener Lebensmittelladen, mitten im Ort. Hierher kommen die Einheimischen, die Sommergäste und alle, die auf dem Weg zum Strand schnell etwas brauchen. Große Feiertage und ganz gewöhnliche Dienstage, Picknicks zum Åsa havsbad oder Sonntagsbraten zu Hause. Breites Sortiment, frischer Fisch, eigene Bäckerei und Personal, das seine Kunden wiedererkennt."
      },
      cta1Text: { sv: "Läs mer", en: "Read more", de: "Mehr erfahren" },
      cta1Href: "https://www.ica.se/butiker/supermarket/kungsbacka/ica-supermarket-asa-1003526/",
      cta2Text: { sv: "", en: "", de: "" },
      cta2Href: ""
    }
  },
  {
    id: "sektion73Pin_tba_0007",
    label: "ST1",
    filter: "Butiker",
    iconKey: "tba",
    ui: {
      bubbleBg: "#FFBE00",
      pointerTop: "#FFBE00"
    },
    lngLat: [12.122081, 57.350475],
    modal: {
      kicker: { sv: "BENSINSTATION", en: "GAS STATION", de: "TANKSTELLE" },
      title: { sv: "ST1", en: "ST1", de: "ST1" },
      images: [
        "https://res.cloudinary.com/dmgmoisae/image/upload/v1776672024/206914-1_ygadvh.jpg",
        "https://res.cloudinary.com/dmgmoisae/image/upload/v1776672046/0fJZm5u7FPO6klc78EjctbdQC154-REGULAR_kxejvy.jpg"
      ],
      h: { sv: "ST1", en: "ST1", de: "ST1" },
      p: {
        sv: "St1-automatstation på Varbergsvägen i Åsa. Bensin, diesel och E85 dygnet runt, betalning vid pumpen. På plats finns även kiosk och butik med det vanliga — dricka, snacks, tidningar och det du glömde handla. Postombud för paket, både upphämtning och inlämning.",
        en: "St1 self-service station on Varbergsvägen in Åsa. Petrol, diesel and E85 around the clock, with pay-at-the-pump. On site you'll also find a kiosk and shop with the usual — drinks, snacks, newspapers and the things you forgot to buy. Postal agent for parcels — both pickup and drop-off.",
        de: "St1-Selbstbedienungstankstelle an der Varbergsvägen in Åsa. Benzin, Diesel und E85 rund um die Uhr, Bezahlung direkt an der Zapfsäule. Vor Ort auch Kiosk und Laden mit dem Üblichen — Getränke, Snacks, Zeitungen und das, was vergessen wurde. Poststelle für Pakete — Abholung und Abgabe."
      }
    }
  },
  {
    id: "sektion73Pin_tba_0008",
    label: "Lollipop",
    filter: "Butiker",
    iconKey: "tba2",
    ui: {
      bubbleBg: "#303030",
      pointerTop: "#303030"
    },
    lngLat: [12.122629, 57.351737],
    modal: {
      kicker: { sv: "BUTIK", en: "SHOP", de: "LADEN" },
      title: { sv: "Lollipop", en: "Lollipop", de: "Lollipop" },
      images: [
        "https://res.cloudinary.com/dmgmoisae/image/upload/v1776524917/godisbutiker_m3jyoh.png",
        "https://res.cloudinary.com/dmgmoisae/image/upload/v1776524888/phoca_thumb_l_nya_sa_lr_1_av_10_pei58x.jpg"
      ],
      h: { sv: "Lollipop", en: "Lollipop", de: "Lollipop" },
      p: {
        sv: "Godisbutik mitt i Åsa. Brett lösgodissortiment, förpackat godis, läsk och glass. Här hittar både ortsbor och sommargäster något att ta med till stranden, till filmkvällen eller till bilresan. Fungerar också som postombud — hämtar och lämnar paket gör du samtidigt som du fyller påsen.",
        en: "Candy store in the heart of Åsa. A wide pick-and-mix selection, packaged sweets, soft drinks and ice cream. Locals and summer guests alike find something to bring to the beach, movie night or the road trip. Also a postal agent — pick up and drop off parcels while you fill your bag.",
        de: "Süßigkeitenladen mitten in Åsa. Große Auswahl an losen Süßigkeiten, verpackten Süßwaren, Softdrinks und Eis. Einheimische und Sommergäste finden hier etwas für den Strand, den Filmabend oder die Autofahrt. Auch Poststelle — Pakete abholen und abgeben, während man die Tüte füllt."
      },
      cta1Text: { sv: "Läs mer", en: "Read more", de: "Mehr erfahren" },
      cta1Href: "https://www.lollipopcandy.se/valkommen",
      cta2Text: { sv: "", en: "", de: "" },
      cta2Href: ""
    }
  },
  {
    id: "sektion73Pin_tba_0009",
    label: "Rocky Point Brewery",
    filter: "Mat & dryck",
    iconKey: "tba3",
    ui: {
      bubbleBg: "#fff",
      pointerTop: "#fff"
    },
    lngLat: [12.123952, 57.34902],
    modal: {
      kicker: { sv: "MAT & DRYCK", en: "FOOD & DRINK", de: "ESSEN & TRINKEN" },
      title: { sv: "Rocky Point Brewery", en: "Rocky Point Brewery", de: "Rocky Point Brewery" },
      images: [
        "https://res.cloudinary.com/dmgmoisae/image/upload/v1776525349/Rocky_duhhyi.jpg",
        "https://res.cloudinary.com/dmgmoisae/image/upload/v1776525357/Rocky_Point-deros32-2_vttmu9.jpg",
        "https://res.cloudinary.com/dmgmoisae/image/upload/v1776525361/Foto-2024-07-11-08-49-29-1_hlzbfy.jpg"
      ],
      h: { sv: "Rocky Point Brewery", en: "Rocky Point Brewery", de: "Rocky Point Brewery" },
      p: {
        sv: "Hantverksbryggeri och brewpub i centrala Åsa, döpt efter ett lokalt surfbryt. Serverar egenbryggd öl — pale ale, pilsner, IPA och säsongsbryggder — tillsammans med mat i pubformat. Ligger intill Kattegattleden och har uteservering under sommaren. Möjlighet till gårdsförsäljning och bordsbokning för större sällskap.",
        en: "Craft brewery and brewpub in central Åsa, named after a local surf break. Serves house-brewed beer — pale ale, pilsner, IPA and seasonal brews — alongside pub-style food. Located next to the Kattegattleden trail with outdoor seating in summer. Farm sales and table bookings for larger groups available.",
        de: "Handwerksbrauerei und Brewpub im Zentrum von Åsa, benannt nach einem lokalen Surfspot. Serviert selbstgebrautes Bier — Pale Ale, Pilsner, IPA und saisonale Sorten — zusammen mit Pub-Küche. Liegt am Kattegattleden mit Außenplätzen im Sommer. Hofverkauf und Tischreservierung für größere Gruppen möglich."
      },
      cta1Text: { sv: "Läs mer", en: "Read more", de: "Mehr erfahren" },
      cta1Href: "https://rockypointbrewery.se/",
      cta2Text: { sv: "", en: "", de: "" },
      cta2Href: ""
    }
  },
  {
    id: "sektion73Pin_tba_0010",
    label: "Åsa la pizza",
    filter: "Mat & dryck",
    iconKey: "tba4",
    ui: {
      bubbleBg: "#303030",
      pointerTop: "#303030"
    },
    lngLat: [12.124466, 57.348745],
    modal: {
      kicker: { sv: "MAT & DRYCK", en: "FOOD & DRINK", de: "ESSEN & TRINKEN" },
      title: { sv: "Åsa la pizza", en: "Åsa la pizza", de: "Åsa la pizza" },
      images: [
        "https://res.cloudinary.com/dmgmoisae/image/upload/v1776525116/482246002_1153002359862728_2301325432484960457_n.jpg_hkj53e.jpg",
        "https://res.cloudinary.com/dmgmoisae/image/upload/v1776525118/66757050_1803057059797461_4428391971173695488_n.jpg_d5b9mp.jpg"
      ],
      h: { sv: "Åsa la pizza", en: "Åsa la pizza", de: "Åsa la pizza" },
      p: {
        sv: "Pizzeria på Sörviksvägen i Åsa. Serverar tunn pizza, kebab, hamburgare och sallader, samt dagens lunch på vardagar. Passar både för en snabb bit efter stranden och för en enklare middag på plats. Uteservering under sommaren och möjlighet att beställa för avhämtning.",
        en: "Pizzeria on Sörviksvägen in Åsa. Serves thin pizza, kebab, burgers and salads, plus a daily lunch on weekdays. Works for a quick bite after the beach or a simple dinner on site. Outdoor seating in summer and takeaway available.",
        de: "Pizzeria an der Sörviksvägen in Åsa. Dünne Pizza, Kebab, Burger und Salate sowie ein Tagesmenü an Werktagen. Passt für einen schnellen Snack nach dem Strand oder ein einfaches Abendessen vor Ort. Im Sommer Außenplätze und Abholung möglich."
      },
      cta1Text: { sv: "Visa meny", en: "View menu", de: "Speisekarte" },
      cta1Href: "https://www.asalapizza.com/",
      cta2Text: { sv: "", en: "", de: "" },
      cta2Href: ""
    }
  },
  {
    id: "sektion73Pin_tba_0011",
    label: "Strandbaren",
    filter: "Mat & dryck",
    iconKey: "tba5",
    ui: {
      bubbleBg: "#EBE1D8",
      pointerTop: "#EBE1D8"
    },
    lngLat: [12.122059, 57.346407],
    modal: {
      kicker: { sv: "MAT & DRYCK", en: "FOOD & DRINK", de: "ESSEN & TRINKEN" },
      title: { sv: "Strandbaren", en: "Strandbaren", de: "Strandbaren" },
      images: [
        "https://res.cloudinary.com/dmgmoisae/image/upload/v1776525524/118153872_1583214535172292_5072576349977754965_n.jpg_pfc4dp.jpg",
        "https://res.cloudinary.com/dmgmoisae/image/upload/v1776525494/beach-bowl-with-shrimps_mc3i5p.jpg",
        "https://res.cloudinary.com/dmgmoisae/image/upload/v1776525527/527490984_18514983724061103_4557529782613948188_n.jpg_eqztyu.jpg"
      ],
      h: { sv: "Strandbaren", en: "Strandbaren", de: "Strandbaren" },
      p: {
        sv: "Säsongsöppen strandbar vid Vitasand i Åsa. Serverar enkel mat, kalla drycker och lokal öl direkt vid stranden. Livemusik under sommaren och uteservering med havsutsikt. Öppet från juni till augusti, med utökade öppettider i juli.",
        en: "Seasonal beach bar at Vitasand in Åsa. Serves simple food, cold drinks and local beer right on the beach. Live music in summer and outdoor seating with ocean views. Open June to August, with extended hours in July.",
        de: "Saisonale Strandbar am Vitasand in Åsa. Serviert einfaches Essen, kalte Getränke und lokales Bier direkt am Strand. Livemusik im Sommer und Außenplätze mit Meerblick. Geöffnet von Juni bis August, mit erweiterten Öffnungszeiten im Juli."
      },
      cta1Text: { sv: "Läs mer", en: "Read more", de: "Mehr erfahren" },
      cta1Href: "https://strandbaren.se/",
      cta2Text: { sv: "", en: "", de: "" },
      cta2Href: ""
    }
  },
  {
    id: "sektion73Pin_sacamping_0001",
    label: "SA Camping",
    filter: ["Mat & dryck", "Butiker"],
    iconKey: "sacamping",
    ui: {
      bubbleBg: "#fff",
      pointerTop: "#fff"
    },
    lngLat: [12.12298, 57.349692],
    modal: {
      kicker: { sv: "TBA", en: "TBA", de: "TBA" },
      title: { sv: "Dahls", en: "Dahls", de: "Dahls" },
      images: [
        "https://res.cloudinary.com/dmgmoisae/image/upload/v1776602082/Dahls-tartor-princesstarta_kvadrat-600x600_x1bttd.jpg",
        "https://res.cloudinary.com/dmgmoisae/image/upload/v1776602062/490730023_1267947235331102_3000617486048650031_n.jpg_qrarge.jpg"
      ],
      h: { sv: "Dahls", en: "Dahls", de: "Dahls" },
      p: {
        sv: "Färskt bröd, tårtor på beställning och en butik mitt i Åsa. Hit går du på morgonen för frallor till frukosten, svänger förbi på vägen hem med något till fikat eller hämtar tårtan inför helgens kalas. Dofter rakt ut genom dörren. Bullar som faktiskt är varma. Personal som vet vad du brukar ta.",
        en: "Färskt bröd, tårtor på beställning och en butik mitt i Åsa. Hit går du på morgonen för frallor till frukosten, svänger förbi på vägen hem med något till fikat eller hämtar tårtan inför helgens kalas. Dofter rakt ut genom dörren. Bullar som faktiskt är varma. Personal som vet vad du brukar ta.",
        de: "Färskt bröd, tårtor på beställning och en butik mitt i Åsa. Hit går du på morgonen för frallor till frukosten, svänger förbi på vägen hem med något till fikat eller hämtar tårtan inför helgens kalas. Dofter rakt ut genom dörren. Bullar som faktiskt är varma. Personal som vet vad du brukar ta."
      },
      cta1Text: { sv: "Läs mer", en: "Read more", de: "Mehr erfahren" },
      cta1Href: "https://www.dahls.se/butiker/dahls-bageributik-asa/",
      cta2Text: { sv: "", en: "", de: "" },
      cta2Href: ""
    }
  },
  {
    id: "sektion73Pin_tba_0012",
    label: "Åsa camping & havsbad",
    filter: "Boenden",
    iconKey: "tba6",
    ui: {
      bubbleBg: "#0E4156",
      pointerTop: "#0E4156"
    },
    lngLat: [12.122229, 57.348151],
    modal: {
      kicker: { sv: "TBA", en: "TBA", de: "TBA" },
      title: { sv: "Åsa camping & havsbad", en: "Åsa camping & havsbad", de: "Åsa camping & havsbad" },
      images: [
        "https://res.cloudinary.com/dmgmoisae/image/upload/v1776602316/68b2a7_defc606a7f464ee89ebb59603d06ecd6_mv2_d_2000_1224_s_2_l5gevb.jpg",
        "https://res.cloudinary.com/dmgmoisae/image/upload/v1776602377/68b2a7_d6f849bfb09f45acaee8c35b8111771b_mv2_gphelz.jpg",
        "https://res.cloudinary.com/dmgmoisae/image/upload/v1776602311/68b2a7_147804f842124dcb923bea90eb0d93a8_mv2_tenypo.jpg",
        "https://res.cloudinary.com/dmgmoisae/image/upload/v1776602307/68b2a7_f5eee713feec4a3682e1a44ecd85d830_mv2_jq1795.jpg"
      ],
      h: { sv: "Åsa camping & havsbad", en: "Åsa camping & havsbad", de: "Åsa camping & havsbad" },
      p: {
        sv: "Åsa Camping & Havsbad ligger centralt i Åsa, med stranden på ena sidan och byns bageri, butiker och restauranger inom gångavstånd. Långgrunt bad, klippor och kustpromenaden som går förbi i båda riktningarna gör att man sällan behöver ta sig längre än några hundra meter. Familjedrivet sedan länge och öppet från april till slutet av oktober, med både campingtomter och vandrarhem.",
        en: "Åsa Camping & Havsbad ligger centralt i Åsa, med stranden på ena sidan och byns bageri, butiker och restauranger inom gångavstånd. Långgrunt bad, klippor och kustpromenaden som går förbi i båda riktningarna gör att man sällan behöver ta sig längre än några hundra meter. Familjedrivet sedan länge och öppet från april till slutet av oktober, med både campingtomter och vandrarhem.",
        de: "Åsa Camping & Havsbad ligger centralt i Åsa, med stranden på ena sidan och byns bageri, butiker och restauranger inom gångavstånd. Långgrunt bad, klippor och kustpromenaden som går förbi i båda riktningarna gör att man sällan behöver ta sig längre än några hundra meter. Familjedrivet sedan länge och öppet från april till slutet av oktober, med både campingtomter och vandrarhem."
      },
      cta1Text: { sv: "Läs mer", en: "Read more", de: "Mehr erfahren" },
      cta1Href: "https://www.asacamping.se/",
      cta2Text: { sv: "", en: "", de: "" },
      cta2Href: ""
    }
  }
];

/* REMOVED: all other pins kept only HOME */
const sektion73Pins_REMOVED = [
{
    id: "sektion73Pin_home_0000321f",
    label: { sv: "Golf", en: "Golf", de: "Golf" },
    filter: "Att göra",
   priority: "secondary",
    iconKey: "golf",
    ui: {
      bubbleBg: "#77a53b",
      pointerTop: "#77a53b"
    },
    lngLat: sektion73Golf.lngLat,
    modal: {
      kicker: { sv: "HOME", en: "HOME", de: "HOME" },
      title: { sv: "Surbrunnsvägen 2–8", en: "Surbrunnsvägen 2–8", de: "Surbrunnsvägen 2–8" },
      images: [
        "https://res.cloudinary.com/dmgmoisae/image/upload/v1770065021/minigolf_pcvo14.webp",
        "https://res.cloudinary.com/dmgmoisae/image/upload/v1770064998/Boomers-Livermore-CA-34-1024x683_xbq4xu.jpg",
        "https://res.cloudinary.com/dmgmoisae/image/upload/v1770064993/Campark-Mini-Golf-for-Beginners_-Tips-and-Tricks-to-Improve-Your-Game-_i8tp9c.jpg",
        "https://res.cloudinary.com/dmgmoisae/image/upload/v1770064953/8332c8_a351401d52c94b51a645eab0008c74cf_mv2_jz7zhb.jpg"
      ],
      imgSrc: { sv: "Bildkälla: —", en: "Image source: —", de: "Bildquelle: —" },
      h: { sv: "Apelvikens minigolf", en: "Apelviken mini golf", de: "Minigolf in Apelviken" },
      p: {
        sv: "En klassiker på alla campingar. En bana med 18 hål som är lagom klurig för både barn och vuxna, där spelet får ta den tid det tar. Passar lika bra för familjer som för kompisgäng som vill göra något enkelt tillsammans mellan strand och middag.",
        en: "A camping classic. An 18-hole course that’s just tricky enough for both kids and adults, where the game can take the time it takes. Just as good for families as for friends who want something easy to do together between the beach and dinner.",
        de: "Ein Camping-Klassiker. Ein 18-Loch-Platz, der genau knifflig genug für Kinder und Erwachsene ist – und bei dem das Spiel die Zeit bekommt, die es braucht. Passt genauso gut für Familien wie für Freundesgruppen, die zwischen Strand und Abendessen etwas Einfaches zusammen machen wollen."
      },
      cta1Text: { sv: "Läs mer", en: "Learn more", de: "Mehr erfahren" },
      cta1Href: "https://www.apelviken.se/aktivitet-2",
      cta2Text: { sv: "Vägbeskrivning", en: "Directions", de: "Route" },
      cta2Href:
        "https://www.google.com/maps/dir/57.502272,12.087438/apelvikens+minigolf/data=!4m2!4m1!3e0?sa=X&ved=1t:196274&ictx=111"
    }
  },
  // Tångkörarvägen 1
   {
    id: "sektion73Pin_home_fdbvc",
    label: { sv: "Golf", en: "Golf", de: "Golf" },
    filter: "Butiker",
      priority: "secondary",
    iconKey: "surfers",
    ui: {
      bubbleBg: "#313132",
      pointerTop: "#313132"
    },
    lngLat: sektion73Surfcenter.lngLat,
    modal: {
      kicker: { sv: "HOME", en: "HOME", de: "HOME" },
      title: { sv: "Surbrunnsvägen 2–8", en: "Surbrunnsvägen 2–8", de: "Surbrunnsvägen 2–8" },
      images: [
                 "https://res.cloudinary.com/dmgmoisae/image/upload/v1770065244/putte_mac_m5ldez.jpg",
        "https://res.cloudinary.com/dmgmoisae/image/upload/v1770065250/4ciljfr6wiku47ehvc9gb0uqzob7mfxq_sifrmd.jpg",
        "https://res.cloudinary.com/dmgmoisae/image/upload/v1770065236/jason_naishkites_l1xlxu.avif",
        "https://res.cloudinary.com/dmgmoisae/image/upload/v1770065254/center_20_12_ooxsx0.jpg"
      ],
      imgSrc: { sv: "Bildkälla: —", en: "Image source: —", de: "Bildquelle: —" },
      h: { sv: "Surfers Paradise", en: "Surfers Paradise", de: "Surfers Paradise" },
      p: {
        sv: "Här är surf en självklar del av dagen. När vinden tar i och vågorna rullar samlas både nybörjare och erfarna surfare för kurser och uthyrning i en avslappnad miljö hos Surfers Paradise Varberg. Med rätt utrustning och erfarna instruktörer formas varje pass efter dagens förhållanden och havets tempo.",
        en: "Here, surfing is simply part of the day. When the wind picks up and the waves roll in, both beginners and experienced surfers gather for lessons and rentals in a relaxed setting at Surfers Paradise Varberg. With the right gear and experienced instructors, each session is shaped by the day’s conditions and the sea’s rhythm.",
        de: "Hier gehört Surfen ganz selbstverständlich zum Tag. Wenn der Wind auffrischt und die Wellen laufen, treffen sich Anfänger und erfahrene Surfer zu Kursen und zum Verleih – in entspannter Atmosphäre bei Surfers Paradise Varberg. Mit der richtigen Ausrüstung und erfahrenen Coaches wird jede Session an die Bedingungen des Tages und den Takt des Meeres angepasst."
      },
      cta1Text: { sv: "Läs mer", en: "Learn more", de: "Mehr erfahren" },
      cta1Href: "https://surfers.se/",
      cta2Text: { sv: "Vägbeskrivning", en: "Directions", de: "Route" },
      cta2Href:
        "https://www.google.com/maps/dir/57.502272,12.087438/Surfers+Paradise+Varberg,+S%C3%B6dergatan,+Varberg/@57.2960503,11.8313413,78628m/data=!3m1!1e3!4m9!4m8!1m1!4e1!1m5!1m1!1s0x46502a4510f9c69b:0x1ec01eb952e25b7b!2m2!1d12.251716!2d57.10345?entry=ttu&g_ep=EgoyMDI2MDEyOC4wIKXMDSoASAFQAw%3D%3D"
    }
  },
    {
    id: "sektion73Pin_home_tyyfdg",
    label: { sv: "Golf", en: "Golf", de: "Golf" },
    filter: "Mat & dryck",
       priority: "secondary",
    iconKey: "majas",
    ui: {
      bubbleBg: "#fff",
      pointerTop: "#fff"
    },
    lngLat: sektion73Majas.lngLat,
    modal: {
      kicker: { sv: "HOME", en: "HOME", de: "HOME" },
      title: { sv: "Surbrunnsvägen 2–8", en: "Surbrunnsvägen 2–8", de: "Surbrunnsvägen 2–8" },
      images: [
        "https://res.cloudinary.com/dmgmoisae/image/upload/v1770064870/2gcsnMedobtKa21oZpB2t52MkU1Q-REGULAR_ek5ygq.jpg",
        "https://res.cloudinary.com/dmgmoisae/image/upload/v1770064841/majas_20kvall_202_pdfc8k.jpg",
        "https://res.cloudinary.com/dmgmoisae/image/upload/v1770064846/Ska_CC_88rmavbild_202024-03-23_20kl._2009.27.41_m6fu1v.png",
        "https://res.cloudinary.com/dmgmoisae/image/upload/v1770064873/c05bb3a27b4bd93c4b8438c6e3fe8b74_edzrgk.jpg"
      ],
      imgSrc: { sv: "Bildkälla: —", en: "Image source: —", de: "Bildquelle: —" },
      h: { sv: "Majas vid havet", en: "Majas by the sea", de: "Majas am Meer" },
      p: {
        sv: "Majas vid havet är ett litet hak mitt i Apelviken, öppet från maj, där god mat, en full bar och en avslappnad atmosfär lockar både campinggäster och kvällsflanörer till rundpingis, boule och konserter. Här serveras både enkla luncher och festligare middagar, med strandkänsla och gemenskap som sätter stämningen.",
        en: "Majas by the sea is a small spot in the heart of Apelviken, open from May, where good food, a full bar, and a relaxed atmosphere draw both campers and evening strollers for table tennis, boules, and concerts. They serve everything from simple lunches to more festive dinners, with beach vibes and a sense of togetherness setting the tone.",
        de: "Majas am Meer ist ein kleiner Treffpunkt mitten in Apelviken, ab Mai geöffnet. Gutes Essen, eine volle Bar und eine entspannte Atmosphäre ziehen sowohl Campinggäste als auch Abendspaziergänger an – für Rundlauf, Boule und Konzerte. Es gibt einfache Mittagessen ebenso wie etwas festlichere Abendessen, mit Strandgefühl und Gemeinschaft, die die Stimmung prägen."
      },
      cta1Text: { sv: "Läs mer", en: "Learn more", de: "Mehr erfahren" },
      cta1Href: "https://majas.nu/",
      cta2Text: { sv: "Vägbeskrivning", en: "Directions", de: "Route" },
      cta2Href:
        "https://www.google.com/maps/dir/57.502272,12.087438/Majas+vid+Havet,+T%C3%A5ngk%C3%B6rarv%C3%A4gen+15,+432+54+Varberg/@57.2960503,11.8313413,78628m/data=!3m2!1e3!4b1!4m9!4m8!1m1!4e1!1m5!1m1!1s0x465f741e8c9656d7:0x1d2f38bfc65d4d29!2m2!1d12.2632092!2d57.0800381?entry=ttu&g_ep=EgoyMDI2MDEyOC4wIKXMDSoASAFQAw%3D%3D"
    }
  },
  {
    id: "sektion73Pin_tangkorar1_90999",
    label: { sv: "Tångkörarvägen 1", en: "Tångkörarvägen 1", de: "Tångkörarvägen 1" },
    filter: "Mat & dryck",
    iconKey: "solviken",
    ui: {
      bubbleBg: "#1d1d1b",
      pointerTop: "#1d1d1b"
    },
    lngLat: sektion73Tangkorar.lngLat,
    modal: {
      kicker: { sv: "PUNKT", en: "STOP", de: "STOPP" },
      title: { sv: "Tångkörarvägen 1", en: "Tångkörarvägen 1", de: "Tångkörarvägen 1" },
      images: [
        "https://res.cloudinary.com/dmgmoisae/image/upload/v1769971921/solviken321_myphpm.png",
        "https://res.cloudinary.com/dmgmoisae/image/upload/v1769971923/bubbel_vvavwe.png",
        "https://res.cloudinary.com/dmgmoisae/image/upload/v1769971923/sol_qx8kjy.png",
        "https://res.cloudinary.com/dmgmoisae/image/upload/v1769971923/solviken_pt1mdu.png"
      ],
      imgSrc: { sv: "Bildkälla: —", en: "Image source: —", de: "Bildquelle: —" },
      h: { sv: "Restaurang Solviken", en: "Restaurant Solviken", de: "Restaurant Solviken" },
      p: {
        sv: "Allra närmast stranden och med en bedårande utsikt över Kattegatt och folklivet i viken. På Solviken samlas campinggäster och varbergsbor, flanörer längs strandpromenaden och de som tagit en cykeltur från Läjet. Sommaren fylls av god mat, dofter från grillen, quiz och trubadurer. Höstkvällar med värme och gemyt och en svart vattenyta så långt man ser.Som utomlands hemma. För den stora festen och för den som bara har vägen förbi. För dig som släpar med dig en hel hög goda kamrater och för dig som träffar dem här.",
        en: "Right by the beach, with a beautiful view over the Kattegat and the life in the bay. At Solviken you’ll find campers and locals from Varberg, people strolling the promenade, and those who cycled in from Läjet. Summer is filled with good food, the smell of the grill, quizzes, and troubadours. Autumn evenings bring warmth and a cosy atmosphere, with dark water stretching as far as you can see. Like being abroad—at home. For the big celebration and for those just passing by. For you who arrive with a whole bunch of friends, and for you who end up meeting them here.",
        de: "Direkt am Strand – mit einem bezaubernden Blick über das Kattegat und das Treiben in der Bucht. Bei Solviken treffen sich Campinggäste und Varberger, Spaziergänger an der Strandpromenade und alle, die mit dem Rad aus Läjet herüberkommen. Im Sommer gibt es gutes Essen, Grillduft, Quizabende und Troubadoure. Im Herbst sind es warme, gemütliche Abende – und eine dunkle Wasserfläche, so weit das Auge reicht. Wie im Urlaub – zuhause. Für das große Fest und für alle, die einfach nur vorbeikommen. Für dich, der mit einer ganzen Truppe guter Freunde auftaucht – und für dich, der sie hier trifft."
      },
      cta1Text: { sv: "Visa meny", en: "View menu", de: "Speisekarte" },
      cta1Href: "https://www.apelviken.se/solviken-meny",
      cta2Text: { sv: "Vägbeskrivning", en: "Directions", de: "Route" },
      cta2Href:
        "https://www.google.com/maps/dir/57.502272,12.087438/Solviken,+T%C3%A5ngk%C3%B6rarv%C3%A4gen+1,+432+54+Varberg/@57.2950696,11.8317533,75989m/data=!3m1!1e3!4m9!4m8!1m1!4e1!1m5!1m1!1s0x46502af989b79f2d:0xfb2919c395412c94!2m2!1d12.2488569!2d57.084622?entry=ttu&g_ep=EgoyMDI2MDEyOC4wIKXMDSoASAFQAw%3D%3D"
    }
  },
    // Tångkörarvägen 1
  {
    id: "sektion73Pin_tangkorar1_hgfwea1",
    label: { sv: "Tångkörarvägen 1", en: "Tångkörarvägen 1", de: "Tångkörarvägen 1" },
         filter: "Mat & dryck",
    iconKey: "kusthotellet",
    ui: {
      bubbleBg: "#fff",
      pointerTop: "#fff"
    },
    lngLat: sektion73Kusthotellet.lngLat,
    modal: {
      kicker: { sv: "PUNKT", en: "STOP", de: "STOPP" },
      title: { sv: "Tångkörarvägen 1", en: "Tångkörarvägen 1", de: "Tångkörarvägen 1" },
      images: [
        "https://res.cloudinary.com/dmgmoisae/image/upload/v1770067411/havet_hotell_varberg_o2yaxp.jpg",
        "https://res.cloudinary.com/dmgmoisae/image/upload/v1770067408/severins_middag_matsal_snor86.jpg",
        "https://res.cloudinary.com/dmgmoisae/image/upload/v1770067380/GZ1A2134_hj7igz.jpg",
        "https://res.cloudinary.com/dmgmoisae/image/upload/v1770067364/frukost_severins_kaffe_snlmtd.jpg"
      ],
      imgSrc: { sv: "Bildkälla: —", en: "Image source: —", de: "Bildquelle: —" },
      h: { sv: "Varbergs kusthotell", en: "Varberg Coastal Hotel", de: "Varbergs Küstenhotel" },
      p: {
        sv: "Varbergs Kusthotell ligger precis vid havet, och i huset finns restaurang Severins som många söker sig till för maten i sig. Här står fisk, skaldjur och säsongens råvaror i centrum, ofta med nordiska smaker och ett lugnt, genomarbetat uttryck. Restaurangen serverar frukost, lunch, middag och brunch, liksom vin och drinkar som passar både vardag och helg, oavsett om man bor på hotellet eller bara kommer hit för att äta.",
        en: "Varberg Coastal Hotel sits right by the sea, and inside you’ll find Restaurant Severins—many come here for the food in its own right. Fish, seafood, and seasonal ingredients take centre stage, often with Nordic flavours and a calm, well-crafted style. The restaurant serves breakfast, lunch, dinner, and brunch, along with wine and drinks that suit both weekdays and weekends—whether you’re staying at the hotel or simply coming by to eat.",
        de: "Varbergs Kusthotell liegt direkt am Meer, und im Haus befindet sich das Restaurant Severins – viele kommen allein wegen des Essens. Im Mittelpunkt stehen Fisch, Meeresfrüchte und Zutaten der Saison, oft mit nordischen Aromen und einem ruhigen, durchdachten Ausdruck. Das Restaurant serviert Frühstück, Mittagessen, Abendessen und Brunch sowie Wein und Drinks für Alltag und Wochenende – egal, ob man im Hotel wohnt oder nur zum Essen herkommt."
      },
      cta1Text: { sv: "Visa meny", en: "View menu", de: "Speisekarte" },
      cta1Href: "https://www.apelviken.se/solviken-meny",
      cta2Text: { sv: "Vägbeskrivning", en: "Directions", de: "Route" },
      cta2Href:
        "https://www.google.com/maps/dir/57.502272,12.087438/Solviken,+T%C3%A5ngk%C3%B6rarv%C3%A4gen+1,+432+54+Varberg/@57.2950696,11.8317533,75989m/data=!3m1!1e3!4m9!4m8!1m1!4e1!1m5!1m1!1s0x46502af989b79f2d:0xfb2919c395412c94!2m2!1d12.2488569!2d57.084622?entry=ttu&g_ep=EgoyMDI2MDEyOC4wIKXMDSoASAFQAw%3D%3D"
    }
  },
 {
    id: "sektion73Pin_321gfdfgdfghgkgjyytr",
    label: { sv: "Apelviken Livs", en: "Apelviken Grocery", de: "Apelviken Laden" },
        filter: "Butiker",
    iconKey: "livs", // använd en befintlig iconKey som finns i sektion73PinIcons
    ui: {
      bubbleBg: "#fff",
      pointerTop: "#fff"
    },
    lngLat: sektion73livs.lngLat,
    modal: {
      kicker: { sv: "BUTIK", en: "SHOP", de: "LADEN" },
      title: { sv: "Apelviken Livs", en: "Apelviken Grocery", de: "Apelviken Laden" },
      images: [
        "https://res.cloudinary.com/dmgmoisae/image/upload/v1769981777/jpeg-optimizer__olles_lvfrdd.png",
        "https://res.cloudinary.com/dmgmoisae/image/upload/v1769981778/jpeg-optimizer__olles66_t5wk9r.png",
        "https://res.cloudinary.com/dmgmoisae/image/upload/v1769981778/jpeg-optimizer__olles11_zlhlgw.png",
        "https://res.cloudinary.com/dmgmoisae/image/upload/v1769981815/68b2a7_de72b5f91dc54bcdbcfc8714b514e253_mv2_kfel0e.jpg"
      ],
      h: { sv: "Apelviken Livs & Strandcafé ", en: "Apelviken Grocery & Beach Café", de: "Apelviken Laden & Strandcafé" },
      p: {
        sv: "Vikens lokala butik som de flesta bara kallar affär’n. Här finns det man behöver för dagen vid stranden eller på campingen. Nybakade frallor tidigt på morgonen, kaffe som går att ta med, enklare mat, glass och ett brett sortiment för vardag och semester. Öppet under säsong och i ständig rörelse från morgon till kväll.",
        en: "The bay’s local shop—most people just call it “the store.” You’ll find what you need for a day at the beach or on the campsite: freshly baked rolls early in the morning, takeaway coffee, simple food, ice cream, and a wide selection for everyday life and holidays. Open in season and busy from morning to evening.",
        de: "Der lokale Laden in der Bucht – die meisten nennen ihn einfach „den Laden“. Hier gibt es alles, was man für den Tag am Strand oder auf dem Campingplatz braucht: frisch gebackene Brötchen am frühen Morgen, Kaffee zum Mitnehmen, einfache Mahlzeiten, Eis und ein breites Sortiment für Alltag und Urlaub. In der Saison geöffnet und von morgens bis abends in Bewegung."
      },
      cta1Text: { sv: "Läs mer", en: "Learn more", de: "Mehr erfahren" },
      cta1Href: "https://www.apelviken.se/apelvikenlivs",
      cta2Text: { sv: "Vägbeskrivning", en: "Directions", de: "Route" },
      cta2Href: "https://www.google.com/maps/dir/57.502272,12.087438/Apelviken+Livs,+T%C3%A5ngk%C3%B6rarv%C3%A4gen+3,+432+54+Varberg/@57.2983075,11.831503,75983m/data=!3m2!1e3!4b1!4m9!4m8!1m1!4e1!1m5!1m1!1s0x46502af983cea49f:0xa786b4e1dbc71398!2m2!1d12.250155!2d57.0848547?entry=ttu&g_ep=EgoyMDI2MDEyOC4wIKXMDSoASAFQAw%3D%3D"
    }
  },
   {
    id: "sektion73Pin_321ggdfgvbnf",
    label: { sv: "Apelviken Livs", en: "Apelviken Grocery", de: "Apelviken Laden" },
        filter: "Boenden",
    iconKey: "apelviken", // använd en befintlig iconKey som finns i sektion73PinIcons
    ui: {
      bubbleBg: "#366591",
      pointerTop: "#366591"
    },
    lngLat: sektion73destinationapelviken.lngLat,
    modal: {
      kicker: { sv: "BUTIK", en: "SHOP", de: "LADEN" },
      title: { sv: "Apelviken Livs", en: "Apelviken Grocery", de: "Apelviken Laden" },
      images: [
        "https://res.cloudinary.com/dmgmoisae/image/upload/v1769983439/68b2a7_72f6713a71b74fb7b0a4e7a412f16c5e_mv2_jhyvcq.jpg",
        "https://res.cloudinary.com/dmgmoisae/image/upload/v1769983428/68b2a7_52e3c49890434442b80a60c563124fb5_mv2_uvj50b.jpg",
        "https://res.cloudinary.com/dmgmoisae/image/upload/v1769983458/68b2a7_e7a978bcdd3e4995a4a2a48c87669705_mv2_ahpjmo.jpg",
        "https://res.cloudinary.com/dmgmoisae/image/upload/v1769983462/68b2a7_e5363328ffb14dedb976e83ffc1abaa5_mv2_vrzs29.jpg"
      ],
      h: { sv: "Destination Apelviken", en: "Destination Apelviken", de: "Destination Apelviken" },
      p: {
        sv: "Beläget strax söder om Varbergs stadskärna, med gång- och cykelavstånd till både strand och centrum. Platsen har vuxit fram över tid, från enkel tältplats till ett sammanhållet område med camping, hotell, mycket att göra och flertalet restauranger. Ett vardagsliv som pågår året runt, med mycket nära och utan behov av att ta bilen.",
        en: "Located just south of Varberg’s city centre, within walking and cycling distance of both the beach and downtown. The area has grown over time—from a simple tent site to a cohesive destination with camping, a hotel, plenty to do, and several restaurants. Everyday life goes on here year-round, with everything close by and no real need for a car.",
        de: "Etwas südlich vom Stadtzentrum Varbergs gelegen, mit kurzer Fuß- und Radentfernung sowohl zum Strand als auch in die Innenstadt. Der Ort ist über die Jahre gewachsen – von einem einfachen Zeltplatz zu einem zusammenhängenden Gebiet mit Camping, Hotel, viel zu tun und mehreren Restaurants. Ein Alltag, der das ganze Jahr über läuft: vieles in der Nähe und ohne dass man unbedingt das Auto braucht."
      },
      cta1Text: { sv: "Läs mer", en: "Learn more", de: "Mehr erfahren" },
      cta1Href: "https://www.apelviken.se/",
      cta2Text: { sv: "Vägbeskrivning", en: "Directions", de: "Route" },
      cta2Href: "https://www.google.com/maps/dir/57.502272,12.087438/Destination+Apelviken+AB,+Sanatoriev%C3%A4gen+4,+432+53+Varberg/@57.2999731,11.8313388,76144m/data=!3m2!1e3!4b1!4m9!4m8!1m1!4e1!1m5!1m1!1s0x46502af829613979:0x5e859dbc3c4cea18!2m2!1d12.2478642!2d57.0879688?entry=ttu&g_ep=EgoyMDI2MDEyOC4wIKXMDSoASAFQAw%3D%3D"
    }
  },
  // Tångkörarvägen 1
  {
    id: "sektion73Pin_surfcenter_0000",
    label: { sv: "Tångkörarvägen 1", en: "Tångkörarvägen 1", de: "Tångkörarvägen 1" },
         filter: "Att göra",
     priority: "secondary",
    iconKey: "surfcenter",
    ui: {
      bubbleBg: "#519AC7",
      pointerTop: "#519AC7"
    },
    lngLat: sektion73surfcenter.lngLat,
    modal: {
      kicker: { sv: "PUNKT", en: "STOP", de: "STOPP" },
      title: { sv: "Tångkörarvägen 1", en: "Tångkörarvägen 1", de: "Tångkörarvägen 1" },
      images: [
        "https://res.cloudinary.com/dmgmoisae/image/upload/v1769981780/jpeg-optimizer_surfcenter_uyq6xc.png",
        "https://static.wixstatic.com/media/68b2a7_380cfcd94afd4081b7cd08ef993064fc~mv2.jpg/v1/fill/w_1905,h_953,al_b,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/68b2a7_380cfcd94afd4081b7cd08ef993064fc~mv2.jpg",
        "https://static.wixstatic.com/media/8332c8_9ed66fba3e3f463bb2082b68f28ecae6~mv2_d_1900_1495_s_2.jpg/v1/fill/w_381,h_459,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/8332c8_9ed66fba3e3f463bb2082b68f28ecae6~mv2_d_1900_1495_s_2.jpg",
        "https://static.wixstatic.com/media/68b2a7_877bd500f095424698cc8359e7289382~mv2.jpg/v1/fill/w_571,h_401,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/68b2a7_877bd500f095424698cc8359e7289382~mv2.jpg"
      ],
      h: { sv: "Apelvikens surfcenter", en: "Apelviken Surf Center", de: "Surfcenter Apelviken" },
      p: {
        sv: "Platsen där surfkulturen i viken tar form. Här har människor lärt sig stå på brädan i decennier, med havet precis intill och vädret som medspelare. Kurser och uthyrning anpassas efter dagens förhållanden, ibland vindsurf, ibland vågsurf, ibland SUP. Oavsett nivå handlar det om att komma ut på vattnet, läsa vinden och ta med sig ett nytt minne hem.",
        en: "The place where the bay’s surf culture takes shape. People have been learning to stand on the board here for decades, with the sea right next to you and the weather as a partner. Lessons and rentals adapt to the day’s conditions—sometimes windsurfing, sometimes surfing, sometimes SUP. Whatever your level, it’s about getting out on the water, reading the wind, and taking a new memory home.",
        de: "Der Ort, an dem die Surfkultur in der Bucht Form annimmt. Seit Jahrzehnten lernen Menschen hier aufs Brett zu kommen – mit dem Meer direkt daneben und dem Wetter als Mitspieler. Kurse und Verleih richten sich nach den Bedingungen des Tages: mal Windsurfen, mal Wellenreiten, mal SUP. Unabhängig vom Niveau geht es darum, aufs Wasser zu kommen, den Wind zu lesen und eine neue Erinnerung mit nach Hause zu nehmen."
      },
      cta1Text: { sv: "Läs mer", en: "Learn more", de: "Mehr erfahren" },
      cta1Href: "https://www.apelviken.se/surfcenter",
      cta2Text: { sv: "Vägbeskrivning", en: "Directions", de: "Route" },
      cta2Href:
        "https://www.google.com/maps/dir/57.502272,12.087438/Apelviken+Livs,+T%C3%A5ngk%C3%B6rarv%C3%A4gen+3,+432+54+Varberg/@57.2983075,11.831503,75983m/data=!3m2!1e3!4b1!4m9!4m8!1m1!4e1!1m5!1m1!1s0x46502af983cea49f:0xa786b4e1dbc71398!2m2!1d12.250155!2d57.0848547?entry=ttu&g_ep=EgoyMDI2MDEyOC4wIKXMDSoASAFQAw%3D%3D"
    }
  },

  // Dina befintliga pins (oförändrade)
  {
    id: "sektion73Pin_tangkorar_231fds1",
    label: { sv: "Punkt 1", en: "Stop 1", de: "Stopp 1" },
         filter: "Mat & dryck",
    iconKey: "johns",
    ui: { bubbleBg: "#20212B", pointerTop: "#20212B" },
    lngLat: sektion73Tangkorar_4.lngLat,
    modal: {
      kicker: { sv: "PUNKT 1", en: "STOP 1", de: "STOPP 1" },
      title: { sv: "Tångkörarvägen 4", en: "Tångkörarvägen 4", de: "Tångkörarvägen 4" },
      images: [
        "https://res.cloudinary.com/dmgmoisae/image/upload/v1769971995/64be59cd-56ce-4fc7-8c64-6094ec83203e_xlrtd5.jpg",
        "https://res.cloudinary.com/dmgmoisae/image/upload/v1769972003/2f763ab2-4f67-49ad-b759-7926fcc74c78_bzgnuc.jpg",
        "https://res.cloudinary.com/dmgmoisae/image/upload/v1769972008/253f9f0f-e31b-4654-bc1a-7d8190b84ae6_l2gxmv.jpg",
        "https://res.cloudinary.com/dmgmoisae/image/upload/v1769972018/DSF0505_k8gcge.jpg"
      ],
      imgSrc: { sv: "Bildkälla: —", en: "Image source: —", de: "Bildquelle: —" },
      h: { sv: "John’s Place", en: "John’s Place", de: "John’s Place" },
      p: {
        sv: "John’s Place ligger i ett lågt trähus mitt på Apelvikens strand. Maten lagas över öppen eld med råvaror som följer säsong, och rummen är varma även när vädret är ruffigt. Hit kommer man för att äta nära havet, i en miljö som vuxit fram långsamt och känns mer som ett hem än en restaurang.",
        en: "John’s Place sits in a low wooden house right on Apelviken beach. Food is cooked over open fire with seasonal ingredients, and the rooms feel warm even when the weather turns rough. You come here to eat close to the sea, in a place that has grown slowly and feels more like a home than a restaurant.",
        de: "John’s Place liegt in einem niedrigen Holzhaus direkt am Strand von Apelviken. Gekocht wird über offenem Feuer mit Zutaten der Saison, und die Räume sind auch bei rauem Wetter angenehm warm. Man kommt her, um nah am Meer zu essen – an einem Ort, der langsam gewachsen ist und sich eher wie ein Zuhause als wie ein Restaurant anfühlt."
      },
      cta1Text: { sv: "Visa meny", en: "View menu", de: "Speisekarte" },
      cta1Href: "https://johnsplace.nu/meny/",
      cta2Text: { sv: "Vägbeskrivning", en: "Directions", de: "Route" },
      cta2Href: "https://www.google.com/maps/dir/57.502272,12.087438/John's+Place,+T%C3%A5ngk%C3%B6rarv%C3%A4gen+4,+432+54+Varberg/@57.2969173,11.831503,75986m/data=!3m2!1e3!4b1!4m9!4m8!1m1!4e1!1m5!1m1!1s0x46502afeb21e2233:0x56c03d695b7db20b!2m2!1d12.2580971!2d57.083388?entry=ttu&g_ep=EgoyMDI2MDEyOC4wIKXMDSoASAFQAw%3D%3D"
    }
  },
  {
    id: "sektion73Pin_sanatorie_0002",
    label: { sv: "Punkt 2", en: "Stop 2", de: "Stopp 2" },
              filter: "",
    iconKey: "nisses",
    ui: { bubbleBg: "#FFC33E", pointerTop: "#FFC33E" },
    lngLat: sektion73Sanatorie_4.lngLat,
    modal: {
      kicker: { sv: "PUNKT 2", en: "STOP 2", de: "STOPP 2" },
      title: { sv: "Sanatorievägen 4", en: "Sanatorievägen 4", de: "Sanatorievägen 4" },
      images: [
        "https://res.cloudinary.com/dmgmoisae/image/upload/v1770067031/original_ao0xjw.png",
        "https://res.cloudinary.com/dmgmoisae/image/upload/v1770067059/original_nr7ywh.png",
        "https://res.cloudinary.com/dmgmoisae/image/upload/v1770067091/original_dfyggl.png",
        "https://res.cloudinary.com/dmgmoisae/image/upload/v1770067072/apelvik13-e1530700582723_oszkhm.jpg"
      ],
      imgSrc: { sv: "Bildkälla: —", en: "Image source: —", de: "Bildquelle: —" },
      h: { sv: "Vår reception", en: "Our reception", de: "Unsere Rezeption" },
      p: {
        sv: "Receptionen finns här om något dyker upp under vistelsen. Frågor, funderingar eller bara ett behov av att få lite hjälp på vägen. Här får man tips om området, praktiska svar och hjälp med det som behövs.Aktuella öppettider hittar du via länken nedan.",
        en: "Reception is here if anything comes up during your stay—questions, thoughts, or simply a need for a bit of help along the way. You’ll get local tips, practical answers, and assistance with what you need. Current opening hours can be found via the link below.",
        de: "Die Rezeption ist da, wenn während des Aufenthalts etwas auftaucht – Fragen, Anliegen oder einfach der Bedarf an ein wenig Hilfe. Hier gibt es Tipps zur Umgebung, praktische Antworten und Unterstützung bei dem, was man braucht. Die aktuellen Öffnungszeiten findest du über den Link unten."
      },
      cta1Text: { sv: "Se öppetider", en: "See opening hours", de: "Öffnungszeiten" },
      cta1Href: "/kundButiker",
      cta2Text: { sv: "Visa vägen", en: "Get directions", de: "Route anzeigen" },
      cta2Href: "https://www.google.com/maps/dir/57.502272,12.087438/Destination+Apelviken+AB,+Sanatoriev%C3%A4gen+4,+432+53+Varberg/@57.2985223,11.831482,75982m/data=!3m1!1e3!4m9!4m8!1m1!4e1!1m5!1m1!1s0x46502af829613979:0x5e859dbc3c4cea18!2m2!1d12.2478642!2d57.0879688?entry=ttu&g_ep=EgoyMDI2MDEyOC4wIKXMDSoASAFQAw%3D%3D"
    }
  },
  {
    id: "sektion73Pin_tangkorar_0003",
    label: { sv: "Punkt 3", en: "Stop 3", de: "Stopp 3" },
              filter: "Mat & dryck",     
    iconKey: "brittas",
    ui: { bubbleBg: "#1D252C", pointerTop: "#1D252C" },
    lngLat: sektion73Tangkorar_2.lngLat,
    modal: {
      kicker: { sv: "PUNKT 3", en: "STOP 3", de: "STOPP 3" },
      title: { sv: "Tångkörarvägen 2", en: "Tångkörarvägen 2", de: "Tångkörarvägen 2" },
      images: [
        "https://res.cloudinary.com/dmgmoisae/image/upload/v1769972155/brittas_mayy5x.png",
        "https://res.cloudinary.com/dmgmoisae/image/upload/v1769972152/jh_riqe6e.png",
        "https://res.cloudinary.com/dmgmoisae/image/upload/v1769972154/78_emx1je.png",
        "https://res.cloudinary.com/dmgmoisae/image/upload/v1769972157/832_nhwoaf.png"
      ],
      imgSrc: { sv: "Bildkälla: —", en: "Image source: —", de: "Bildquelle: —" },
      h: { sv: "Brittas Strandveranda", en: "Brittas Beach Veranda", de: "Brittas Strandveranda" },
      p: {
        sv: "Vikens ställe för enkla, rejäla rätter och fruktiga drinkar, ofta med sand kvar mellan tårna. Hit droppar man in utan planer, sitter nära andra och låter musik, utsikt och umgänge ta plats. Kvällarna blir sällan korta och stämningen formas av dem som råkar vara där just då.",
        en: "The bay’s spot for simple, hearty dishes and fruity drinks—often with sand still between your toes. You drop in without plans, sit close to others, and let the music, the view, and the company take over. Evenings are rarely short, and the vibe is shaped by whoever happens to be there.",
        de: "Der Ort in der Bucht für einfache, kräftige Gerichte und fruchtige Drinks – oft noch mit Sand zwischen den Zehen. Man kommt ohne Plan vorbei, sitzt nah bei anderen und lässt Musik, Aussicht und Gesellschaft Raum bekommen. Die Abende werden selten kurz, und die Stimmung entsteht aus denen, die gerade da sind."
      },
      cta1Text: { sv: "Läs mer", en: "Learn more", de: "Mehr erfahren" },
      cta1Href: "https://brittas.se/",
      cta2Text: { sv: "Vägbeskrivning", en: "Directions", de: "Route" },
      cta2Href: "https://www.google.com/maps/dir/57.502272,12.087438/Brittas+Strandveranda,+T%C3%A5ngk%C3%B6rarv%C3%A4gen+2,+432+54+Varberg/@57.1433862,12.1356372,21761m/data=!3m1!1e3!4m9!4m8!1m1!4e1!1m5!1m1!1s0x46502afeb21e2233:0x2d47a8d67dec7ee4!2m2!1d12.2552089!2d57.084749?entry=ttu&g_ep=EgoyMDI2MDEyOC4wIKXMDSoASAFQAw%3D%3D"
    }
  },
  {
    id: "sektion73Pin_tangkorar_0004",
    label: { sv: "Punkt 4", en: "Stop 4", de: "Stopp 4" },
              filter: "Mat & dryck",     
    iconKey: "olles",
    ui: { bubbleBg: "#fff", pointerTop: "#fff" },
    lngLat: sektion73Tangkorar_10.lngLat,
    modal: {
      kicker: { sv: "PUNKT 4", en: "STOP 4", de: "STOPP 4" },
      title: { sv: "Tångkörarvägen 10", en: "Tångkörarvägen 10", de: "Tångkörarvägen 10" },
      images: [
        "https://res.cloudinary.com/dmgmoisae/image/upload/v1769972291/olles321_agkca3.png",
        "https://res.cloudinary.com/dmgmoisae/image/upload/v1769972289/olles2_oudzkl.png",
        "https://res.cloudinary.com/dmgmoisae/image/upload/v1769972289/olles5_wst8fl.png",
        "https://res.cloudinary.com/dmgmoisae/image/upload/v1769972288/olles3_nj8cgt.png"
      ],
      imgSrc: { sv: "Bildkälla: —", en: "Image source: —", de: "Bildquelle: —" },
      h: { sv: "&Olles", en: "&Olles", de: "&Olles" },
      p: {
        sv: "&Olles ligger längst ner i viken, nära sanden och med gott om plats runtomkring. Det är ett ställe som fungerar bäst när det är folk i rörelse. Drop in är vanligt, borden delas och stämningen byggs av gästerna själva. Mat, dryck och musik samsas under samma tak och dagarna glider ofta över i kväll utan tydlig gräns.",
        en: "&Olles sits at the far end of the bay, close to the sand with plenty of space around. It’s a place that works best when people are on the move. Drop-ins are common, tables are shared, and the atmosphere is built by the guests themselves. Food, drinks, and music live under the same roof, and days often slide into evening without a clear line between them.",
        de: "&Olles liegt ganz unten in der Bucht, nah am Sand und mit viel Platz drumherum. Am besten funktioniert es, wenn Menschen in Bewegung sind. Spontanes Vorbeikommen ist üblich, Tische werden geteilt und die Stimmung entsteht durch die Gäste selbst. Essen, Drinks und Musik unter einem Dach – und der Tag gleitet oft ohne klare Grenze in den Abend über."
      },
      cta1Text: { sv: "Visa meny", en: "View menu", de: "Speisekarte" },
      cta1Href: "https://www.olles.nu/meny/",
      cta2Text: { sv: "Vägbeskrivning", en: "Directions", de: "Route" },
      cta2Href: "https://www.google.com/maps/dir/57.502272,12.087438/%26Olles,+T%C3%A5ngk%C3%B6rarv%C3%A4gen+10,+432+54+Varberg/@57.297359,11.8315835,75985m/data=!3m1!1e3!4m9!4m8!1m1!4e1!1m5!1m1!1s0x46502b1d2d80b947:0x4bd0492009aae2ae!2m2!1d12.2632701!2d57.0773842?entry=ttu&g_ep=EgoyMDI2MDEyOC4wIKXMDSoASAFQAw%3D%3D"
    }
  },
  {
   id: "sektion73Pin_tangkorar_0005",
    label: { sv: "Punkt 5", en: "Stop 5", de: "Stopp 5" },
    filter: "Mat & dryck",
    iconKey: "strandkollektivet_original",
    ui: { bubbleBg: "#fff", pointerTop: "#fff" },
    lngLat: sektion73Tangkorar_17.lngLat,
    modal: {
      kicker: { sv: "PUNKT 5", en: "STOP 5", de: "STOPP 5" },
      title: { sv: "Tångkörarvägen 17", en: "Tångkörarvägen 17", de: "Tångkörarvägen 17" },
      images: [
        "https://res.cloudinary.com/dmgmoisae/image/upload/v1769982595/jpeg-optimizer_vcbcvb_swupbf.png",
        "https://res.cloudinary.com/dmgmoisae/image/upload/v1769982593/jpeg-optimizer_hus_pwiwnt.png", 
        "https://res.cloudinary.com/dmgmoisae/image/upload/v1769982592/jpeg-optimizer_vbccvb_ezbwed.png",
        "https://res.cloudinary.com/dmgmoisae/image/upload/v1769982596/jpeg-optimizer_dddfgs_a5obtp.png"
      ],
      imgSrc: { sv: "Bildkälla: —", en: "Image source: —", de: "Bildquelle: —" },
      h: { sv: "Strandkollektivet", en: "Strandkollektivet", de: "Strandkollektivet" },
      p: {
        sv: "Med inspiration från otaliga resor och intryck från kulturer, människor, mat och dryck har Strandkollektivet vuxit fram. En plats vid stranden där all den inspiration världen gett får ta form. En plats där möten sker, stunder njuts och minnen skapas.",
        en: "Inspired by countless journeys and impressions from cultures, people, food, and drink, Strandkollektivet has taken shape. A place by the beach where all that inspiration can come to life. A place for meetings, for enjoying the moment, and for making memories.",
        de: "Inspiriert von unzähligen Reisen und Eindrücken aus Kulturen, Menschen, Essen und Trinken ist Strandkollektivet entstanden. Ein Ort am Strand, an dem all die Inspiration, die die Welt gegeben hat, Form annehmen darf. Ein Ort für Begegnungen, für genossene Momente und für Erinnerungen."
      },
      cta1Text: { sv: "Läs mer", en: "Learn more", de: "Mehr erfahren" },
      cta1Href: "https://strandkollektivet.se",
      cta2Text: { sv: "Visa vägen", en: "Get directions", de: "Route anzeigen" },
      cta2Href: "https://www.google.com/maps/search/?api=1&query=T%C3%A5ngk%C3%B6rarv%C3%A4gen%2017%2C%20432%2054%20Varberg"
    }
},
  {
    id: "sektion73Pin_ny_plats_0006",
    label: { sv: "Ny Plats", en: "New place", de: "Neuer Ort" },
     filter: "Mat & dryck",
    iconKey: "da", 
    ui: { 
      bubbleBg: "#fff", 
      pointerTop: "#fff" 
    },
    lngLat: [12.247731, 57.085570], // Koordinater som du angav
    modal: {
      kicker: { sv: "NY DESTINATION", en: "NEW DESTINATION", de: "NEUES ZIEL" },
      title: { sv: "Okänd Plats", en: "Unknown place", de: "Unbekannter Ort" },
      images: [
        "https://res.cloudinary.com/dmgmoisae/image/upload/v1769971746/nisses_axsb1p.png",
        "https://res.cloudinary.com/dmgmoisae/image/upload/v1769971689/68b2a7_3cf511320cef420e9b792866ff63be9b_mv2_y3gzxq.jpg",
        "https://res.cloudinary.com/dmgmoisae/image/upload/v1769971684/68b2a7_1a49d240ef664fcd9020bd989aa99175_mv2_ecjt6f.jpg",
        "https://res.cloudinary.com/dmgmoisae/image/upload/v1769971668/original_hz62hj.jpg"
      ],
      imgSrc: { sv: "Bildkälla: —", en: "Image source: —", de: "Bildquelle: —" },
        h: { sv: "Nisses Bodega", en: "Nisse’s Bodega", de: "Nisses Bodega" },
      p: {
        sv: "Kort sagt, en okomplicerad restaurang vid poolkanten. För alla, lika mycket för campinggäster och för dig som bor i Varberg, som kvällsflanörer utmed strandpromenaden. För dig som söker svalka i en välhumlad pilsner eller härlig sangria och när du tröttnat på poolplask långt före barnen. Och för frukost, hemlagad, rejäl streetfood. Du slinker in lite som du är; badtofflor, shorts och håret fortfarande vått efter badet eller kostym om du föredrar det. En samlingsplats i hjärtat av campingplatsen där du tar en kaffe, läser tidningen eller bara kollar folk en stund.",
        en: "In short: an uncomplicated restaurant by the pool. For everyone—campers and Varberg locals alike, as well as evening strollers along the promenade. For you who want to cool off with a well-hopped pilsner or a great sangria, especially when you’re tired of pool splashing long before the kids are. And for breakfast: homemade, hearty street food. You drop in as you are—flip-flops, shorts, hair still wet from a swim, or a suit if that’s your thing. A meeting point in the heart of the campsite where you grab a coffee, read the paper, or just watch the world for a while.",
        de: "Kurz gesagt: ein unkompliziertes Restaurant direkt am Pool. Für alle – für Campinggäste genauso wie für Varberger und für Abendspaziergänger an der Promenade. Für dich, der sich mit einem gut gehopften Pils oder einer schönen Sangria abkühlen will – besonders wenn du vom Poolgeplansche schon lange vor den Kindern genug hast. Und zum Frühstück: hausgemachtes, kräftiges Streetfood. Du kommst einfach so rein, wie du bist – Badelatschen, Shorts, Haare noch nass vom Schwimmen, oder Anzug, wenn du das lieber magst. Ein Treffpunkt im Herzen des Campingplatzes: Kaffee holen, Zeitung lesen oder einfach kurz Leute schauen."
      },
      cta1Text: { sv: "Visa meny", en: "View menu", de: "Speisekarte" },
      cta1Href: "https://www.apelviken.se/nisses-bodega",
      cta2Text: { sv: "Visa vägen", en: "Get directions", de: "Route anzeigen" },
      cta2Href: "https://www.google.com/maps/dir/57.502272,12.087438/Nisses+Bodega,+Sanatoriev%C3%A4gen+4,+432+53+Varberg/@57.2983075,11.831503,75983m/data=!3m2!1e3!4b1!4m9!4m8!1m1!4e1!1m5!1m1!1s0x4653ede147d2886f:0xfee8375fc04e0d5f!2m2!1d12.2478293!2d57.0854771?entry=ttu&g_ep=EgoyMDI2MDEyOC4wIKXMDSoASAFQAw%3D%3D"
    }
  }
];


function sektion73CreatePinEl(pin) {
  const wrap = document.createElement("div");
  wrap.className = "sektion73PinWrap";
  wrap.id = pin.id;

  /* NYTT: gör iconKey tillgängligt för CSS */
  wrap.dataset.iconKey = String(pin.iconKey || "home");

wrap.dataset.filter = sektion73PinFilterList(pin.filter).join("|");

/* NYTT: gör priority tillgängligt för logik/DOM */
wrap.dataset.priority = String(pin.priority || "priority").trim().toLowerCase();

  // PER-PIN CSS vars (endast färger)
  const bubbleBg = (pin.ui && pin.ui.bubbleBg) ? String(pin.ui.bubbleBg) : "rgba(255,255,255,.92)";
  const pointerTop = (pin.ui && pin.ui.pointerTop) ? String(pin.ui.pointerTop) : bubbleBg;

  wrap.style.setProperty("--sektion73-pin-bubble-bg", bubbleBg);
  wrap.style.setProperty("--sektion73-pin-pointer-top", pointerTop);

  /* NYTT: sätt icon/text-färg för mörka bubblor (Solviken/Brittas etc) */
  const sektion73ForceWhiteKeys = new Set(["solviken", "brittas", "strandkollektivet"]);
  if (sektion73ForceWhiteKeys.has(String(pin.iconKey || "").toLowerCase())) {
    wrap.style.color = "#ffffff";      // currentColor
  }

  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "sektion73PinBubble sektion73PinBtn";
  btn.setAttribute("aria-label", pin.label);

  const dot = document.createElement("span");
  dot.className = "sektion73PinDot";
  dot.setAttribute("aria-hidden", "true");

  const ico = document.createElement("span");
  ico.className = "sektion73PinIco";
  ico.setAttribute("aria-hidden", "true");
  ico.innerHTML = sektion73PinIcons[pin.iconKey] || sektion73PinIcons.home;

  btn.appendChild(dot);
  btn.appendChild(ico);

  const pointer = document.createElement("div");
  pointer.className = "sektion73PinPointer";
  pointer.setAttribute("aria-hidden", "true");

  wrap.appendChild(btn);
  wrap.appendChild(pointer);

  // micro hover
  btn.addEventListener("mouseenter", () => {
    btn.style.transform = "translateY(0px)";
    btn.style.boxShadow = "none";
  });
  btn.addEventListener("mouseleave", () => {
    btn.style.transform = "translateY(0)";
    btn.style.boxShadow = "none";
  });

  return { wrap, btn };
}



  const sektion73MarkersById = Object.create(null);
let sektion73IsZoomingToPin = false;
let sektion73PendingPinId = null;
let sektion73ActiveMoveEndHandler = null;

/* =========================
   FILTER UI (BOTTOM CENTER)
   - Skapar en "slider" med filter-knappar
   - Klick på filter: döljer pins som inte matchar
   - Påverkar inte befintlig CSS/logik (ny, scoped DOM + egen style-tag)
   ========================= */

const sektion73FilterState = {
  active: "",      // "" = visa allt
  preView: null    // sparar vy innan första filter aktiveras
};

function sektion73NormFilter(v) {
  return String(v || "").trim().toLowerCase();
}

function sektion73PinFilterList(pinFilter) {
  if (Array.isArray(pinFilter)) {
    return pinFilter.map((f) => String(f || "").trim()).filter(Boolean);
  }
  const s = String(pinFilter || "").trim();
  return s ? [s] : [];
}

function sektion73PinMatchesFilter(pinFilter, fNorm) {
  return sektion73PinFilterList(pinFilter).some((f) => sektion73NormFilter(f) === fNorm);
}

function sektion73GetAvailableFilters() {
  const set = new Set();
  (sektion73Pins || []).forEach((p) => {
    sektion73PinFilterList(p && p.filter).forEach((f) => set.add(f));
  });

  const arr = Array.from(set);
  arr.sort((a, b) => a.localeCompare(b, "sv"));
  return arr; // <-- FIX: ingen "Alla" här, och ingen syntaxmiss
}


function sektion73InjectFilterCSS() {
  if (document.getElementById("sektion73FilterCss")) return;
  const style = document.createElement("style");
  style.id = "sektion73FilterCss";
  style.textContent = `
#sektion73MapFilterBar{
  position: fixed;
  left: 50%;
  bottom: 20px;

  /* Basläge: synlig */
  transform: translateX(-50%) translateY(0);
  opacity: 1;

  /* Matcha modalens timing */
  transition:
    transform var(--sektion73-modal-dur) var(--sektion73-modal-ease),
    opacity 180ms ease;

  will-change: transform, opacity;

  z-index: 999;
  width: min(920px, calc(100vw - 24px));
  pointer-events: auto;
}

/* Hidden-läge: ner + fade + klick-skydd */
#sektion73MapFilterBar.sektion73FilterBarHidden{
  transform: translateX(-50%) translateY(86px);
  opacity: 0;
  pointer-events: none;
}
#sektion73MapFilterRail {
    display: flex;
    gap: 0.4rem;
    align-items: center;
    justify-content: center;
    padding: 0.4rem 0.5rem;
    border-radius: 999px;
    background: #fff;
    border: none;
    backdrop-filter: blur(3px);
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    width: max-content;
    place-self: center;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
}
    #sektion73MapFilterRail::-webkit-scrollbar{ display:none; }
.sektion73FilterLabel {
    font-family: var(--sektion73-font);
    font-size: 0.875rem;
    font-weight: 600;
    color: rgb(64, 61, 59);
    white-space: nowrap;
    user-select: none;
    margin-right: 0px;
    display: none;
}
.sektion73FilterClose {
    width: 20px;
    height: 20px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 999px;
    margin-left: 0px;
    border: none;
    background: transparent;
    fill: currentColor;
    stroke: currentColor;
    stroke-width: 0;
    margin-left: -2px;
}

.sektion73FilterClose:hover{
  background: rgba(255,255,255,5);
}
.sektion73FilterIco svg {
    width: 20px;
    height: 20px;
    display: block;
    fill: currentColor;
    stroke: none;
    stroke-linecap: round;
    stroke-linejoin: round;
}
.sektion73FilterBtn {
    all: unset;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 6px 12px;
    border-radius: 999px;
    border: none;
    background: #f3f3f3;
    color: rgb(64, 61, 59);
    font-family: var(--sektion73-font);
    font-size: 14.5px;
    font-weight: 500;
    white-space: nowrap;
    user-select: none;
    transition: 0.15s ease-in-out;
    text-transform: none;
}
    .sektion73FilterBtn:hover{
background: #E6E1DD;
    }
    .sektion73FilterBtn:active{
background: #DDD7D2;
    }
.sektion73ViewToggleGroup {
    display: inline-flex;
    gap: 0;
    border-radius: 999px;
    overflow: hidden;
    background: #F6F3F1;
    width: 100% !important;
    min-width: max-content;
}
.sektion73ViewToggleBtn {
    all: unset;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 6px 10px;
    background: #f3f3f3;
    color: rgb(64, 61, 59);
    font-family: var(--sektion73-font);
    font-size: 14.5px;
    font-weight: 500;
    white-space: nowrap;
    user-select: none;
    transition: 0.15s ease-in-out;
}
.sektion73ViewToggleBtn:hover{
  background: #E6E1DD;
}
.sektion73ViewToggleBtn:active{
  background: #DDD7D2;
}
.sektion73ViewToggleBtn[aria-pressed="true"]{
  background: #6E99AE;
  color: #fff;
  font-weight: 700;
}

    @media (max-width: 768px){
#sektion73MapFilterBar {
    bottom: 0px;
            width: 100% !important;
}
.sektion73ModalGalleryTop, 
.sektion73ModalGallery,
.sektion73ModalThumb {
height: 297px !important;
min-height: 297px !important;
z-index: 0 !important;
aspect-ratio: auto !important;
}
#sektion73MapFilterRail {
    display: flex;
    gap: 12px;
    align-items: center;
    justify-content: start;
    padding: 13px 17px 20px 17px;
    overflow-y: hidden;
    border-radius: 0px;
    width: 100% !important;
}
      }
.sektion73FilterBtn[aria-pressed="true"] {
    background: #6E99AE;
    border-color: rgba(90, 60, 0, .22);
    color: #fff;
    font-weight: 600;
}

    .sektion73FilterIco{
display:inline-flex;
    }
  `;
  document.head.appendChild(style);
}


function sektion73BuildFilterIconBank() {
  const bank = [
`<svg width="800" height="800" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentcolor"><path d="M17 13V8.9c1.7-.2 3-1.7 3-3.4C20 3.6 18.4 2 16.5 2c-1.8 0-3.2 1.3-3.4 3h-2.3l-.9-2.3C9.8 2.3 9.4 2 9 2H5c-.6 0-1 .4-1 1s.4 1 1 1h3.3l.3 1H8c-.6 0-1 .4-1 1v7c0 2.4 1.7 4.4 4 4.9V20h-1c-.6 0-1 .4-1 1s.4 1 1 1h4c.6 0 1-.4 1-1s-.4-1-1-1h-1v-2.1c2.3-.5 4-2.5 4-4.9m-.5-9c.8 0 1.5.7 1.5 1.5 0 .7-.4 1.2-1 1.4V6c0-.6-.4-1-1-1h-.9c.2-.6.7-1 1.4-1M12 16c-1.7 0-3-1.3-3-3V7h6v6c0 1.7-1.3 3-3 3"/></svg>`,
    `<svg width="800" height="800" viewBox="0 0 24 24" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"><g/><path d="M3.6 19.1c-.5.2-.7.8-.4 1.3.1.4.5.6.9.6.2 0 .3 0 .5-.1l1.5-.6c.3 1 1.3 1.8 2.4 1.8h1.7c.5 0 1-.2 1.4-.4.3.1.6.2.8.2.8 0 1.6-.4 2.1-1.1.2-.3.5-.7.7-1.2 1.5.3 3 .8 4.4 1.5L20 20l.4-.9q-2.1-1.05-4.2-1.5c.7-1.4 1.4-2.7 1.7-3.4v-.1c1.3-2.9 1.8-6.1 1.5-9.2l-.1-.7c0-.3-.3-.7-.6-.8s-.7-.1-1 .1l-.5.4c-1.8 1.2-3.4 2.8-4.6 4.6-.4-1.7-1.1-3.4-2-4.9l-.4-.6q-.45-.6-.9-.6c-.3 0-.7.2-.9.5l-.3.5c-1.7 2.7-2.6 5.9-2.6 9.1 0 1.1.1 3.7.2 5.7q-1.05.3-2.1.9m9 .5c0-.2 0-.4.1-.6v-.2c0-.2 0-.4.1-.7.1-1.9.2-4.6.2-5.7v-1c1-2.1 2.6-4 4.4-5.5.1 2.4-.3 4.9-1.4 7.1v.1c-.4.9-1.4 2.9-2.3 4.5-.4 1-.7 1.6-1.1 2 .1 0 0 0 0 0M9.3 5.4c1 1.9 1.5 3.9 1.7 6.1v1.1c0 1-.1 3.6-.2 5.5-.1.6-.1 1.2-.2 1.6 0 .1 0 .1-.1.2 0 0 0 .1-.1.1-.1.1-.2.2-.4.2H8.4c-.3 0-.5-.2-.5-.4s-.1-.5-.1-.8c-.2-1.9-.3-5.1-.3-6.2 0-2.8.6-5.2 1.8-7.4"/></svg>`,
   `<svg width="800" height="800" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentcolor"><path d="M17 13V8.9c1.7-.2 3-1.7 3-3.4C20 3.6 18.4 2 16.5 2c-1.8 0-3.2 1.3-3.4 3h-2.3l-.9-2.3C9.8 2.3 9.4 2 9 2H5c-.6 0-1 .4-1 1s.4 1 1 1h3.3l.3 1H8c-.6 0-1 .4-1 1v7c0 2.4 1.7 4.4 4 4.9V20h-1c-.6 0-1 .4-1 1s.4 1 1 1h4c.6 0 1-.4 1-1s-.4-1-1-1h-1v-2.1c2.3-.5 4-2.5 4-4.9m-.5-9c.8 0 1.5.7 1.5 1.5 0 .7-.4 1.2-1 1.4V6c0-.6-.4-1-1-1h-.9c.2-.6.7-1 1.4-1M12 16c-1.7 0-3-1.3-3-3V7h6v6c0 1.7-1.3 3-3 3"/></svg>`,
`<svg width="800" height="800" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentcolor"><path d="M19.8 5.4c-.2-.2-.5-.4-.8-.4 0-1.7-1.3-3-3-3H8C6.3 2 5 3.3 5 5c-.3 0-.6.2-.8.4L2.9 7.3c-.6.9-.8 2-.5 3S3.2 12 4 12.4V17c0 2.2 1.8 4 4 4h8c2.2 0 4-1.8 4-4v-4.6c.8-.5 1.3-1.2 1.6-2.1.3-1 .1-2.2-.5-3zM8 4h8c.6 0 1 .4 1 1H7c0-.6.4-1 1-1m6 3v2c0 1.1-.9 2-2 2s-2-.9-2-2V7zm-8.3 4c-.1 0-.3-.1-.4-.1s-.2-.1-.2-.1c-.4-.2-.6-.5-.7-.9-.1-.5 0-1 .2-1.4l1-1.4H8v1.8c0 .9-.6 1.8-1.4 2h-.8c0 .1 0 .1-.1.1m7.3 8h-2v-2c0-.6.4-1 1-1s1 .4 1 1zm5-2c0 1.1-.9 2-2 2h-1v-2c0-1.7-1.3-3-3-3s-3 1.3-3 3v2H8c-1.1 0-2-.9-2-2v-4h.4c.1 0 .2 0 .3-.1.1 0 .2 0 .3-.1.1 0 .2-.1.4-.1.2-.1.3-.1.4-.2q.75-.3 1.2-.9l.1.1.3.3c.1.1.2.1.3.2s.3.2.4.3.2.1.3.2c.2.1.3.1.5.2.1 0 .2.1.3.1h.8c.3 0 .6 0 .8-.1.1 0 .2-.1.3-.1.2-.1.4-.1.5-.2.1 0 .2-.1.3-.2s.3-.2.4-.3.2-.1.3-.2l.3-.3s.1 0 .1-.1c.3.4.7.7 1.1.9.1.1.3.1.4.2.1 0 .2.1.4.1.1 0 .2 0 .3.1.1 0 .2 0 .3.1h.4V17zm1.6-7.2c-.1.4-.4.8-.7.9-.1 0-.2.1-.3.1s-.2.1-.4.1h-.9c-.8-.3-1.4-1.1-1.4-2V7h2.5l1 1.4c.3.4.4 1 .2 1.4"/></svg>`
  ];

  const named = {
    "alla": `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M6 12h12M9 17h6"/></svg>`,
    "Boenden": `<svg width="800" height="800" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g/><path fill="currentcolor" d="M21 8c0-2.2-1.8-4-4-4H7C4.8 4 3 5.8 3 8v3.8c-.6.5-1 1.3-1 2.2v5c0 .6.4 1 1 1s1-.4 1-1v-1h16v1c0 .6.4 1 1 1s1-.4 1-1v-5c0-.9-.4-1.7-1-2.2zM5 8c0-1.1.9-2 2-2h10c1.1 0 1 .9 2 2v3h-1v-1c0-1.7-1.3-3-3-3h-1c-.8 0-1.5.3-2 .8-.5-.5-1.2-.8-2-.8H9c-1.7 0-3 1.3-3 3v1H5zm11 2v1h-3v-1c0-.6.4-1 1-1h1c.6 0 1 .4 1 1m-5 0v1H8v-1c0-.6.4-1 1-1h1c.6 0 1 .4 1 1m9 6H4v-2c0-.6.4-1 1-1h14c.6 0 1 .4 1 1z"/></svg>`,
    "Mat & dryck": `<svg width="800" height="800" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentcolor"><path d="M17 13V8.9c1.7-.2 3-1.7 3-3.4C20 3.6 18.4 2 16.5 2c-1.8 0-3.2 1.3-3.4 3h-2.3l-.9-2.3C9.8 2.3 9.4 2 9 2H5c-.6 0-1 .4-1 1s.4 1 1 1h3.3l.3 1H8c-.6 0-1 .4-1 1v7c0 2.4 1.7 4.4 4 4.9V20h-1c-.6 0-1 .4-1 1s.4 1 1 1h4c.6 0 1-.4 1-1s-.4-1-1-1h-1v-2.1c2.3-.5 4-2.5 4-4.9m-.5-9c.8 0 1.5.7 1.5 1.5 0 .7-.4 1.2-1 1.4V6c0-.6-.4-1-1-1h-.9c.2-.6.7-1 1.4-1M12 16c-1.7 0-3-1.3-3-3V7h6v6c0 1.7-1.3 3-3 3"/></svg>`,
    "Att göra": `<svg width="800" height="800" viewBox="0 0 24 24" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"><g/><path d="M3.6 19.1c-.5.2-.7.8-.4 1.3.1.4.5.6.9.6.2 0 .3 0 .5-.1l1.5-.6c.3 1 1.3 1.8 2.4 1.8h1.7c.5 0 1-.2 1.4-.4.3.1.6.2.8.2.8 0 1.6-.4 2.1-1.1.2-.3.5-.7.7-1.2 1.5.3 3 .8 4.4 1.5L20 20l.4-.9q-2.1-1.05-4.2-1.5c.7-1.4 1.4-2.7 1.7-3.4v-.1c1.3-2.9 1.8-6.1 1.5-9.2l-.1-.7c0-.3-.3-.7-.6-.8s-.7-.1-1 .1l-.5.4c-1.8 1.2-3.4 2.8-4.6 4.6-.4-1.7-1.1-3.4-2-4.9l-.4-.6q-.45-.6-.9-.6c-.3 0-.7.2-.9.5l-.3.5c-1.7 2.7-2.6 5.9-2.6 9.1 0 1.1.1 3.7.2 5.7q-1.05.3-2.1.9m9 .5c0-.2 0-.4.1-.6v-.2c0-.2 0-.4.1-.7.1-1.9.2-4.6.2-5.7v-1c1-2.1 2.6-4 4.4-5.5.1 2.4-.3 4.9-1.4 7.1v.1c-.4.9-1.4 2.9-2.3 4.5-.4 1-.7 1.6-1.1 2 .1 0 0 0 0 0M9.3 5.4c1 1.9 1.5 3.9 1.7 6.1v1.1c0 1-.1 3.6-.2 5.5-.1.6-.1 1.2-.2 1.6 0 .1 0 .1-.1.2 0 0 0 .1-.1.1-.1.1-.2.2-.4.2H8.4c-.3 0-.5-.2-.5-.4s-.1-.5-.1-.8c-.2-1.9-.3-5.1-.3-6.2 0-2.8.6-5.2 1.8-7.4"/></svg>`,
    "Butiker": `<svg width="800" height="800" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentcolor"><path d="M19.8 5.4c-.2-.2-.5-.4-.8-.4 0-1.7-1.3-3-3-3H8C6.3 2 5 3.3 5 5c-.3 0-.6.2-.8.4L2.9 7.3c-.6.9-.8 2-.5 3S3.2 12 4 12.4V17c0 2.2 1.8 4 4 4h8c2.2 0 4-1.8 4-4v-4.6c.8-.5 1.3-1.2 1.6-2.1.3-1 .1-2.2-.5-3zM8 4h8c.6 0 1 .4 1 1H7c0-.6.4-1 1-1m6 3v2c0 1.1-.9 2-2 2s-2-.9-2-2V7zm-8.3 4c-.1 0-.3-.1-.4-.1s-.2-.1-.2-.1c-.4-.2-.6-.5-.7-.9-.1-.5 0-1 .2-1.4l1-1.4H8v1.8c0 .9-.6 1.8-1.4 2h-.8c0 .1 0 .1-.1.1m7.3 8h-2v-2c0-.6.4-1 1-1s1 .4 1 1zm5-2c0 1.1-.9 2-2 2h-1v-2c0-1.7-1.3-3-3-3s-3 1.3-3 3v2H8c-1.1 0-2-.9-2-2v-4h.4c.1 0 .2 0 .3-.1.1 0 .2 0 .3-.1.1 0 .2-.1.4-.1.2-.1.3-.1.4-.2q.75-.3 1.2-.9l.1.1.3.3c.1.1.2.1.3.2s.3.2.4.3.2.1.3.2c.2.1.3.1.5.2.1 0 .2.1.3.1h.8c.3 0 .6 0 .8-.1.1 0 .2-.1.3-.1.2-.1.4-.1.5-.2.1 0 .2-.1.3-.2s.3-.2.4-.3.2-.1.3-.2l.3-.3s.1 0 .1-.1c.3.4.7.7 1.1.9.1.1.3.1.4.2.1 0 .2.1.4.1.1 0 .2 0 .3.1.1 0 .2 0 .3.1h.4V17zm1.6-7.2c-.1.4-.4.8-.7.9-.1 0-.2.1-.3.1s-.2.1-.4.1h-.9c-.8-.3-1.4-1.1-1.4-2V7h2.5l1 1.4c.3.4.4 1 .2 1.4"/></svg>`
  };

  return { bank, named };
}
function sektion73ApplyFilter(filterLabel) {
  const fNorm = sektion73NormFilter(filterLabel);
  const showAll = (fNorm === "alla" || fNorm === "");

  // NYTT: zoom-gating för "secondary" när inga filter är aktiva
  const z = (sektion73Map && typeof sektion73Map.getZoom === "function") ? sektion73Map.getZoom() : 0;

  Object.keys(sektion73MarkersById).forEach((id) => {
    const entry = sektion73MarkersById[id];
    if (!entry || !entry.marker || !entry.pin) return;

    // 1) Filter-match (om filter är aktivt)
    const matchesFilter = showAll ? true : sektion73PinMatchesFilter(entry.pin.filter, fNorm);
    if (!matchesFilter) {
      const el = entry.marker.getElement && entry.marker.getElement();
      if (el) {
        el.style.display = "none";
        el.setAttribute("aria-hidden", "true");
      }
      return;
    }

    // 2) Priority/secondary (endast när showAll = true)
    const prio = String(entry.pin.priority || "priority").trim().toLowerCase();
    const isSecondary = (prio === "secondary");

    // När filter är aktivt: matchande pins ska ALLTID synas (secondary ignoreras)
    const passesZoomGate = showAll ? (!isSecondary || z >= sektion73SecondaryPinsMinZoom) : true;

    const shouldShow = passesZoomGate;

    const el = entry.marker.getElement && entry.marker.getElement();
    if (el) {
      el.style.display = shouldShow ? "" : "none";
      el.setAttribute("aria-hidden", shouldShow ? "false" : "true");
    }
  });

  // Om modal är öppen och användaren filtrerar bort pinnen som nyss klickats:
  if (sektion73ModalOpen && window.__sektion73LastOpenedPinId) {
    const last = sektion73MarkersById[window.__sektion73LastOpenedPinId];
    const lastMatches = last && last.pin ? sektion73PinMatchesFilter(last.pin.filter, fNorm) : false;
    if (!showAll && !lastMatches) {
      sektion73CloseModal();
    }
  }
}

     function sektion73RestorePreFilterView() {
  if (!sektion73Map || typeof sektion73Map.easeTo !== "function") return;

  const v = sektion73FilterState.preView;
  if (!v) return;

  // Tilt/bearing ska vara standard (som du vill)
  const targetPitch = (typeof sektion73Pitch === "number") ? sektion73Pitch : sektion73Map.getPitch();
  const targetBearing = (typeof sektion73Bearing === "number") ? sektion73Bearing : sektion73Map.getBearing();

  const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

  sektion73Map.easeTo({
    center: v.center,
    zoom: Math.max(sektion73MinZoom, Math.min(sektion73MaxZoom, v.zoom)),
    pitch: targetPitch,
    bearing: targetBearing,
    duration: 780,
    easing: easeInOutCubic
  });

  // Clear: så nästa “första filter” sparar nytt läge
  sektion73FilterState.preView = null;
}
   function sektion73EaseToFilterOverview() {
  if (!sektion73Map || typeof sektion73Map.easeTo !== "function") return;

  // TONA NER ZOOM: bara lite mer "overview" än start (subtilt)
  // StartZoom = 15.7, så t.ex. 15.0 känns tydligt men inte dramatiskt.
  const desiredZoom = (typeof sektion73StartZoom === "number" ? sektion73StartZoom : sektion73Map.getZoom()) - 0.7;
  const targetZoom = Math.max(sektion73MinZoom, Math.min(sektion73MaxZoom, desiredZoom));

  // TILTA MER TOP-DOWN: sänk pitch lite mer än innan
  // Pitch = 65 => ~51 känns "överblick" utan att bli platt.
  const targetPitch = Math.max(0, (sektion73Pitch || sektion73Map.getPitch() || 0) - 14);

  // Behåll bearing/center (ingen "hoppa hem"-känsla)
  const targetBearing = (typeof sektion73Bearing === "number") ? sektion73Bearing : sektion73Map.getBearing();
  const targetCenter = sektion73Map.getCenter().toArray();

  // LÅNGSAMMARE + MER EASE (mjuk in/out)
  const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

  sektion73Map.easeTo({
    center: targetCenter,
    zoom: targetZoom,
    pitch: targetPitch,
    bearing: targetBearing,
    duration: 780,
    easing: easeInOutCubic
  });
}
function sektion73FitViewportToFilter(filterLabel) {
  if (!sektion73Map || typeof sektion73Map.fitBounds !== "function") return;

  const fNorm = sektion73NormFilter(filterLabel);
  const showAll = (fNorm === "alla" || fNorm === "");

  // Samla lngLat för pins som ska vara synliga
  const pts = [];
  Object.keys(sektion73MarkersById).forEach((id) => {
    const entry = sektion73MarkersById[id];
    if (!entry || !entry.pin || !entry.pin.lngLat) return;

    const shouldShow = showAll ? true : sektion73PinMatchesFilter(entry.pin.filter, fNorm);
    if (!shouldShow) return;

    // lngLat är [lng, lat]
    pts.push(entry.pin.lngLat);
  });

  // Inget att rama in
  if (pts.length === 0) return;

  // Om bara 1 pin: behåll din “filter view”-känsla (den du redan tuned och gillar)
  if (pts.length === 1) {
    sektion73EaseToFilterOverview();
    return;
  }

  // Bygg bounds
  const bounds = new mapboxgl.LngLatBounds(pts[0], pts[0]);
  for (let i = 1; i < pts.length; i++) bounds.extend(pts[i]);

  // Samma pitch/bearing som din filter-view (justera inte här om du redan är nöjd)
  const targetBearing = (typeof sektion73Bearing === "number") ? sektion73Bearing : sektion73Map.getBearing();
  const targetPitch = Math.max(
    0,
    (sektion73Pitch || sektion73Map.getPitch() || 0) - 14
  );

  // Padding: lämna luft för filterbar + lite safe space
  // (top för ev. UI, bottom för filterbar)
  const padding = { top: 80, right: 28, bottom: 130, left: 28 };

  const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

  // Fit bounds så ALLA synliga pins hamnar i viewport
  sektion73Map.fitBounds(bounds, {
    padding,
    duration: 820,
    easing: easeInOutCubic,

    // Viktigt: undvik att fitBounds zoomar in för aggressivt
    // (du vill “overview”, inte “hitta 2 punkter nära varandra och zooma in max”)
    maxZoom: Math.min(sektion73MaxZoom, (typeof sektion73StartZoom === "number" ? sektion73StartZoom : sektion73Map.getZoom())),

    bearing: targetBearing,
    pitch: targetPitch
  });
}


function sektion73EnsureFilterBar() {
  if (document.getElementById("sektion73MapFilterBar")) return;

  sektion73InjectFilterCSS();

  const filters = sektion73GetAvailableFilters();
  if (!filters || filters.length < 1) return;

  const { bank, named } = sektion73BuildFilterIconBank();

  const bar = document.createElement("div");
  bar.id = "sektion73MapFilterBar";

  const rail = document.createElement("div");
  rail.id = "sektion73MapFilterRail";

  /* ===========================
     NYTT: 2D/3D toggle (först i rail)
     - två knappar utan rail-gap mellan sig
     =========================== */
  const viewGroup = document.createElement("div");
  viewGroup.className = "sektion73ViewToggleGroup";

  const btn3d = document.createElement("button");
  btn3d.type = "button";
  btn3d.className = "sektion73ViewToggleBtn";
  btn3d.textContent = "3D";
  btn3d.setAttribute("data-view", "3d");
  btn3d.setAttribute("aria-pressed", "true");
  btn3d.setAttribute("aria-label", "3D vy");

  const btn2d = document.createElement("button");
  btn2d.type = "button";
  btn2d.className = "sektion73ViewToggleBtn";
  btn2d.textContent = "2D";
  btn2d.setAttribute("data-view", "2d");
  btn2d.setAttribute("aria-pressed", "false");
  btn2d.setAttribute("aria-label", "2D vy");

  viewGroup.appendChild(btn3d);
  viewGroup.appendChild(btn2d);

  function sektion73SetViewMode(mode) {
    const is2d = String(mode) === "2d";

    btn3d.setAttribute("aria-pressed", is2d ? "false" : "true");
    btn2d.setAttribute("aria-pressed", is2d ? "true" : "false");

    if (!sektion73Map) return;

    const targetPitch = is2d ? 0 : sektion73Pitch;

    // Samma “känsla” som pin-click (easeTo + duration/easing)
    sektion73Map.easeTo({
      center: sektion73Map.getCenter(),
      zoom: sektion73Map.getZoom(),
      bearing: sektion73Map.getBearing(),
      pitch: targetPitch,
      duration: sektion73PinZoomDur,
      easing: (t) => 1 - Math.pow(1 - t, 3) // ease-out cubic
    });
  }

  btn3d.addEventListener("click", () => {
    // redan aktiv? gör inget
    if (btn3d.getAttribute("aria-pressed") === "true") return;
    sektion73SetViewMode("3d");
  });

  btn2d.addEventListener("click", () => {
    // redan aktiv? gör inget
    if (btn2d.getAttribute("aria-pressed") === "true") return;
    sektion73SetViewMode("2d");
  });

  // Lägg först i rail
  rail.appendChild(viewGroup);

  // NYTT: label istället för "Alla"-knapp
  const labelEl = document.createElement("span");
  labelEl.className = "sektion73FilterLabel";
  labelEl.textContent = "Filtrera:";
  rail.appendChild(labelEl);

  const closeSvg = `<svg width="800" height="800" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Close</title><g fill="none" fill-rule="evenodd"><path d="M0 0h24v24H0z"/><path stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M17 7 7 17M7 7l10 10"/></g></svg>`;

const setActive = (nextLabel) => {
  const prev = String(sektion73FilterState.active || "").trim();
  const next = String(nextLabel || "").trim();

  // Spara vyn precis när användaren går från "inga filter" -> "ett filter"
  if (!prev && next && !sektion73FilterState.preView && sektion73Map) {
    sektion73FilterState.preView = {
      center: sektion73Map.getCenter().toArray(),
      zoom: sektion73Map.getZoom()
    };
  }

  sektion73FilterState.active = next;

  const allBtns = rail.querySelectorAll(".sektion73FilterBtn");
    allBtns.forEach((b) => {
      const bLabel = String(b.getAttribute("data-filter") || "");
      const isOn = (bLabel === sektion73FilterState.active);

      b.setAttribute("aria-pressed", isOn ? "true" : "false");

      // rensa ev. tidigare close
      const prevClose = b.querySelector(".sektion73FilterClose");
      if (prevClose) prevClose.remove();

      // NYTT: close-ikon bara på aktiv knapp
      if (isOn) {
        const close = document.createElement("span");
        close.className = "sektion73FilterClose";
        close.innerHTML = closeSvg;
        close.setAttribute("aria-hidden", "true");

close.addEventListener("click", (e) => {
  e.preventDefault();
  if (typeof e.stopImmediatePropagation === "function") e.stopImmediatePropagation();
  e.stopPropagation();

  setActive(""); // “alla” (visar alla pins)

  requestAnimationFrame(() => {
    sektion73RestorePreFilterView();
  });
});

        b.appendChild(close);
      }
    });

    sektion73ApplyFilter(sektion73FilterState.active || "");
  };

 const filterConfig = [
  {
    label: "Mat & dryck",
    icon: `<svg width="800" height="800" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentcolor"><path d="M17 13V8.9c1.7-.2 3-1.7 3-3.4C20 3.6 18.4 2 16.5 2c-1.8 0-3.2 1.3-3.4 3h-2.3l-.9-2.3C9.8 2.3 9.4 2 9 2H5c-.6 0-1 .4-1 1s.4 1 1 1h3.3l.3 1H8c-.6 0-1 .4-1 1v7c0 2.4 1.7 4.4 4 4.9V20h-1c-.6 0-1 .4-1 1s.4 1 1 1h4c.6 0 1-.4 1-1s-.4-1-1-1h-1v-2.1c2.3-.5 4-2.5 4-4.9m-.5-9c.8 0 1.5.7 1.5 1.5 0 .7-.4 1.2-1 1.4V6c0-.6-.4-1-1-1h-.9c.2-.6.7-1 1.4-1M12 16c-1.7 0-3-1.3-3-3V7h6v6c0 1.7-1.3 3-3 3"></path></svg>`
  },
  {
    label: "Butiker",
    icon: `<svg width="800" height="800" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentcolor"><path d="M19.8 5.4c-.2-.2-.5-.4-.8-.4 0-1.7-1.3-3-3-3H8C6.3 2 5 3.3 5 5c-.3 0-.6.2-.8.4L2.9 7.3c-.6.9-.8 2-.5 3S3.2 12 4 12.4V17c0 2.2 1.8 4 4 4h8c2.2 0 4-1.8 4-4v-4.6c.8-.5 1.3-1.2 1.6-2.1.3-1 .1-2.2-.5-3zM8 4h8c.6 0 1 .4 1 1H7c0-.6.4-1 1-1m6 3v2c0 1.1-.9 2-2 2s-2-.9-2-2V7zm-8.3 4c-.1 0-.3-.1-.4-.1s-.2-.1-.2-.1c-.4-.2-.6-.5-.7-.9-.1-.5 0-1 .2-1.4l1-1.4H8v1.8c0 .9-.6 1.8-1.4 2h-.8c0 .1 0 .1-.1.1m7.3 8h-2v-2c0-.6.4-1 1-1s1 .4 1 1zm5-2c0 1.1-.9 2-2 2h-1v-2c0-1.7-1.3-3-3-3s-3 1.3-3 3v2H8c-1.1 0-2-.9-2-2v-4h.4c.1 0 .2 0 .3-.1.1 0 .2 0 .3-.1.1 0 .2-.1.4-.1.2-.1.3-.1.4-.2q.75-.3 1.2-.9l.1.1.3.3c.1.1.2.1.3.2s.3.2.4.3.2.1.3.2c.2.1.3.1.5.2.1 0 .2.1.3.1h.8c.3 0 .6 0 .8-.1.1 0 .2-.1.3-.1.2-.1.4-.1.5-.2.1 0 .2-.1.3-.2s.3-.2.4-.3.2-.1.3-.2l.3-.3s.1 0 .1-.1c.3.4.7.7 1.1.9.1.1.3.1.4.2.1 0 .2.1.4.1.1 0 .2 0 .3.1.1 0 .2 0 .3.1h.4V17zm1.6-7.2c-.1.4-.4.8-.7.9-.1 0-.2.1-.3.1s-.2.1-.4.1h-.9c-.8-.3-1.4-1.1-1.4-2V7h2.5l1 1.4c.3.4.4 1 .2 1.4"></path></svg>`
  }
];
filterConfig.forEach((filterItem) => {
  const legacyLabel = String(filterItem.label || "").trim();
  const translatedLabel = (
    (sektion73I18N[sektion73Lang] && sektion73I18N[sektion73Lang].filter && sektion73I18N[sektion73Lang].filter.labelsByLegacy && sektion73I18N[sektion73Lang].filter.labelsByLegacy[legacyLabel]) ||
    (sektion73I18N.sv && sektion73I18N.sv.filter && sektion73I18N.sv.filter.labelsByLegacy && sektion73I18N.sv.filter.labelsByLegacy[legacyLabel]) ||
    legacyLabel
  );

  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "sektion73FilterBtn";

  // Viktigt: behåll data-filter som svenska legacy-label (matchar pins/filterlogik)
  btn.setAttribute("data-filter", legacyLabel);

  btn.setAttribute("aria-pressed", "false");
  btn.setAttribute("aria-label", `${sektion73T("filter.ariaPrefix", "Filter")}: ${translatedLabel}`);

  const ico = document.createElement("span");
  ico.className = "sektion73FilterIco";
  ico.innerHTML = filterItem.icon;

  const txt = document.createElement("span");
  txt.textContent = String(translatedLabel);

  btn.appendChild(ico);
  btn.appendChild(txt);

  btn.addEventListener("click", () => {
    const next = String(btn.getAttribute("data-filter") || "");
    setActive(next);

    // NYTT: rama in alla pins som är synliga för filtret
    requestAnimationFrame(() => {
      sektion73FitViewportToFilter(next);
    });
  });

  rail.appendChild(btn);
});

  bar.appendChild(rail);
  document.body.appendChild(bar);

  // initial apply: visa allt, ingen close-ikon
  setActive(sektion73FilterState.active);
}
function sektion73SetFilterBarHidden(hidden) {
  const bar = document.getElementById("sektion73MapFilterBar");
  if (!bar) return;
  if (hidden) bar.classList.add("sektion73FilterBarHidden");
  else bar.classList.remove("sektion73FilterBarHidden");
}

function sektion73ZoomToPinThenOpenModal(pin) {
  // Stäng ev. befintlig modal direkt (så fokus blir zoom först)
  if (sektion73ModalOpen) sektion73CloseModal();

  // Safety: rensa tidigare moveend-hook om man klickar snabbt mellan pins
  if (sektion73ActiveMoveEndHandler) {
    sektion73Map.off("moveend", sektion73ActiveMoveEndHandler);
    sektion73ActiveMoveEndHandler = null;
  }

  // Spara vyn där användaren var innan pin-zoom
  sektion73ReturnView = {
    center: sektion73Map.getCenter().toArray(),
    zoom: sektion73Map.getZoom(),
    pitch: sektion73Map.getPitch(),
    bearing: sektion73Map.getBearing()
  };

  sektion73IsZoomingToPin = true;
  sektion73PendingPinId = pin.id;

  // Vänta på att zoomen är klar → öppna modal
  const onMoveEnd = () => {
    if (!sektion73IsZoomingToPin) return;
    if (sektion73PendingPinId !== pin.id) return;

    sektion73Map.off("moveend", onMoveEnd);
    sektion73ActiveMoveEndHandler = null;

    sektion73IsZoomingToPin = false;
    sektion73PendingPinId = null;

    /* NYTT: filterbaren ner precis innan modalen åker in */
    sektion73SetFilterBarHidden(true);

    /* Låt browsern “commit:a” klass + starta transition innan modal-class togglas */
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        sektion73OpenModal(pin.modal);
      });
    });
  };

  sektion73ActiveMoveEndHandler = onMoveEnd;
  sektion73Map.on("moveend", onMoveEnd);

  // Ease-in-out (cubic): startar mjukt, accelererar, bromsar mjukt
  const sektion73EaseInOutCubic_00035 = (t) =>
    (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

  // Dynamisk duration: bara lite längre när hoppet är stort
  const sektion73TargetZoom_00036 = Math.min(sektion73PinZoom, sektion73MaxZoom);
  const sektion73CurrentZoom_00037 = sektion73Map.getZoom();
  const sektion73ZoomDelta_00038 =
    Math.abs(sektion73TargetZoom_00036 - sektion73CurrentZoom_00037);

  // 0..1 där 0 = litet hopp, 1 = stort hopp (tuned för din karta)
  const sektion73ZoomDeltaNorm_00039 = Math.min(1, sektion73ZoomDelta_00038 / 4.2);

  // Lägg till max +sektion73PinZoomDurExtraMax ms vid riktigt stora hopp
  const sektion73DynamicDur_00040 =
    sektion73PinZoomDur +
    Math.round(sektion73ZoomDeltaNorm_00039 * sektion73PinZoomDurExtraMax);

  sektion73Map.easeTo({
    center: pin.lngLat,
    zoom: sektion73TargetZoom_00036,
    pitch: sektion73Pitch,
    bearing: sektion73Bearing,
    duration: sektion73DynamicDur_00040,
    easing: sektion73EaseInOutCubic_00035
  });
}



 /* ===================================================================
    sektion73AddPin — EGNA positioneringslösningen
    Skapar pin-element som barn till kartans container och positionerar
    dem manuellt via map.project() på varje renderframe.
    mapboxgl.Marker används BARA som databärare (getLngLat/getElement).
    Positioneringen styrs 100% av vår egen kod.
    =================================================================== */

  // Container för alla manuellt placerade pins
  var sektion73PinContainer = null;
  function sektion73EnsurePinContainer() {
    if (sektion73PinContainer) return sektion73PinContainer;
    sektion73PinContainer = document.createElement("div");
    sektion73PinContainer.style.cssText =
      "position:absolute;inset:0;width:100%;height:100%;pointer-events:none;overflow:hidden;z-index:5;";
    sektion73Canvas.appendChild(sektion73PinContainer);
    return sektion73PinContainer;
  }

  // Alla pins som vi manuellt positionerar
  var sektion73ManualPins = [];

  function sektion73AddPin(pin) {
    const { wrap, btn } = sektion73CreatePinEl(pin);

    btn.addEventListener("click", () => {
      window.__sektion73LastOpenedPinId = pin.id;
      sektion73ZoomToPinThenOpenModal(pin);
    });

    // Lägg elementet i vår egen container (inte via mapboxgl.Marker)
    var container = sektion73EnsurePinContainer();
    wrap.style.position = "absolute";
    wrap.style.left = "0";
    wrap.style.top = "0";
    wrap.style.pointerEvents = "auto";
    wrap.style.willChange = "transform";
    container.appendChild(wrap);

    // Spara pin-data
    var pinEntry = {
      el: wrap,
      lngLat: new mapboxgl.LngLat(pin.lngLat[0], pin.lngLat[1]),
      pin: pin,
      // Skapa en dummy marker-liknande objekt för kompatibilitet med filter/modal-kod
      marker: {
        getElement: function () { return wrap; },
        getLngLat: function () { return pinEntry.lngLat; },
        setLngLat: function () { return pinEntry.marker; },
        addTo: function () { return pinEntry.marker; },
        remove: function () { if (wrap.parentNode) wrap.parentNode.removeChild(wrap); }
      }
    };

    sektion73ManualPins.push(pinEntry);
    sektion73MarkersById[pin.id] = { marker: pinEntry.marker, pin: pin };

    // Initial positionering
    sektion73PositionPin(pinEntry);
  }

  // Positionera EN pin baserat på map.project()
  function sektion73PositionPin(entry) {
    var pos = sektion73Map.project(entry.lngLat);
    // anchor: bottom → centrera horisontellt, botten av elementet vid punkten
    // offset: [0, 10] → skjut ner 10px
    entry.el.style.transform =
      "translate(" + pos.x + "px, " + pos.y + "px) translate(-50%, -100%) translate(0px, 10px)";
  }

  // Positionera ALLA pins — körs på varje renderframe
  function sektion73PositionAllPins() {
    for (var i = 0; i < sektion73ManualPins.length; i++) {
      sektion73PositionPin(sektion73ManualPins[i]);
    }
  }

  // Lyssna på VARJE renderframe — inte bara move/zoom, VARJE FRAME
  sektion73Map.on("render", sektion73PositionAllPins);

sektion73Map.once("load", function () {
  // Säkerställ att initial kameravy verkligen blir som dina konstanter
  // (matchar beteendet i AS.MAPS2 som sätter pitch/bearing explicit)
  try {
    sektion73Map.setPitch(sektion73Pitch);
    sektion73Map.setBearing(sektion73Bearing);
  } catch (_) {}

  const sektion73Idle = (fn, timeoutMs) => {
    const t = (typeof timeoutMs === "number" ? timeoutMs : 1200);

    if (typeof window.requestIdleCallback === "function") {
      window.requestIdleCallback(() => fn(), { timeout: t });
    } else {
      setTimeout(fn, 0);
    }
  };

  const sektion73Later = (fn, ms) => {
    const d = (typeof ms === "number" ? ms : 700);
    setTimeout(fn, d);
  };

     const filters = [
    "Mat & dryck",
    "Boenden", 
    "Att göra", 
    "Butiker"
  ];
  // NYTT: injicera CSS som pinsen (och modalens transitions/vars) behöver direkt.
  // Detta skapar INTE modal-DOM, bara en <style>-tagg.
  sektion73InjectModalCSS();

  // 1) KRAV: kartan + ALLA pins ska synas direkt (ingen idle/defer här)
  sektion73Pins.forEach(sektion73AddPin);

  // initialt — applicera (döljer ev. secondary vid startzoom)
  sektion73ApplyFilter(sektion73FilterState.active || "");

  // vid zoom — uppdatera så secondary blir synliga när man zoomar in
  sektion73Map.on("zoomend", () => {
    sektion73ApplyFilter(sektion73FilterState.active || "");
  });

  // 2) Filter-slider får ladda in lite senare (efter att pins redan syns)
  sektion73Later(() => {
    sektion73Idle(() => {
      sektion73EnsureFilterBar();
    }, 1800);
  }, 650);

  // OBS: modalen skapas först vid första pin-klick via sektion73OpenModal() -> sektion73EnsureModalDOM()
});




    /* =========================
       Debug helpers
       ========================= */
    window.sektion73MapInstance = sektion73Map;

    window.sektion73PrintBounds = function () {
      const b = sektion73Map.getBounds();
      const sw = b.getSouthWest();
      const ne = b.getNorthEast();
      console.log("Bounds SW:", [Number(sw.lng.toFixed(6)), Number(sw.lat.toFixed(6))]);
      console.log("Bounds NE:", [Number(ne.lng.toFixed(6)), Number(ne.lat.toFixed(6))]);
      return { sw: [sw.lng, sw.lat], ne: [ne.lng, ne.lat] };
    };
  });
})();
