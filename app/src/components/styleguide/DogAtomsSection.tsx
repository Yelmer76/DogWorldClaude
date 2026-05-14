import { Section, SubHead } from "./Section";
import { Card, FrameLabel } from "@/components/ui/Card";
import { PedigreeNode } from "@/components/dogworld/PedigreeNode";
import { HealthRow, HealthTable } from "@/components/dogworld/HealthRow";
import { PhotoGrid } from "@/components/dogworld/PhotoGrid";
import { Timeline, TimelineItem } from "@/components/dogworld/Timeline";

// ── 15 · Pedigree node ─────────────────────────────────────────────────────
export function PedigreeSection() {
  return (
    <Section
      id="pedigree"
      label="15 · Dog-specific"
      title="Stamtavle-node"
      description="Brukes i genealogi-treet. Fokal hund sitter på venstre — aner flyter mot høyre tilbake i tid (NKK / VDH / KC trykk-konvensjon). Hanner får dusty-blå venstrebjelke; tisper en dusty-rosa. Kortene forblir hvite — sex-hintet leses umiddelbart."
    >
      <SubHead>Tre — fokal til venstre · 3 generasjoner</SubHead>
      <Card className="!p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-start">
          {/* Col 1 — Focal */}
          <div className="flex flex-col gap-3">
            <div className="text-[11px] uppercase tracking-[0.06em] font-medium text-n-500">
              Fokal
            </div>
            <PedigreeNode
              variant="focal"
              titles="GJELDENDE VISNING"
              name="Polaris · Kull C, valp 3"
              meta="f. 14. apr 2026 · Norsk Elghund"
              health="Tester gjenstår · uke 4"
            />
            <div className="text-xs text-n-500 italic px-3">
              4 søsken · trykk for å se ↓
            </div>
          </div>

          {/* Col 2 — Parents */}
          <div className="flex flex-col gap-3">
            <div className="text-[11px] uppercase tracking-[0.06em] font-medium text-n-500">
              Foreldre · Gen 1
            </div>
            <PedigreeNode
              variant="sire"
              titles="NUCH NORDUCH"
              name="Astor av Granheim"
              meta="f. 2022 · far"
              health="HD: A (FCI) · ED: 0"
              healthPip="ok"
            />
            <PedigreeNode
              variant="dam"
              titles="VDH-CH"
              name="Bella vom Schwarzwald"
              meta="f. 2022 · mor"
              health="HD: A · DM: clear"
              healthPip="ok"
            />
          </div>

          {/* Col 3 — Grandparents */}
          <div className="flex flex-col gap-3">
            <div className="text-[11px] uppercase tracking-[0.06em] font-medium text-n-500">
              Besteforeldre · Gen 2
            </div>
            <PedigreeNode
              variant="sire"
              titles="NUCH SE UCH"
              name="Bobby av Skogen"
              meta="f. 2018 · farfar"
              health="HD: A · ED: 0"
              healthPip="ok"
            />
            <PedigreeNode
              variant="dam"
              titles="SUCH"
              name="Frida av Lia"
              meta="f. 2015 · farmor"
              health="HD: B · Eyes klar"
              healthPip="warn"
            />
            <PedigreeNode
              variant="sire"
              titles="VDH-CH"
              name="Kaiser vom Hochwald"
              meta="f. 2017 · morfar"
              health="HD: A · DM: clear"
              healthPip="ok"
            />
            <PedigreeNode
              variant="dam"
              titles="DE-CH"
              name="Greta vom Schwarzwald"
              meta="f. 2018 · mormor"
              health="HD: B · ED: 0"
              healthPip="warn"
            />
          </div>
        </div>
      </Card>

      {/* Legend */}
      <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-n-700">
        <span className="inline-flex items-center gap-2">
          <span className="inline-flex items-center bg-bg-card border border-n-200 rounded-tag overflow-hidden">
            <span className="w-1 h-[18px] bg-sire-bar" />
            <span className="grid place-items-center w-[18px] h-[18px] bg-sire-chip-bg text-[#3e5a76] text-[10px] font-semibold">
              ♂
            </span>
          </span>
          Far — dusty-blå bjelke
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="inline-flex items-center bg-bg-card border border-n-200 rounded-tag overflow-hidden">
            <span className="w-1 h-[18px] bg-dam-bar" />
            <span className="grid place-items-center w-[18px] h-[18px] bg-dam-chip-bg text-[#8a4870] text-[10px] font-semibold">
              ♀
            </span>
          </span>
          Mor — dusty-rosa bjelke
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="w-4 h-4 rounded-tag bg-bg-card border-2 border-forest-700 [box-shadow:0_0_0_2px_rgba(63,90,85,0.10)]" />
          Fokal — gjeldende visning
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-success-dot" />
          Helse-pip i hjørnet
        </span>
      </div>
    </Section>
  );
}

// ── 16 · Health test result row ────────────────────────────────────────────
export function HealthSection() {
  return (
    <Section
      id="health"
      label="16 · Dog-specific"
      title="Helse-test resultat-rad"
      description="Hver rad bærer: scheme, verdi (monospace — sammenlignbar på et blikk), dato, sertifikat-lenke. Schemes bruker sin opprinnelige notasjon — FCI A, OFA Excellent, BVA 4:5 — uten oversettelse."
    >
      <HealthTable>
        <HealthRow
          scheme="HD · FCI"
          detail="Hofte-leddsdysplasi (radiograf)"
          value="A"
          status="ok"
          date="03. mar 2024"
          certUrl="#"
        />
        <HealthRow
          scheme="ED · FCI"
          detail="Albue-leddsdysplasi"
          value="0 / 0"
          status="ok"
          date="03. mar 2024"
          certUrl="#"
        />
        <HealthRow
          scheme="Eyes · ECVO"
          detail="Årlig oftalmologisk undersøkelse"
          value="Klar"
          status="ok"
          date="12. mar 2026"
          certUrl="#"
        />
        <HealthRow
          scheme="DM · DNA"
          detail="Degenerativ myelopati"
          value="N / N"
          status="ok"
          date="21. aug 2023"
          certUrl="#"
        />
        <HealthRow
          scheme="prcd-PRA · DNA"
          detail="Progressiv retinal atrofi"
          value="Carrier"
          status="warn"
          date="21. aug 2023"
          certUrl="#"
        />
        <HealthRow
          scheme="Hjerte · auskultasjon"
          detail="Kardio-undersøkelse · kardiolog"
          value="Utløpt"
          status="err"
          date="04. jan 2024"
          actionLabel="Bestill ny →"
        />
      </HealthTable>
    </Section>
  );
}

