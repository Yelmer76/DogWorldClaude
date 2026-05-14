import { Section, SubHead } from "./Section";
import {
  Field,
  Input,
  Textarea,
  Select,
  DateInput,
} from "@/components/ui/Input";
import { Checkbox, Radio, Toggle } from "@/components/ui/Choice";

export function FormsSection() {
  return (
    <Section
      id="forms"
      label="07 · Components"
      title="Form inputs"
      description="Inputs er rolige som standard. Fokus-ringer er forest-grønn på 18 % opasitet — synlig for tastatur-brukere, usynlig på skjermbildet. Feil roper ikke; de forklarer."
    >
      <SubHead>Tekst-input — tilstander</SubHead>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Field label="Kennelnavn" hint="Tom — placeholder synlig">
          <Input placeholder="f.eks. Kennel Granheim" />
        </Field>
        <Field label="Kennelnavn" hint="Fylt">
          <Input state="filled" defaultValue="Kennel Granheim" readOnly />
        </Field>
        <Field label="Kennelnavn" hint="Fokus — tastatur-ring">
          <Input state="focus" defaultValue="Kennel Granheim" readOnly />
        </Field>
        <Field
          label="Kennelnavn"
          error="Kun bokstaver, tall og mellomrom."
        >
          <Input state="error" defaultValue="kennel granheim!" readOnly />
        </Field>
      </div>

      <SubHead>Tekstområde, select, datovelger</SubHead>
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-4">
        <Field label="Valpe-notat">
          <Textarea
            state="filled"
            defaultValue="Alle fem valper diet innen timen. Bella roet seg ned ved 03:40. Ny veiing kl. 12 — minste hann lå sist på 412 g."
            readOnly
          />
        </Field>
        <Field label="Rase">
          <Select defaultValue="Norsk Elghund">
            <option>Norsk Elghund</option>
            <option>Cavalier King Charles</option>
            <option>Tysk Schäfer</option>
            <option>Belgisk Malinois</option>
          </Select>
        </Field>
        <Field label="Fødselsdato">
          <DateInput state="filled" defaultValue="14. apr 2026" readOnly />
        </Field>
      </div>

      <SubHead>Avkrysning · radio · bryter</SubHead>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Checkboxes */}
        <div className="bg-bg-card border border-n-200 rounded-card p-4">
          <SubHead className="!mt-0">Avkrysning — vaksiner</SubHead>
          <div className="flex flex-col gap-3">
            <Checkbox state="checked">DHPPi · 6 uker</Checkbox>
            <Checkbox state="checked">DHPPi · 12 uker</Checkbox>
            <Checkbox state="focus">Rabies · 16 uker</Checkbox>
            <Checkbox>Lepto · 12 uker</Checkbox>
            <Checkbox state="disabled">Microchip (auto fra vet)</Checkbox>
          </div>
        </div>

        {/* Radio */}
        <div className="bg-bg-card border border-n-200 rounded-card p-4">
          <SubHead className="!mt-0">Radio — register</SubHead>
          <div className="flex flex-col gap-3">
            <Radio state="checked">NKK · Norsk Kennel Klub</Radio>
            <Radio>SKK · Svenska Kennelklubben</Radio>
            <Radio>VDH · Verband für das Deutsche Hundewesen</Radio>
            <Radio state="disabled">FCI partner (auto-koblet)</Radio>
          </div>
        </div>

        {/* Toggles */}
        <div className="bg-bg-card border border-n-200 rounded-card p-4">
          <SubHead className="!mt-0">Brytere — offentlig profil</SubHead>
          <div className="flex flex-col gap-3.5">
            <Toggle state="on">Vis på kennelside</Toggle>
            <Toggle state="on">Tillat kjøper-henvendelser</Toggle>
            <Toggle>Vis helse-resultater offentlig</Toggle>
            <Toggle state="disabled">Auto-sync med NKK (premium)</Toggle>
          </div>
        </div>
      </div>
    </Section>
  );
}
