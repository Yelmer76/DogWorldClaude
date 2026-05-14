import { Section, SubHead } from "./Section";
import {
  Tag,
  CountBadge,
  TitleBadge,
  KarmaBadge,
} from "@/components/dogworld/Tag";

export function TagsSection() {
  return (
    <Section
      id="tags"
      label="09 · Components"
      title="Tags & badges"
      description="Tags bærer status og kategori. Title-badges (Ch, NUCH, IGP3) bruker monospace-registret så de leser som credentials, ikke pynt. Karma-tier-badges lever på kennelsiden og oppdretterens dashbord."
    >
      <SubHead>Status-tags</SubHead>
      <div className="flex flex-wrap items-center gap-3">
        <Tag variant="success" dot>
          Helse klar
        </Tag>
        <Tag variant="warning" dot>
          Vaksinasjon forfaller
        </Tag>
        <Tag variant="error" dot>
          Test utløpt
        </Tag>
        <Tag variant="info" dot>
          Påmeldt utstilling
        </Tag>
        <Tag variant="accent">Reservert</Tag>
        <Tag variant="forest">Eier: Kennel Granheim</Tag>
        <Tag>Utkast</Tag>
      </div>

      <SubHead>Tellebadges</SubHead>
      <div className="flex flex-wrap items-center gap-6">
        <span className="text-sm">
          Hunder <CountBadge value={24} muted />
        </span>
        <span className="text-sm">
          Kull <CountBadge value={3} muted />
        </span>
        <span className="text-sm">
          Kjøper-henvendelser <CountBadge value={5} />
        </span>
        <span className="text-sm">
          Krever handling <CountBadge value={12} />
        </span>
      </div>

      <SubHead>Rase-tags</SubHead>
      <div className="flex flex-wrap items-center gap-3">
        <Tag variant="breed">Norsk Elghund</Tag>
        <Tag variant="breed">Cavalier King Charles Spaniel</Tag>
        <Tag variant="breed">Tysk Schäferhund</Tag>
        <Tag variant="breed">Labrador Retriever</Tag>
        <Tag variant="breed">Belgisk Malinois</Tag>
      </div>

      <SubHead>Title-badges — mesterskap & brukstitler</SubHead>
      <div className="flex flex-wrap items-center gap-2">
        <TitleBadge>NUCH</TitleBadge>
        <TitleBadge>NORDUCH</TitleBadge>
        <TitleBadge>SE UCH</TitleBadge>
        <TitleBadge>VDH-CH</TitleBadge>
        <TitleBadge>KC Ch</TitleBadge>
        <TitleBadge>IGP3</TitleBadge>
        <TitleBadge>JaktCh</TitleBadge>
        <TitleBadge gold>BIS-1</TitleBadge>
        <TitleBadge gold>BISS</TitleBadge>
        <TitleBadge gold>World Winner ’25</TitleBadge>
      </div>

      <SubHead>Karma-tier-badges</SubHead>
      <div className="flex flex-wrap items-center gap-3">
        <KarmaBadge tier="new">Ny oppdretter</KarmaBadge>
        <KarmaBadge tier="bronze">Bronse · 12 mnd</KarmaBadge>
        <KarmaBadge tier="silver">Sølv · 3 år</KarmaBadge>
        <KarmaBadge tier="gold">Gull · 5 år</KarmaBadge>
        <KarmaBadge tier="steward">Forvalter · 10 år+</KarmaBadge>
      </div>
    </Section>
  );
}