// ── 17 · Photo grid ────────────────────────────────────────────────────────
export function PhotoGridSection() {
  const cells = Array.from({ length: 18 }).map((_, i) => ({
    id: `p${i + 1}`,
    label: `P${i + 1}`,
    tone: ((["sire", "dam", "elkhound", "generic"] as const)[i % 4]),
  }));

  return (
    <Section
      id="photogrid"
      label="17 · Dog-specific"
      title="Foto-grid"
      description="Kullets foto-grid. Kvadratiske celler, 4-kolonne på mobil, 6-kolonne på desktop. Kun kvadratiske utsnitt — aldri runde avatarer i galleriet (ser ut som kontakter, leses feil for rase-vurdering)."
    >
      <div className="grid grid-cols-1 lg:grid-cols-[375px_minmax(0,1fr)] gap-6 items-start">
        <div>
          <FrameLabel>Mobil · 4 kolonner</FrameLabel>
          <div className="w-[375px] max-w-full bg-bg-page rounded-[24px] overflow-hidden border border-n-200 shadow-[0_2px_4px_rgba(26,26,26,0.05),0_4px_12px_rgba(26,26,26,0.05)]">
            <div className="p-3">
              <PhotoGrid items={cells} maxVisible={8} mobileCols={4} desktopCols={4} />
            </div>
          </div>
        </div>
        <div>
          <FrameLabel>Desktop · 6 kolonner</FrameLabel>
          <Card flush className="!p-4">
            <PhotoGrid items={cells} maxVisible={12} mobileCols={6} desktopCols={6} />
          </Card>
        </div>
      </div>
    </Section>
  );
}

// ── 18 · Litter timeline marker ────────────────────────────────────────────
export function TimelineSection() {
  return (
    <Section
      id="timeline"
      label="18 · Dog-specific"
      title="Kull-tidslinje"
      description="Den vertikale skinnen som går fra paring til levering. Avsluttede uker fylles med sage-grønn; gjeldende uke er navy med ring; framtidige uker står tomme. Samme marker-familie driver vaksinasjons-planer og utstillings-record."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Litter timeline */}
        <div>
          <FrameLabel>Kull C — milepæler</FrameLabel>
          <Card>
            <Timeline>
              <TimelineItem
                state="done"
                date="14. APR 2026 · UKE 0"
                title="Født — 5 valper"
                description="3 ♂ · 2 ♀ · fødselsvekt 380–460 g"
              />
              <TimelineItem
                state="done"
                date="21. APR 2026 · UKE 1"
                title="Daglig veiing startet"
                description="Alle valper øker 60–90 g / dag."
              />
              <TimelineItem
                state="done"
                date="05. MAI 2026 · UKE 3"
                title="Øynene åpnet seg"
                description="Polaris sist, dag 19."
              />
              <TimelineItem
                state="now"
                date="14. MAI 2026 · UKE 4"
                title="Første myk-mat-test"
                description="Bløtlagt tørrfôr · 2 måltider · i dag."
              />
              <TimelineItem
                state="future"
                date="26. MAI 2026 · UKE 6"
                title="DHPPi-1 · microchip"
                description="Veterinærklinikken Lillehammer · 10:30."
              />
              <TimelineItem
                state="future"
                date="09. JUN 2026 · UKE 8"
                title="Levering åpner"
                description="Reservasjons-depositum konverterer til overdragelse."
              />
            </Timeline>
          </Card>
        </div>

        {/* Variants */}
        <div>
          <FrameLabel>Varianter</FrameLabel>
          <Card>
            <SubHead className="!mt-0">Kompakt — vaksinasjoner</SubHead>
            <Timeline>
              <TimelineItem
                state="done"
                compact
                date="26. MAI · UKE 6"
                title="DHPPi-1 ✓"
              />
              <TimelineItem
                state="now"
                compact
                date="23. JUN · UKE 10"
                title="DHPPi-2 — planlagt"
              />
              <TimelineItem
                state="future"
                compact
                date="21. JUL · UKE 14"
                title="DHPPi-3"
              />
              <TimelineItem
                state="future"
                compact
                date="14. OKT · UKE 26"
                title="Rabies"
              />
            </Timeline>

            <SubHead>Utstillings-record — Astor</SubHead>
            <Timeline>
              <TimelineItem
                state="done"
                date="04. MAI 2025 · NKK BERGEN"
                title="BIS-1 · CACIB"
                description="Dommer: A. Wenger."
              />
              <TimelineItem
                state="done"
                date="11. OKT 2025 · STOCKHOLM"
                title="BOS"
                description="Dommer: M. Lindgren."
              />
              <TimelineItem
                state="future"
                date="07. JUN 2026 · HAMAR"
                title="Spesial-utstilling — påmeldt"
              />
            </Timeline>
          </Card>
        </div>
      </div>
    </Section>
  );
}
