"""Generate the DogWorld Norwegian report as a styled A4 PDF."""

import re
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import cm
from reportlab.lib.colors import HexColor
from reportlab.lib.enums import TA_LEFT
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, KeepTogether,
    ListFlowable, ListItem, Table, TableStyle,
)

OUT = r"D:\Antigravity\DogWorldClaude\DogWorld-rapport.pdf"

# Palette
ACCENT = HexColor("#2c5f2d")     # forest green
ACCENT_SOFT = HexColor("#5a8a5b")
DARK = HexColor("#1a1a1a")
MUTED = HexColor("#5d5d5d")
RULE = HexColor("#cccccc")
CALLOUT_BG = HexColor("#f4f1ea")
CALLOUT_BORDER = HexColor("#d8d2c4")

PAGE_W, PAGE_H = A4
MARGIN_L = 2.2 * cm
MARGIN_R = 2.2 * cm
MARGIN_T = 2.4 * cm
MARGIN_B = 2.0 * cm

# ------------- styles -------------
title_style = ParagraphStyle(
    "Title", fontName="Helvetica-Bold", fontSize=30, leading=34,
    textColor=ACCENT, spaceAfter=4, alignment=TA_LEFT,
)
subtitle_style = ParagraphStyle(
    "Subtitle", fontName="Helvetica", fontSize=14, leading=18,
    textColor=MUTED, spaceAfter=18, alignment=TA_LEFT,
)
intro_style = ParagraphStyle(
    "Intro", fontName="Helvetica-Oblique", fontSize=11, leading=15,
    textColor=MUTED, spaceAfter=22, alignment=TA_LEFT,
)
h1_style = ParagraphStyle(
    "H1", fontName="Helvetica-Bold", fontSize=18, leading=22,
    textColor=ACCENT, spaceBefore=22, spaceAfter=10, alignment=TA_LEFT,
    keepWithNext=1,
)
h2_style = ParagraphStyle(
    "H2", fontName="Helvetica-Bold", fontSize=12.5, leading=16,
    textColor=DARK, spaceBefore=14, spaceAfter=6, alignment=TA_LEFT,
    keepWithNext=1,
)
body_style = ParagraphStyle(
    "Body", fontName="Helvetica", fontSize=10.5, leading=15,
    textColor=DARK, spaceAfter=8, alignment=TA_LEFT,
)
bullet_style = ParagraphStyle(
    "Bullet", fontName="Helvetica", fontSize=10.5, leading=14,
    textColor=DARK, spaceAfter=3, alignment=TA_LEFT,
)
callout_style = ParagraphStyle(
    "Callout", fontName="Helvetica-Oblique", fontSize=10.5, leading=15,
    textColor=DARK, alignment=TA_LEFT,
)
source_style = ParagraphStyle(
    "Source", fontName="Helvetica", fontSize=9.5, leading=12.5,
    textColor=DARK, spaceAfter=8, alignment=TA_LEFT, leftIndent=4,
)
source_subhead_style = ParagraphStyle(
    "SourceSubhead", fontName="Helvetica-Bold", fontSize=11, leading=14,
    textColor=ACCENT_SOFT, spaceBefore=12, spaceAfter=6, alignment=TA_LEFT,
    keepWithNext=1,
)


# ------------- helpers -------------
def md_inline(text: str) -> str:
    """Convert simple markdown bold/italic to ReportLab inline tags."""
    text = re.sub(r"\*\*(.+?)\*\*", r"<b>\1</b>", text)
    text = re.sub(r"(?<!\*)\*([^*]+?)\*(?!\*)", r"<i>\1</i>", text)
    return text


def P(text: str, style=body_style):
    return Paragraph(md_inline(text), style)


def H1(text: str):
    return Paragraph(md_inline(text), h1_style)


def H2(text: str):
    return Paragraph(md_inline(text), h2_style)


def bullets(items):
    list_items = [
        ListItem(P(item, bullet_style), leftIndent=18)
        for item in items
    ]
    return ListFlowable(
        list_items,
        bulletType="bullet",
        start="•",
        bulletFontName="Helvetica",
        bulletFontSize=10,
        bulletColor=ACCENT_SOFT,
        leftIndent=18,
        bulletIndent=4,
    )


def numbered(items):
    list_items = [
        ListItem(P(item, bullet_style), leftIndent=22)
        for item in items
    ]
    return ListFlowable(
        list_items,
        bulletType="1",
        bulletFormat="%s.",
        bulletFontName="Helvetica-Bold",
        bulletFontSize=10,
        bulletColor=ACCENT,
        leftIndent=22,
        bulletIndent=4,
    )


def hr(space_above=4, space_below=10):
    text_width = PAGE_W - MARGIN_L - MARGIN_R
    t = Table([[""]], colWidths=[text_width])
    t.setStyle(TableStyle([
        ("LINEBELOW", (0, 0), (-1, -1), 0.4, RULE),
        ("TOPPADDING", (0, 0), (-1, -1), space_above),
        ("BOTTOMPADDING", (0, 0), (-1, -1), space_below),
    ]))
    return t


def src(num, name, url, cat, country, lang, auth, rate, feed, note):
    """Render a single source entry as a Paragraph."""
    stars = "★" * auth + "☆" * (5 - auth)
    text = (
        f"<b>{num}. {name}</b> &nbsp;·&nbsp; <font color='#2c5f2d'>{url}</font><br/>"
        f"<font color='#5d5d5d' size='8.5'>"
        f"{cat} &nbsp;·&nbsp; {country} &nbsp;·&nbsp; {lang} &nbsp;·&nbsp; "
        f"Autoritet {stars} &nbsp;·&nbsp; {rate} &nbsp;·&nbsp; {feed}"
        f"</font><br/>"
        f"{note}"
    )
    return Paragraph(text, source_style)


def src_section(label):
    return Paragraph(label, source_subhead_style)


def stack_table(rows, col_widths=None):
    """Render a compact 3-column table: component / role / why."""
    text_width = PAGE_W - MARGIN_L - MARGIN_R
    if col_widths is None:
        col_widths = [text_width * 0.28, text_width * 0.32, text_width * 0.40]
    cell_style = ParagraphStyle(
        "TableCell", fontName="Helvetica", fontSize=9, leading=11.5,
        textColor=DARK, alignment=TA_LEFT,
    )
    header_style = ParagraphStyle(
        "TableHeader", fontName="Helvetica-Bold", fontSize=9.5, leading=12,
        textColor=ACCENT, alignment=TA_LEFT,
    )
    table_data = []
    for i, row in enumerate(rows):
        style = header_style if i == 0 else cell_style
        table_data.append([Paragraph(cell, style) for cell in row])
    t = Table(table_data, colWidths=col_widths, repeatRows=1)
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), CALLOUT_BG),
        ("LINEBELOW", (0, 0), (-1, 0), 0.6, ACCENT_SOFT),
        ("LINEBELOW", (0, 1), (-1, -1), 0.25, RULE),
        ("LEFTPADDING", (0, 0), (-1, -1), 8),
        ("RIGHTPADDING", (0, 0), (-1, -1), 8),
        ("TOPPADDING", (0, 0), (-1, -1), 6),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ]))
    return t


def cost_table(rows):
    """4-col table: scale / users / monthly cost / notes."""
    text_width = PAGE_W - MARGIN_L - MARGIN_R
    col_widths = [text_width * 0.22, text_width * 0.16, text_width * 0.22, text_width * 0.40]
    cell_style = ParagraphStyle(
        "CostCell", fontName="Helvetica", fontSize=9, leading=11.5,
        textColor=DARK, alignment=TA_LEFT,
    )
    header_style = ParagraphStyle(
        "CostHeader", fontName="Helvetica-Bold", fontSize=9.5, leading=12,
        textColor=ACCENT, alignment=TA_LEFT,
    )
    table_data = []
    for i, row in enumerate(rows):
        style = header_style if i == 0 else cell_style
        table_data.append([Paragraph(cell, style) for cell in row])
    t = Table(table_data, colWidths=col_widths, repeatRows=1)
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), CALLOUT_BG),
        ("LINEBELOW", (0, 0), (-1, 0), 0.6, ACCENT_SOFT),
        ("LINEBELOW", (0, 1), (-1, -1), 0.25, RULE),
        ("LEFTPADDING", (0, 0), (-1, -1), 8),
        ("RIGHTPADDING", (0, 0), (-1, -1), 8),
        ("TOPPADDING", (0, 0), (-1, -1), 6),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ]))
    return t


def callout(text):
    text_width = PAGE_W - MARGIN_L - MARGIN_R
    inner = Paragraph(md_inline(text), callout_style)
    t = Table([[inner]], colWidths=[text_width])
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), CALLOUT_BG),
        ("BOX", (0, 0), (-1, -1), 0.5, CALLOUT_BORDER),
        ("LEFTPADDING", (0, 0), (-1, -1), 14),
        ("RIGHTPADDING", (0, 0), (-1, -1), 14),
        ("TOPPADDING", (0, 0), (-1, -1), 12),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 12),
    ]))
    return t


# ------------- page chrome -------------
def on_page(canvas, doc):
    canvas.saveState()
    # Footer line + page number
    canvas.setStrokeColor(RULE)
    canvas.setLineWidth(0.4)
    canvas.line(MARGIN_L, 1.5 * cm, PAGE_W - MARGIN_R, 1.5 * cm)

    canvas.setFont("Helvetica", 9)
    canvas.setFillColor(MUTED)
    canvas.drawString(MARGIN_L, 1.0 * cm, "DogWorld — sammendrag på vanlig norsk")
    canvas.drawRightString(PAGE_W - MARGIN_R, 1.0 * cm, f"Side {doc.page}")
    canvas.restoreState()


# ------------- build -------------
doc = SimpleDocTemplate(
    OUT,
    pagesize=A4,
    leftMargin=MARGIN_L, rightMargin=MARGIN_R,
    topMargin=MARGIN_T, bottomMargin=MARGIN_B,
    title="DogWorld — sammendrag på vanlig norsk",
    author="DogWorld",
)

story = []

# Title block
story.append(P("DogWorld", title_style))
story.append(P("Sammendrag på vanlig norsk", subtitle_style))
story.append(P(
    "En oppsummering av hva vi fant da vi så på markedet for kennelprogramvare. "
    "Skrevet for noen som kan hund og oppdrett, men som ikke er teknisk.",
    intro_style,
))
story.append(hr(space_above=0, space_below=4))

# 1. Hvorfor vi gjorde dette
story.append(H1("Hvorfor vi gjorde dette"))
story.append(P(
    "Før vi bygger noe som helst, ville vi vite tre ting: hvordan kennelnettsider ser ut i dag, "
    "hva som allerede finnes av programvare for oppdrettere, og hvor det er hull i markedet som et nytt "
    "produkt kan fylle. Vi har sett på rundt 25 ekte, aktive kennelnettsider (mest norske, men også "
    "svenske, tyske, britiske og amerikanske), og vi har sett på alle kennel-administrasjonsprodukter "
    "vi har klart å finne. Her er hva vi lærte."
))

# 2. Hvordan kennelnettsider ser ut i dag
story.append(H1("Hvordan kennelnettsider ser ut i dag"))
story.append(P("Nesten alle kennelnettsider i verden har samme grunnstruktur:"))
story.append(bullets([
    "En **forside** med et stort bilde av en hund og kennelens navn",
    "En **Om oss**-side med oppdretterens historie og filosofi",
    "En **Hundene våre**-seksjon, nesten alltid delt opp i *hanner* og *tisper*",
    "En **Valper**-side som viser hva som er tilgjengelig nå",
    "En **Kull**-side — tyskerne navngir kull med bokstav (A-Wurf, B-Wurf...), de fleste andre med år eller sesong. Norske kenneler bruker ofte begge.",
    "En **Kontakt**-side med telefon, e-post, hjemsted, og lenker til Facebook og Instagram",
    "Merker som viser tilknytning til kennelklubb (NKK, AKC, KC, VDH)",
]))
story.append(Spacer(1, 8))
story.append(P("De fleste kenneler har også:"))
story.append(bullets([
    "En egen side for hver enkelt hund med bilde, registrert navn, kallenavn, fødselsdato, farge og titler",
    "En **pensjonerte hunder**-seksjon",
    "Et **bildegalleri**",
    "En **nyheter**- eller bloggside",
    "En side om **avlshannene** sine, med “tilgjengelig som avlshund”",
    "Et **søknadsskjema** for valpekjøpere",
    "En **minneside** for hunder som har gått bort. Dette er veldig vanlig på etablerte europeiske kenneler, men merkbart fraværende på de store amerikanske kommersielle Lab-kennelene.",
    "En **helse**-side — men den er nesten alltid skrevet som løpetekst (“hundene våre har HD A, ED 0, kjente øyne og full DNA-test”) i stedet for en ordentlig strukturert tabell. Dette er et reelt hull.",
]))
story.append(Spacer(1, 8))
story.append(P("Sjeldnere, men interessante ting noen kenneler gjør:"))
story.append(bullets([
    "“**Oppdrettet av oss**” — en side som viser hunder de har avlet som nå bor andre steder, og hva disse hundene har oppnådd",
    "“**Vår hannhund brukt på andre tisper**” — en offentlig liste over tisper deres hannhund har vært paret med, og resultatkullene",
    "En **valpedagbok uke for uke** med bildeoppdateringer for de som står på depositliste",
    "En **avlsfilosofi**-side (Puppy Culture, Early Neurological Stimulation, DDR-linjeopphav)",
    "**Flerspråklig veksler** — vanlig på bruks- og sportlinjekenneler som selger internasjonalt",
    "En **nettbutikk**, en **rå-/barf-foring**-side, **trening**, **pensjonat** — avhengig av hvilke andre virksomheter de driver",
]))
story.append(Spacer(1, 10))
story.append(callout(
    "Et par ting som nesten ingen kenneler gjør bra, og som er klare muligheter for oss: "
    "<b>interaktive stamtavler</b> (klikkbare slektstrær), <b>strukturerte helsetestresultater</b> "
    "(de fleste skriver dette som tekst i stedet for ren tabell), og <b>video</b> (de fleste lenker bare ut "
    "til YouTube/Instagram)."
))

# 3. Hva som allerede finnes
story.append(H1("Hva som allerede finnes av programvare for oppdrettere"))
story.append(P(
    "Vi har sett på alle kennelprodukter vi kunne finne. Den ærlige oppsummeringen: "
    "<b>markedet finnes, men det står stille</b>. De fleste produkter føles som om de "
    "ble bygget i 2010 og aldri har blitt redesignet siden."
))
story.append(P("Produktene som finnes faller i disse gruppene:"))

story.append(H2("Moderne oppdretter-programvare (ca. 90–400 kr/mnd)"))
story.append(P(
    "Breedera (UK), BreederBuddy (USA), BreederCloudPro, BreedTools, Dog Breeder Pro. Av disse er det "
    "bare <b>Breedera som faktisk er bygget for mobilen først</b>. Alle andre er skrivebordsprodukter "
    "klemt inn på en mobilskjerm, og brukerne klager."
))

story.append(H2("Gamle skrivebordsprogrammer (ca. 500–7 500 kr engangsbeløp)"))
story.append(P(
    "Breeder’s Standard, KennelMate, Kennel Connection. Disse har ofte de dypeste stamtavle- og "
    "innavlsfunksjonene, men de kjører kun på en Windows-PC, ser ut som 90-tallet, og har ikke "
    "nettside."
))

story.append(H2("Stamtavle-databaser"))
story.append(P(
    "K9data.com (mest Goldens og Labs), Working-dog.com (mest brukslinjeschæfer og malinois), "
    "PedigreeDatabase.com. Alle gratis eller delvis gratis, alle gamle, alle stygge."
))

story.append(H2("Nettsidebyggere laget spesielt for oppdrettere"))
story.append(P(
    "BetterBreeder, Built By Dusty, Honest Dog Breeder. Disse koster fra noen tusen kroner i året opp "
    "til over 100 000 kr for en “ferdiglaget” tilpasset side. Den mest brukte WordPress-utvidelsen "
    "for oppdrettere (“Breedr”) ble sist oppdatert i <b>februar 2018</b> — i praksis forlatt."
))

story.append(H2("Markedsplasser"))
story.append(P(
    "Good Dog (USA), AKC Marketplace, RightPaw (Australia). Disse lar deg legge ut valper, men du eier "
    "ikke din egen tilstedeværelse der."
))

story.append(H2("Hva som mangler i alt sammen"))
story.append(P("Fem hull samtidig — det betyr at det er en åpning for et nytt produkt:"))
story.append(numbered([
    "**Nesten ingenting er bygget for mobilen først.** Oppdrettere jobber i valpekassen, hos veterinæren, på utstillinger — med mobilen i hånda. Å sitte ved et skrivebord for å legge inn data er feil utgangspunkt.",
    "**Ingen hjelper deg med å flytte fra den gamle nettsiden.** Hver oppdretter vi snakker med har en sliten gammel Wix- eller WordPress-side de er lei av, men ikke orker å bygge på nytt. Ingen hjelper med dette.",
    "**Ingen tjener det nordiske markedet ordentlig.** Ingen programvare på norsk. Ingen integrasjon med NKK DogWeb. NKK lanserte et nytt sideregister høsten 2025, noe som betyr at hver eneste norske oppdretter akkurat nå må lære nye rutiner — perfekt timing for et nytt produkt.",
    "**Ingen bruker KI til noe nyttig** — selv om det er åpenbare steder det ville hjelpe (gjøre gamle papirstamtavler om til ren digital data, hjelpe med å skrive valpebeskrivelser, foreslå hvilke helsetester du mangler).",
    "**De fleste produkter skiller “bakkontoret” fra “den offentlige nettsiden”**, så du betaler for to ting og legger inn data to ganger. Det burde være ett produkt med én sannhetskilde.",
]))

# 4. Hva vi vil bygge
story.append(H1("Hva vi vil bygge"))
story.append(callout(
    "Hovedidéen: <b>ett enkelt produkt som er kennelens nettside OG deres avls-bakkontor, "
    "designet for mobilen først, og rettet mot det nordiske markedet til å begynne med.</b>"
))

story.append(H2("Det som må være med i versjon 1"))
story.append(bullets([
    "Mobilfokusert nettsidebygger med standardseksjonene hver kennel trenger (Om oss, Hunder delt i hanner/tisper, Valper, Kull, Minneside, Galleri, Kontakt)",
    "Ordentlige digitale registreringer for hver hund: registrert navn, kallenavn, fødselsdato, farge, microchip, registreringsnummer, foreldre, titler, helsetester, bilder",
    "Kull som ekte registreringer (ikke bare bilder i et galleri), med planlagt/aktivt/historisk status",
    "Minneside gjort skikkelig — det betyr emosjonelt mye for etablerte kenneler",
    "Bildeopplasting som faktisk fungerer på mobil",
    "**“Vi flytter deg gratis”-verktøyet** — lim inn URL-en til den gamle nettsiden, og vi henter automatisk ut alle hunder, bilder, stamtavler og titler over til den nye. (Vi har sjekket — dette er teknisk mulig. Du må gå over det vi henter ut før vi publiserer, men det skal spare deg for ukevis med tasting.)",
]))

story.append(H2("Hva som gjør oss annerledes i versjon 1"))
story.append(bullets([
    "**Friksjonsfri datainntasting** — ta bilde av papirstamtavlen, vaksinekortet eller helse-sertifikatet, så strukturerer KI det automatisk. Lim inn URL-en til den gamle kennelnettsiden, så henter vi alt over. Vi gjør den kjedelige jobben, ikke deg.",
    "En **ekte interaktiv stamtavle** (klikkbar, dyp så langt data finnes, med helse og titler vist på hver ane)",
    "En **innavlskalkulator** (COI og AVK) som faktisk fungerer på mobil — viktig for seriøse oppdrettere som planlegger paringer",
    "**Norsk og engelsk ved lansering**; svensk, dansk, tysk og nederlandsk kort tid etter",
    "**To startmaler** fordi det egentlig er to typer kenneler vi tjener (mer om dette under)",
    "<i>Stretch:</i> hvis NKK eller andre registre åpner data en dag, kobler vi oss på umiddelbart. Vi lover det ikke (mer om dette i kapittelet om strategisk pivot).",
]))

story.append(H2("Kommer kort tid etter lansering"))
story.append(bullets([
    "Online depositum og venteliste for valpekjøpere (Stripe-betaling)",
    "Offentlig avlshund-katalog (starten på den parallelle avlshund-app-idéen)",
    "Import fra ZooEasy og Breeders Assistant for de som bytter fra disse",
    "Direkte henting av DNA-resultater fra Embark, Wisdom Panel, Laboklin",
    "En “rasen din krever disse helsetestene, du mangler X”-veileder",
    "Validering mot rasespesifikk avlsstrategi (RAS) per rase",
]))

story.append(H2("Det vi IKKE skal bygge"))
story.append(bullets([
    "Pensjonat og dagpass for hund (annet marked; Gingr har det)",
    "Flere arter (katter, hester, osv.) — vi vil bli best på hund først",
    "Fullt regnskapssystem — vi integrerer heller med Fiken / Tripletex / lignende",
]))

# 5. To typer kenneler
story.append(H1("To typer kenneler — to startmaler"))
story.append(P(
    "Da vi så på ekte nettsider, la vi merke til at kenneler i grunn faller i to leire:"
))
story.append(P(
    "<b>Utstillings-, sport- og brukslinjekenneler</b> (som en seriøs schæfer-, malinois- eller "
    "bordercollie-kennel): de er stolte av stamtavler, titler, konkurranseresultater og linjehistorikk. "
    "Nettsiden er innholdsrik. Hundene selv er merkevaren."
))
story.append(P(
    "<b>Kommersielle valpekenneler</b> (som en travel Lab- eller Cavalier-oppdretter): fokuset er på "
    "søknadsskjema, depositum, FAQ, anmeldelser, “slik får du valp fra oss”, og "
    "kosttilskudd-mersalg. Nettsiden er en salgstrakt."
))
story.append(P(
    "Disse trenger forskjellig standardutseende og forskjellig standardrekkefølge på sidene. "
    "Vi bør levere to startmaler så hver type kennel føler at produktet er bygget for "
    "nettopp dem."
))

# 6. Avlshund-app
story.append(H1("Om en egen app for avlshunder (parallelt produkt, senere)"))
story.append(P(
    "Du nevnte at du på sikt vil skille ut en egen avlshund-app. Slik tenker vi:"
))
story.append(P(
    "Det gir mening som <b>eget produkt senere</b>, men som <b>funksjon inni DogWorld først</b>. "
    "Grunnen: de som eier en god avlshann er ikke alltid aktive oppdrettere selv. De kan ha én "
    "utmerket gutt og ville markedsføre ham som avlshund uten å trenge en hel kennelnettside. "
    "Det er en annen kunde med andre behov (en offentlig oppføring, en kalender, en kontrakt, "
    "organisering av sædforsendelse, og ideelt en KI-assistent som sier “denne hannen er en "
    "god match for tispen din basert på helse og innavl”)."
))
story.append(P(
    "Du har også helt rett i at <b>dette ikke bare handler om hanner</b> — det er en reell "
    "historie rundt tisper også: avlstisper som eierne vil leie ut, samarbeidsavtaler om delt "
    "eierskap, surrogatmødre. En katalog som bare lister hannhunder mangler halve bildet."
))
story.append(P(
    "Så veien er: bygg en <b>“avlstjeneste-katalog”</b> som funksjon i DogWorld i versjon 1.5, "
    "la kennelene velge å publisere sine tilgjengelige avlshanner <i>og</i> tilgjengelige tisper "
    "<i>og</i> delt-eierskap-tilbud, og når dette får trekkraft, skill det ut som egen "
    "merkevare-app som deler samme database. Kunden har aldri to kontoer."
))

# 7. Reiseledsager — ny idé
story.append(H1("Reiseledsager — kart og hjelp på farten (ny idé under utforskning)"))
story.append(P(
    "Vi vil legge til en mobilmodus der du åpner appen, ser et kart, og finner det du trenger "
    "som hundeeier — både hjemme og på reise."
))

story.append(H2("Hva en hundeeier trenger lokalt"))
story.append(bullets([
    "**Veterinærer i nærheten**, gradert: vanlig vakt, døgnåpen vakt, spesialist (ortoped, nevrolog)",
    "**Giftrådgivning** — viktig poeng: Giftinformasjonen (22 59 13 00) hjelper <i>ikke</i> med dyr. Da må du ringe NMBU Veterinærhøgskolen på 67 23 00 00. De fleste vet ikke dette.",
    "**Dyrebutikker** som fører riktig fôr (rå/BARF, Hill’s, Royal Canin)",
    "**Båndtvang-status akkurat der du står** — nasjonal båndtvang 1. april–20. august, men mange kommuner forlenger ut over dette i beiteområder",
    "**Hundeparker, hundestrender, løpepark-områder**, turer hvor hund er tillatt",
    "**DNT-hytter med hunderom** (mange tillater hund, men reglene varierer per hytte)",
    "**Trimmere, dagpensjonat, pensjonat, hundevennlige kafeer og hoteller**",
]))

story.append(H2("Hva du trenger på utenlandstur (særlig EU og Norden)"))
story.append(bullets([
    "**EU-pass for kjæledyr** — Norge er EØS, men Mattilsynet utsteder samme pass",
    "**Bendelorm-behandling** (24–120 timer før innreise) gjelder Finland, Irland, Malta, UK, Nord-Irland — <i>og Norge når du kommer hjem</i>. Lett å glemme.",
    "**Rasespesifikke forbud (BSL):** UK forbyr XL Bully (siden feb. 2024), Pit Bull, Tosa, Dogo, Fila. Tyskland varierer per delstat. Danmark, Frankrike, Spania (Catalonia) og Sveits har egne lister.",
    "**Fergeregler** — viktig for nordmenn: Color Line tillater ikke hund i lugar på Tyskland-ruta (kun bilbur, 7–10 plasser per avgang, må forhåndsbookes). Stena har dyrelugarer (også forhåndsbestilling). Begge fyller raskt om sommeren.",
    "**Flyselskap** — Italia tillater nå hund opp til 30 kg i kabin; de fleste andre cap’er på 8 kg.",
]))

story.append(H2("Akutt-hjelp på farten"))
story.append(bullets([
    "Nærmeste døgnåpne klinikk med ett trykk",
    "“Hva gjør jeg hvis hunden har spist X” — enkel beslutningshjelp",
    "Norske faresoner: huggorm (kystnært i sør), flått (sør/øst — 38 % serologisk positivt i fersk studie), TBE langs Skagerak",
    "**Nødsetningsbok på 12 språk**, tilgjengelig offline: “Hunden min har et anfall”, “har blitt påkjørt”, “har spist druer/sjokolade/medisin”",
]))

story.append(H2("Hva som finnes i markedet i dag"))
story.append(P("Kort versjon: ingen i Norden gjør dette skikkelig."))
story.append(bullets([
    "BringFido (global, mest USA — tynt i Norge)",
    "AllTrails (har “hundevennlig”-filter — tynt i Norge)",
    "FirstVet (videovet 24/7 — ingen kart eller stedstjenester)",
    "AniCura-appen — **lagt ned 30. november 2024**, et stort tomrom etter seg",
    "Forsikringsselskapenes apper (Agria, Gjensidige, If) — kun for kunder, kun chat",
    "Tractive (GPS-tracker, kjøpte Whistle aug. 2025 — kun sporing, ikke kart over tjenester)",
    "Google Maps “veterinærklinikk” — gir treff, men ingen “døgnåpent”-filter, ingen BSL, ingen båndtvang-status",
]))

story.append(H2("Hvordan vi vil bygge det"))
story.append(bullets([
    "**Kart:** MapLibre (åpen kildekode, gratis SDK), fliser fra MapTiler (~250 kr/mnd til å starte)",
    "**Stedsdata:** Overture Maps Places (gratis, åpen lisens, oppdateres månedlig av Meta/Microsoft/Esri) som basis. Google Places kun ved behov for åpningstider/bilder — slik holdes regningen nede.",
    "**Norsk vet-database:** vi bygger og vedlikeholder den selv — ca. 250 klinikker hentet fra AniCura, Evidensia, vetnett.no, 1881. Dette blir en del av merkevaren.",
    "**Brukerbidrag:** DogWorld-kennelene kan flagge “vet jeg stoler på kl. 02 i Bergen” — eksisterende kunder blir innholdsmotor.",
    "**Offline:** forhåndsnedlasting av reisepakker (Sverige-vest, Hirtshals–Skagen, Tyskland nord) med kart + vet-pin’er. Helt nødvendig på ferge der signalet faller ut.",
]))
story.append(P(
    "Kostnaden er beskjeden (~50–500 kr/mnd opp til 1 000 brukere) og fortsatt langt under en "
    "tilsvarende Google-basert løsning ved 10 000 brukere."
))

story.append(H2("Det som kan bli magisk — som ingen andre gjør"))
story.append(numbered([
    "**Grenseovergang-assistent.** Når du nærmer deg Svinesund eller Color Line-terminalen får du et varsel: “Du er på vei til Tyskland. Bendelorm-vinduet ditt utløper om 11 timer. Rasen din (rottweiler) er regulert i flere tyske delstater.”",
    "**Live båndtvang der du står** — bryter ned per kommune. Helt norsk.",
    "**Nødsetningsbok på 12 språk**, offline tilgjengelig.",
    "**KI-triage:** “Hunden min spiste druer” → beslutningstre → ring-knapp til nærmeste åpne klinikk eller FirstVet-video.",
    "**Flått- og huggorm-varsel** etter sesong, lagt over kartet (FHI har data).",
    "**“Asfalt akkurat nå”** — bruker YR.no til å regne ut potebrann-risiko før tur.",
    "**DNT-hytte hunderoms-info** — vi henter fra UT.no per hytte (tillatt / utendørs / eget hunderom).",
    "**Vaksinepass i lomma** — synket fra DogWorld-journalen, alltid for hånden, varsler før reisedato.",
    "**Fergelugar-vakt** — varsel når Stena/Color Line åpner dyrelugarer for en bestemt dato.",
    "**Tipskort fra lokale DogWorld-kenneler** — “her er veten jeg stoler på i mitt område”. Trygghetssignal.",
]))

# 8. Kjøperguide — ny idé
story.append(H1("Kjøperguide — kennelens egen oppskrift for nye valpeeiere (ny idé)"))
story.append(P(
    "Hver kennel skal kunne lage sin <i>egen</i> steg-for-steg-veiledning for nye valpeeiere. "
    "Ikke generelt app-innhold, men kennelens egne anbefalinger — knyttet til rasen, "
    "oppdrettsfilosofien og merkevaren deres."
))

story.append(H2("Problemet vi løser"))
story.append(P(
    "Når en kennel selger en valp, følger det typisk med en papirmappe eller en PDF på e-post: "
    "“Slik tar du vare på den nye valpen din.” Innholdet varierer enormt — noen sender 40 sider, "
    "noen sender ingenting. Etter første uke har den nye eieren mistet papirene, og ringer "
    "kennelen med spørsmål de allerede har svart på fem ganger."
))
story.append(P(
    "Samtidig: valpekjøpere i 2026 forventer ikke en PDF. De forventer en app eller en mobilside "
    "som bare fungerer."
))

story.append(H2("Hva funksjonen skal gjøre"))
story.append(bullets([
    "Hver kennel har sin **egen kjøperguide** publisert som en del av kennelnettsiden",
    "Guiden er strukturert i **faser**: første dag, første uke, første måned, 3/6/12 måneder, voksenliv",
    "Kan inneholde tekst, bilder og video — alt kennelen vil ha med",
    "Skreddersydd for **rasen** og **kennelens stil** (rå-fôring vs tørrfôr, bur-trening, treningsfilosofi, sosialisering)",
    "Hver valp får en **personlig versjon** med valpens navn, bilder fra kullet, og vaksinedatoer fra journalen ferdig utfylt",
    "Kjøperen får en **personlig lenke på e-post** den dagen valpen flytter hjem — eller en QR-kode i papirmappen som åpner appen",
    "Mobilvennlig — kjøperen åpner det på telefonen mens hun trøster valpen kl. 03",
]))

story.append(H2("Hvorfor dette er smart"))
story.append(bullets([
    "Kennelen reduserer antall “samme spørsmål om igjen” på telefon og Messenger",
    "Kennelen ser profesjonell ut og viser at de tar omsorg på alvor — sterkt salgsargument",
    "Innholdet er kennelens **egen merkevare**, ikke generisk app-tekst",
    "Det er en **vedlikeholdsfri kunderelasjon** — kennelen blir oppdretter for hele valpens liv, ikke bare frem til levering",
    "NKK gir alle nye valpeeiere en generisk brosjyre, men ingenting som er rase- eller kennelspesifikt — den nisjen er åpen",
]))

story.append(H2("Hva som finnes i markedet i dag"))
story.append(bullets([
    "**NKK valpebrosjyre** — generisk, samme tekst for alle raser, papir",
    "**Kennelene selv** — papirmappe eller PDF, kvaliteten varierer voldsomt",
    "**BreederBuddy / Breedera** har enkle valpekontrakt-funksjoner, men ingen rik guide etter salg",
    "**Good Dog** har meldingstjeneste mellom kjøper og oppdretter, men ingen strukturert veiledning",
    "**Ingen** har det vi snakker om — kennelmerket, mobilbasert, personlig per valp, tidsbasert",
]))

story.append(H2("Slik vil vi bygge det"))
story.append(P("<b>For kennelen:</b>"))
story.append(bullets([
    "En rikt redigerbar editor (som å skrive et blogginnlegg, ikke som å fylle ut et skjema)",
    "4–5 ferdige startmaler kennelen kan tilpasse: generisk familiehund, bruks-/sportlinje, toy-rase (Cavalier/Pomeranian), jakthunder, stor rase (vekst og leddhelse)",
    "Malene er åpenbart redigerbare — vi oppfordrer kennelen til å gjøre dem til sine egne",
]))
story.append(P("<b>For kjøperen:</b>"))
story.append(bullets([
    "Tidslinje-visning som “går med valpen” — når valpen er 14 uker viser den uke 14-innholdet øverst",
    "Push-varsler ved milepæler (“Tid for 12-ukers vaksine”, “Nå kan dere starte med løs leieslipping”)",
    "Tilbakemeldingskanal tilbake til oppdretter — kjøperen kan sende bilde og spørre (“Bella er 16 uker, ser hun OK ut?”)",
]))

story.append(H2("Magiske ting vi kan legge på"))
story.append(numbered([
    "**KI-drevet startoppsett** — kennelen krysser av noen valg (“vi gir Royal Canin valpefôr til 6 mnd”, “vi anbefaler bur-trening”, “positiv forsterkning”), og KI lager førsteutkast til hele guiden. Kennelen redigerer i sin egen stemme.",
    "**Auto-personalisering** — guiden bruker valpens navn, viser bilder fra valpens kull, fyller inn vaksinedatoer fra journalen.",
    "**Spørsmål-svar-bot** trent på kennelens egen guide — kjøperen spør i fri tekst (“kan jeg bade Bella denne uken?”) og får svar i kennelens stemme. Eskalerer til oppdretter ved usikkerhet.",
    "**Knyttet til reiseledsageren** — guiden sier “vi anbefaler rå-fôr”, og kart-funksjonen viser butikker i kjøperens region som fører det. Sirkulær verdi mellom funksjonene.",
    "**Knyttet til vaksinepasset** — datoene fra guiden vises i samme kalender som reisereglene.",
    "**Foto-tidslinje tilbake til oppdretter** — kjøperen sender oppdaterte bilder gjennom årene. Oppdretteren får en privat side per “alumni”-hund og kan (med samtykke) bruke bildene i “Oppdrettet av oss”-seksjonen.",
    "**Flerspråklig** — selger du valp til Tyskland, oversettes guiden automatisk.",
    "**Påminnelse til 1-årsdagen** — “Bella fyller 1 år, har du nye bilder til kennelen?” Oppdretterens database fylles opp med voksenbilder av sine egne oppdrettsdyr.",
]))

story.append(H2("Hvorfor dette er viktigere enn det høres ut som"))
story.append(P(
    "Tre ting skjer med samme funksjon:"
))
story.append(numbered([
    "**Kennelens merkevare blir sterkere** — guiden vises på kennelnettsiden som “se hvor seriøse vi er”",
    "**Kjøperen får en mye bedre opplevelse** og er mer fornøyd → bedre anmeldelser → flere salg",
    "**Kennelen får en livslang kunderelasjon** — som blir morgendagens “alumni”-database og bevis på god avl",
]))
story.append(P(
    "Det er en av de få funksjonene som gjør alle tre interessenter — kennelen, kjøperen, og "
    "fremtidige kjøpere — bedre samtidig."
))

# 9. Teknologi-valg
story.append(H1("Teknologi-valg — hva vi bygger det på"))
story.append(callout(
    "Denne delen er mer teknisk og er mest for Ole — hopp gjerne over hvis det blir for tett. "
    "Hovedpoenget: vi vil bygge dette enklest mulig, med færrest mulig flyttbare deler, men sterk nok "
    "stamme til å vokse."
))

story.append(H2("Hovedstrategi: én kodebase som dekker alt"))
story.append(P(
    "Mest brennende valg først: vi bygger <i>ikke</i> separate apper for iOS, Android og web. Det er "
    "tre ganger så mye kode å vedlikeholde, og du må ansette tre typer utviklere. I stedet velger vi:"
))
story.append(P(
    "<b>Én moderne web-app som er mobilvennlig fra starten av</b>, og som kan pakkes inn i en "
    "“wrapper” (Capacitor) hvis vi senere vil inn i App Store eller Google Play. Samme kode kjører "
    "som nettside, som telefonapp, og som desktop-app. Patcher du noe, går det automatisk overalt."
))
story.append(P(
    "For brukere på telefon ser det ut som en app. For brukere på laptop ser det ut som en nettside. "
    "Begge får samme funksjoner og samme oppdateringer."
))

story.append(H2("Frontend — det brukeren ser"))
story.append(P("Tre seriøse kandidater:"))

story.append(P("<b>Next.js (React)</b> — anbefaling"))
story.append(bullets([
    "<b>For:</b> størst økosystem, lettest å finne utviklere, mest dokumentasjon, mest KI-verktøystøtte (Cursor, Claude Code er sterkere på React enn på alternativene)",
    "<b>Mot:</b> mer boilerplate enn Svelte, litt større bundle-størrelse → marginal forsinkelse på gamle telefoner",
]))

story.append(P("<b>SvelteKit</b> — det enkleste alternativet"))
story.append(bullets([
    "<b>For:</b> minst kode, raskest på mobil, enklest å lære. Komponenter er atomiske av natur. Mindre å vedlikeholde.",
    "<b>Mot:</b> mindre økosystem, færre komponentbiblioteker, færre tilgjengelige utviklere i Norge",
]))

story.append(P("<b>Nuxt (Vue)</b> — middels mellom de to"))
story.append(bullets([
    "<b>For:</b> grei balanse mellom enkelhet og økosystem",
    "<b>Mot:</b> mindre brukt enn de to andre, lite å vinne over å velge Next.js",
]))

story.append(P(
    "<b>Min anbefaling: Next.js.</b> Det er det “sikre” valget — størst økosystem, mest hjelp "
    "tilgjengelig (også fra KI-verktøy som Claude og Cursor), enklest å rekruttere til senere. "
    "SvelteKit er forfriskende, men setter deg i en mindre dam av tilgjengelig kompetanse."
))
story.append(P(
    "Stylet med <b>Tailwind CSS</b> (atomisk styling — perfekt match for designprinsippet ditt) og "
    "<b>shadcn/ui</b> (komponentbibliotek bygget på samme prinsipp: du kopierer komponentene inn i "
    "prosjektet og tilpasser fritt, ikke en pakke du er låst til)."
))

story.append(H2("Backend — det som lever på tjenerne"))
story.append(P(
    "Du vil <i>ikke</i> skrive backend fra bunnen av. Det er penger og tid brukt på et problem "
    "alle andre allerede har løst."
))

story.append(P("<b>Supabase</b> — anbefaling"))
story.append(bullets([
    "Postgres-database (ekte relasjonell DB, perfekt for stamtavle-koblinger)",
    "Innebygd brukerregistrering og pålogging",
    "Innebygd filhåndtering (bilder, PDF-er)",
    "Innebygd sanntidskommunikasjon (chat mellom oppdretter og kjøper kommer gratis)",
    "Åpen kildekode — du kan flytte ut hvis du må",
    "EU-region tilgjengelig (datalagring i EU/EØS — viktig for norske kunder og GDPR)",
    "Pris: gratis til du er i gang, ca. $25/mnd (~270 kr) for seriøs bruk",
    "Sparer 3–6 måneders backend-utvikling",
]))

story.append(P("<b>Firebase</b> (Google) — fungerer, men trekker ned"))
story.append(bullets([
    "<b>Mot:</b> låser deg til Google, bruker en database (Firestore) som er dårlig egnet til stamtavle-koblinger, vanskeligere datasuverenitet i EU",
]))

story.append(P("<b>PocketBase eller selv-hostet Postgres</b> — ikke verdt det"))
story.append(bullets([
    "<b>For:</b> ekstremt billig (en VPS for $5/mnd holder)",
    "<b>Mot:</b> du står for sikkerhetspatcher, oppetid, backup, oppdateringer. Distraksjon fra produktet.",
]))

story.append(P(
    "<b>Anbefaling: Supabase.</b> Det er de facto-standarden for moderne “indie SaaS” og du får "
    "rundt 90 % av en backend gratis ut av boksen."
))

story.append(H2("Drift og hosting"))
story.append(bullets([
    "<b>Vercel</b> for frontend (Next.js sin egen plattform, gratis til du har trafikk, deretter rimelig)",
    "<b>Supabase managed</b> for backend (ingen servere du må passe på)",
    "<b>Cloudflare R2</b> for bildelagring etter hvert som det vokser — kostnadsmessig overlegen (zero egress fees)",
    "<b>EU-region overalt</b> — viktig for personvern (GDPR) og merkevare-troverdighet i Norden",
]))

story.append(H2("Atomisk design — slik settes UI-et sammen"))
story.append(P(
    "Atomisk design passer perfekt med stacken over:"
))
story.append(bullets([
    "<b>Atomer:</b> knapper, inntastingsfelt, etiketter (kommer ferdig fra shadcn/ui)",
    "<b>Molekyler:</b> skjemarader, kort, listeelementer (vi bygger ved å kombinere atomer)",
    "<b>Organismer:</b> hund-profil-kort, kull-kort, kjøperguide-seksjon (sammensetninger av molekyler)",
    "<b>Maler:</b> sidelayouter (kennelside, valpe-side, dashboard)",
    "<b>Sider:</b> faktiske ferdige skjermbilder",
]))
story.append(P(
    "Vi bruker <b>Storybook</b> til å holde komponentbiblioteket organisert — en blader-katalog "
    "som viser alle komponenter og tilstander uten å starte hele appen. Stort tidssparende verktøy "
    "når biblioteket vokser."
))

story.append(H2("KI-integrasjon"))
story.append(bullets([
    "<b>Anthropic API (Claude)</b> for innholdsfunksjoner: trekke ut data fra gamle nettsider ved migrering, lage utkast til kjøperguider, oversettelser, kunde-Q&A-bot, og triage-funksjonen i reiseledsageren",
    "Pris: betaler per “tokens” (~4 tegn per token). Migrering av én kennel: ~10–80 kr. KI-bot på chat: noen få kr per kunde per måned.",
    "Anthropic har EU-region tilgjengelig, og data brukes ikke til trening med mindre du eksplisitt sier ja",
]))

story.append(H2("Hva det vil koste å drifte"))
story.append(P("Grovt anslag etter hvert som vi vokser:"))
story.append(bullets([
    "<b>Utvikling (0 brukere):</b> ~50 kr/mnd (kun KI under prototyping)",
    "<b>100 betalende kunder:</b> ~800 kr/mnd",
    "<b>1 000 betalende kunder:</b> ~4 000 kr/mnd",
    "<b>10 000 betalende kunder:</b> ~20 000 kr/mnd",
]))
story.append(P(
    "Til sammenligning: 1 000 kunder à 200 kr/mnd i abonnement = 200 000 kr/mnd i inntekt. "
    "Driftskostnaden er en beskjeden andel av omsetningen."
))

story.append(H2("Det vi bevisst IKKE gjør"))
story.append(bullets([
    "<b>Microservices.</b> Alt for mye kompleksitet for et tidlig stadium. Én monolitt med rene grenser internt er bedre i 5+ år.",
    "<b>Egen brukerregistrering og pålogging.</b> Supabase eller Clerk gjør dette mye bedre enn vi kan på rimelig tid.",
    "<b>Tre kodebaser (iOS / Android / web).</b> Én kodebase med Capacitor når vi vil til App Store.",
    "<b>Selv-hostet alt.</b> Hver tjeneste du må passe på, er en distraksjon fra produktet. Bruk PaaS til det går utover lommeboken.",
    "<b>For mange språk for tidlig.</b> Norsk + engelsk ved lansering. Svensk, dansk, tysk når vi har bevist verdien.",
]))

story.append(H2("Oppsummering — det enkleste som tåler vekst"))
story.append(bullets([
    "<b>Frontend:</b> Next.js + Tailwind + shadcn/ui (atomisk, mobil-først, responsivt)",
    "<b>Pakking til app:</b> Capacitor når vi vil i App Store / Google Play",
    "<b>Backend:</b> Supabase (Postgres + auth + storage + realtime — alt klart)",
    "<b>Bildelagring:</b> Cloudflare R2 etter hvert som volumet vokser",
    "<b>KI:</b> Anthropic API for innhold og chat",
    "<b>Datasenter:</b> EU-region overalt",
    "<b>Designsystem:</b> Storybook holder komponentbiblioteket sortert",
]))
story.append(P(
    "Dette er en stack vi kan drifte selv som et team på 1–3 personer, betale godt under "
    "1 000 kr/mnd til vi er ved hundretalls kunder, og som tåler vekst til titusenvis av kunder "
    "uten omskriving."
))

# 10. Sideplan og UX
story.append(H1("Sideplan og UX — slik er appen bygget opp"))
story.append(callout(
    "Hovedprinsippet: telefonen er primærverktøyet. Kamera er hovedinngangen. "
    "KI gjør den kjedelige jobben. Alt skal kunne gjøres med tommelen mens du sitter "
    "i valpekassa."
))

story.append(H2("Fire forskjellige brukere — fire forskjellige opplevelser"))
story.append(P(
    "Appen tjener fire ulike personer som hver bruker den helt forskjellig. Vi designer hver "
    "opplevelse for sin egen kontekst — ikke ett grensesnitt som tvinges på alle:"
))
story.append(bullets([
    "**Oppdretteren** (betalende kunde): bruker bakkontoret daglig — i valpekassa, hos veterinæren, på utstilling. Tommelfingeren, mobil, ofte med valp i den andre hånda.",
    "**Den offentlige besøkende** (kjøperprospekt, andre oppdrettere): leser kennelnettsiden. Vurderer om denne kennelen er seriøs. Bruker ofte mobil først, deretter laptop hvis interessen vekkes.",
    "**Valpekjøperen etter salg**: åpner kjøperguiden på telefonen, ofte midt på natta, ofte sliten. Trenger trygghet og svar.",
    "**Hundeeieren på farten**: åpner reisemodus når noe haster (vet, gift, fergeregler). Stressnivå høyt. Tappekompensasjon må være null.",
]))

story.append(H2("Skjerm-for-skjerm: oppdretterens hverdag"))

story.append(P("<b>1. “Hva skjer i dag”-skjermen (hjem)</b>"))
story.append(bullets([
    "<b>Innhold:</b> dagens viktige hendelser — vaksine forfaller, valp hentes i dag, ny henvendelse, kull X går inn i uke 4. Stor kameraknapp nederst til høyre.",
    "<b>Hvorfor:</b> dette er skjermen oppdretteren ser hver gang appen åpnes. Den må gi øyeblikkelig oversikt og umiddelbar verdi. Vi låner mønsteret fra Linear/Notion/Things — dagens fokus øverst, alt annet ett trykk unna.",
    "<b>Mønster:</b> aktivitetsfeed (LinkedIn/Slack) + global handlingsknapp (Apple Notes “ny notat”, X “tweet”) som flytende sirkel i tommel-rekkevidde.",
]))

story.append(P("<b>2. Hund-detalj — den mest besøkte skjermen</b>"))
story.append(bullets([
    "<b>Header:</b> stort bilde, navn, alder, status (aktiv / pensjonert / borte). Trykk på bildet → galleri.",
    "<b>Faner:</b> Profil / Stamtavle / Helse / Titler / Bilder / Notater. Sveip mellom dem på mobil.",
    "<b>Inline-redigering:</b> ett trykk på et felt → tastatur åpnes → endre → ferdig. Ikke en “rediger”-modus med “lagre”-knapp. Apple Notes / Notion-paradigmet. Vi sparer brukeren for tre trykk per endring.",
    "<b>Kamera:</b> ett trykk → kameraet åpnes direkte, ikke filvelger. AI gjenkjenner ofte hvilken hund det er fra tidligere bilder og foreslår automatisk.",
    "<b>Hvorfor:</b> dette er hjerteskjermen. Friksjonsfri redigering er kritisk — oppdrettere oppdaterer mange små detaljer mange ganger.",
]))

story.append(P("<b>3. Kull-detalj — tidslinjen med valpene</b>"))
story.append(bullets([
    "<b>Tidslinje øverst:</b> før paring → paring → drektighet → valping → uke for uke → levering → alumni. Du ser nøyaktig hvor du er.",
    "<b>Vekt-registrering med kamera:</b> ta bilde av vekten, OCR-leser tallet, registreres på dagens dato. Trippelt så fort som å taste inn.",
    "<b>Daglig logg:</b> ett trykk for “alt OK i dag”. Ellers fri tekst eller bilde.",
    "<b>Hvorfor:</b> kull er kennelens daglige fokus i 8–12 uker. Dette MÅ være den enkleste siden i hele appen. Inspirasjon: baby-utvikling-apper (Glow, Baby Tracker) for tidslinjen, treningsdagbøker for vekt-grafer.",
]))

story.append(P("<b>4. Stamtavle-utforskeren</b>"))
story.append(bullets([
    "<b>Visning:</b> 5-generasjoners interaktivt tre. Sveip og zoom. Trykk på en hund → går til den hunden.",
    "<b>Helse + titler vises:</b> hver celle viser kjernedata uten å klikke.",
    "<b>COI/AVK-beregning:</b> velg to hunder fra forskjellige stamtavler → vi simulerer parringen og viser innavlsgrad og helse-overlapp.",
    "<b>Hvorfor:</b> ingen konkurrent gjør dette skikkelig på mobil. Det er en av tre store differensieringsmuligheter (sammen med “vi flytter deg” og NKK-integrasjonen).",
]))

story.append(P("<b>5. Helse-dashboard per hund</b>"))
story.append(bullets([
    "<b>Strukturert tabell:</b> HD, AD, øyne, hjerte, DNA-tester — verdi, dato, scheme, sertifikat-PDF.",
    "<b>Kamera/skanner:</b> ta bilde av et helse-sertifikat → KI plukker ut testtype, verdi, dato, sertifikatnummer → forhåndsutfylt skjema for godkjenning.",
    "<b>Påminnelser:</b> årlige eye-tester forfaller automatisk.",
    "<b>Hvorfor:</b> markedet skriver helse som løpetekst i dag. Strukturerte data + sertifikat-bilder gir kjøperen sterkere tillit og er ren markedsføringsfordel for kennelen.",
]))

story.append(H2("Kameraet er hovedinngangen — gjennomgående pattern"))
story.append(P(
    "Vi behandler kameraet som en likeverdig inngangsmetode med tastaturet. Her er de "
    "konkrete stedene KI-bildebehandling sparer oppdretteren timer:"
))
story.append(bullets([
    "<b>Papir-stamtavle → digital stamtavle:</b> bilde av en FCI/AKC/NKK-stamtavle, KI leser foreldre, besteforeldre, registreringsnumre. Stub-hunder opprettes automatisk og kobles inn i treet.",
    "<b>Vaksinasjonskort → vaksinedatabase:</b> bilde av valpens vaksinasjonsside i passet, OCR plukker dato, produkt, batch-nummer. Kalenderen fyller seg.",
    "<b>Helse-sertifikat → strukturert resultat:</b> bilde av OFA-, NKK- eller Laboklin-rapport, KI plukker testtype, verdi, dato, sertifikat-ID.",
    "<b>Utstillingskritikk → resultat:</b> bilde av dommerkritikk, OCR + KI strukturerer dato, dommer, klasse, plassering, kritikktekst.",
    "<b>Vekt-bok → vekt-graf:</b> bilde av sidene i en gammel vekt-bok, KI gjenkjenner valpenavn og daglige vekter, fyller grafen.",
    "<b>Gammel papir-kjøperguide → digital kjøperguide:</b> bilde av en eksisterende “going home”-pakke, KI strukturerer det som førsteutkast i kjøperguide-editoren.",
    "<b>Hund-bilde → hund-gjenkjenning:</b> bilde av en hund kennelen allerede har lagt inn, KI foreslår automatisk hvilken hund det er.",
]))

story.append(H2("Skjermene den offentlige besøkende ser"))

story.append(P("<b>6. Kennelens forside (kennel-x.no eller subdomene under DogWorld)</b>"))
story.append(bullets([
    "Hero: stort bilde + kennelnavn + tagline",
    "Snapshot: aktuelle kull, nylige titler, siste nytt",
    "“Slik får du valp fra oss”-CTA øverst",
    "Bunn-nav: Om oss / Hundene våre / Valper / Kull / Galleri / Kontakt / Minneside",
    "<b>Hvorfor:</b> speiler den universelle strukturen vi fant på alle kennelsider. Vi skiller oss bare ved å være elegant, rask og mobil-først.",
]))

story.append(P("<b>7. Hund-profilside (offentlig)</b>"))
story.append(bullets([
    "Stort bilde, navn, registrert navn, kallenavn, fødselsdato, farge, titler",
    "Klikkbar 5-generasjons stamtavle — den åpenbare differensieringen",
    "Strukturert helse-tabell (ikke prosa) med lenker til offentlige registre (NKK DogWeb / OFA)",
    "Konkurranseresultater og kritikker, kronologisk",
    "<b>Hvorfor:</b> her evaluerer kjøperen kennelen. Vi vinner ved å vise stamtavle og helse mye bedre enn alle andre.",
]))

story.append(P("<b>8. Valpe/kull-side (offentlig)</b>"))
story.append(bullets([
    "Bilder oppdateres ukentlig (kommer naturlig fra kennelens egen valpedagbok — ikke et ekstra trinn)",
    "Per-valp-status: tilgjengelig / reservert / solgt (med ranking i venteliste hvis aktuelt)",
    "“Søk om valp”-knapp åpner søknadsskjema",
    "<b>Hvorfor:</b> kombinerer salgs-mekanikken med åpenhet — fungerer både for kennel og kjøper.",
]))

story.append(P("<b>9. Minneside</b>"))
story.append(bullets([
    "Hver hund som er gått bort har sitt eget rom — fødselsdato, dødsdato, narrativ, bildegalleri",
    "Knapp “Send minneord” for tidligere valpekjøpere — bygger emosjonelt bånd og skaper alumni-engasjement",
    "<b>Hvorfor:</b> betyr emosjonelt mye for etablerte kenneler. En av få funksjoner som faktisk skaper lojalitet hos eldre brukere.",
]))

story.append(H2("Kjøperportalen (etter salg)"))

story.append(P("<b>10. Velkomstskjerm</b>"))
story.append(bullets([
    "“Velkommen, [kjøperens navn]. Her er [valpens navn] sin reise med deg.”",
    "Personlig hilsen fra oppdretter (video eller tekst)",
    "<b>Hvorfor:</b> omsorgsfølelse fra første sekund. Vi vil at relasjonen til kennelen skal kjennes umiddelbart sterkere her enn på en hvilken som helst annen plattform.",
]))

story.append(P("<b>11. Bellas tidslinje (hovedskjermen for kjøperen)</b>"))
story.append(bullets([
    "Øverst: hva som skjer DENNE uka (basert på alder) — kennelens egne anbefalinger først, så generell faglig",
    "Push-varsler ved milepæler (12-ukers vaksine, sosialiseringsvindu)",
    "Knapp: “Spør oppdretter” → chat",
    "Kamera: ta bilde av Bella → sendes til oppdretterens private alumni-side, med samtykke",
    "<b>Hvorfor:</b> holder kennelens varemerke i kjøperens lomme. Relasjonen vedlikeholder seg selv.",
]))

story.append(H2("Reisemodus (alle hundeeiere)"))

story.append(P("<b>12. Kart-skjermen</b>"))
story.append(bullets([
    "Stort kart, filterchips øverst: Vet · Akutt · Park · Hundefor · Strand · Hotel",
    "“Nær meg” aktiveres automatisk når skjermen åpnes",
    "Stor rød knapp i bunnen: Akutt → tre store knapper (nærmeste døgnvet, NMBU, FirstVet)",
    "<b>Hvorfor:</b> ren utforming i hverdagen, men aldri mer enn ett trykk fra akutt-hjelp. Liv-eller-død-bruken må være primær.",
]))

story.append(P("<b>13. Reise-sjekklisten</b>"))
story.append(bullets([
    "“Jeg planlegger tur til [land] [dato]” → genererer huskeliste",
    "Kamera: skann hundens pass → KI plukker ut vaksiner og utløpsdatoer",
    "Påminnelser: “Bendelorm-vindu åpner om 3 dager”",
    "<b>Hvorfor:</b> løser et reelt smertepunkt — folk har glemt regler og blitt avvist på ferge.",
]))

story.append(H2("Det vi MÅ ha på launch (MVP-omfang)"))
story.append(P(
    "Vi kan ikke bygge alt over på dag én. Her er det minimum vi trenger for å starte å ta inn "
    "betalende kunder — det vi kaller “én ekte sløyfe verdi”:"
))
story.append(bullets([
    "<b>Onboarding + migrering</b> (fra WordPress, Wix, Squarespace, eller skann av papir)",
    "<b>Oppdretter-dashboard</b> (hjem-skjermen, “hva skjer i dag”)",
    "<b>Hund-profiler</b> med kamera-først bildeopplasting og inline-redigering",
    "<b>Kull-håndtering</b> (opprett kull, registrer valper, ukentlig logg)",
    "<b>Offentlig kennelside</b> auto-generert fra dataene (én startmal, kommersiell og utstilling kommer senere)",
    "<b>Minneside</b> (liten funksjon, høy emosjonell verdi)",
    "<b>Site-innstillinger</b> (tema-farge, logo, eget domene, offentlig/privat per hund)",
    "<b>Stamtavle-visning</b> (foreldre + besteforeldre — fullt 5-gen-tre kommer etter launch)",
    "<b>Strukturerte helsetestresultater</b> med kamera-skanner for sertifikater",
    "<b>Konto, innlogging, betaling</b> (Supabase Auth + Stripe Billing)",
]))

story.append(P("Følgende kan vente til måneder 2–6 etter launch:"))
story.append(bullets([
    "Kjøperguide-editor + kjøperportalen",
    "Reisemodus (kart, akutt, sjekklister)",
    "Avlshund-katalog",
    "Online depositum og venteliste",
    "Full dyp interaktiv stamtavle + COI/AVK-kalkulator (uten generasjonstak)",
    "Brukerstøttet oppslag mot NKK / SKK / KC m.fl. via bookmarklet eller dyp-lenking — IKKE en lovet integrasjon (se kapittelet om strategisk pivot)",
    "Push-varsler via Capacitor (vi starter med web)",
    "Svensk, dansk, tysk og nederlandsk lokalisering",
]))

# 11. Markedsføring etter lansering
story.append(H1("Markedsføring etter lansering — slik bruker vi KI til å vokse"))
story.append(callout(
    "Hovedidéen: små team, store distribusjonskanaler. Vi bruker KI som forsterker — "
    "ikke for å erstatte ekte stemme, men for å gange stemmen vi har med 10–20."
))

story.append(H2("Hvem markedsfører vi til — og hvor er de"))
story.append(P(
    "Norske oppdrettere lever ikke på TikTok. De lever i ganske spesifikke kanaler. "
    "Vi møter dem der de er, ikke der vi ønsker de var:"
))
story.append(bullets([
    "<b>Facebook-grupper per rase.</b> Hver rase i Norge har 1–3 store grupper (“Schäferentusiaster i Norge”, “Cavalier Norge”, “Norske Labradoroppdrettere”). Disse er hovedscenen.",
    "<b>NKK-tilknyttede raseklubber.</b> Egne nettsider, egne nyhetsbrev, egne arrangementer.",
    "<b>Norske utstillinger og prøver.</b> NKK Dogs4All, regionale utstillinger, IGP-stevner, jaktprøver. Fysisk tilstedeværelse betyr noe i dette markedet.",
    "<b>Instagram.</b> Yngre oppdrettere bygger varemerke her. Bilder selger.",
    "<b>YouTube.</b> Lengre format for trening, valping, oppdrett. Mindre konkurranse på norsk enn engelsk.",
    "<b>Search (Google).</b> “Kennel programvare”, “oppdretter app”, “digital stamtavle” — lave søkevolumer, men høy intensjon.",
    "<b>E-post fra oss.</b> Når noen registrerer seg men ikke fullfører onboarding, drypp-sekvens med små verdiøyeblikk.",
]))

story.append(H2("Hva slags innhold lager vi"))
story.append(P("Fire arketyper, hver med tydelig formål:"))
story.append(bullets([
    "<b>Kennel-portretter (“Kennel i fokus”).</b> Vi besøker en kennel som bruker DogWorld, intervjuer dem, lager en kort video + skriftlig artikkel + 6 sosiale poster. Sosial proof er den sterkeste markedsføringen i dette markedet — “se hva [navngitt kennel] gjør”.",
    "<b>Hvordan-guider.</b> “Slik flytter du kennelnettsiden din til DogWorld på 20 minutter”, “Slik registrerer du et kull på telefonen mens du sitter i valpekassa”. Verdien er konkret og vises i appen.",
    "<b>Faglig innhold.</b> “Forstå HD-skalaer: FCI A/B/C/D/E vs OFA Excellent/Good/Fair”, “Bendelorm-regler for nordmenn til Storbritannia 2026”. Vi blir et kompetansesenter, ikke bare et verktøy.",
    "<b>Mot-konkurrent-poster.</b> “DogWorld vs ZooEasy: hva er forskjellen”. Trygt skrevet, ærlig, ikke nedlatende. Sammenligningsinnhold rangerer høyt på Google.",
]))

story.append(H2("Hvordan KI akselererer produksjonen"))
story.append(P(
    "Vi går fra ett innholdsstykke til 8–12 distribusjonspunkter, uten å gjenta jobben manuelt:"
))
story.append(bullets([
    "<b>Førsteutkast med Claude:</b> intervjuopptak fra kennelbesøk → transkript → blogginnlegg-utkast. Hovedjobben blir å redigere stemmen, ikke å skrive fra null.",
    "<b>Variant-generering:</b> ett blogginnlegg → 3 Facebook-poster (kort, mellom, lang) + 5 Instagram-caption-varianter + 1 Twitter/X-tråd + 1 LinkedIn-post + 1 nyhetsbrev. Claude lager alle på 5 minutter, vi velger og redigerer.",
    "<b>Bilde og video:</b> opptak fra kennelen er gull — ekte bilder slår KI-genererte bilder i dette markedet. KI brukes til <i>klippe</i>: Opus Clip og Munch tar én 20-minutters video og finner 6 korte klipp egnet for Reels/TikTok.",
    "<b>Oversettelse:</b> hver artikkel oversettes til svensk, dansk og tysk med Claude — vi får tre ekstra markeder uten ekstra skrivearbeid.",
    "<b>Bilde-undertekster og alt-tekst:</b> automatisk fra bildeinnholdet → bedre tilgjengelighet og bedre SEO.",
    "<b>SEO-research:</b> Ahrefs + Claude finner hva norske oppdrettere faktisk søker etter, og hvilke konkurrenter rangerer.",
    "<b>E-postpersonalisering:</b> drypp-sekvensen tilpasser seg hvor langt brukeren kom i onboarding — Claude lager varianten for nettopp den brukerens steg.",
]))

story.append(H2("Distribusjon — slik når innholdet ut"))
story.append(bullets([
    "<b>Sosialt:</b> Buffer eller Publer for planlegging på tvers av kanaler. Én plan, mange utganger.",
    "<b>Nyhetsbrev:</b> Resend eller Buttondown for sending. Audience-segmenter (prospekt / kunde / inaktiv) får forskjellige sekvenser.",
    "<b>Produkt-e-post:</b> Loops eller Customer.io for utløst e-post inne i appen (“du har ikke fullført onboarding”, “gratulerer — første kull lagt inn”).",
    "<b>SEO-innhold:</b> publiseres på blog.dogworld.no, automatisk lenker til relevante kennelsider på plattformen.",
    "<b>Facebook-grupper:</b> her gjør vi ikke automatisering — ekte mennesker svarer på ekte spørsmål. KI hjelper med å forberede svar, men vi poster ikke automatisk. (Det blir gjenkjent og slått av som spam.)",
    "<b>Betalt:</b> målrettede Facebook-annonser mot personer som har likt raseklubb-sider. Liten startbudsjett (~500 kr/mnd), måles strengt på faktisk registrering.",
    "<b>Partnerskap:</b> NKK / breed clubs — vi tilbyr rabatt for medlemmer, de tilbyr oss eksponering. Ikke gratis, men billigere enn annonser per kunde.",
]))

story.append(H2("Tre tidlige bevegelser som har størst effekt"))
story.append(numbered([
    "**Skaff de første 5 lighthouse-kennelene.** Velg dem bevisst — én kjent utstillingskennel (Cavalier eller Golden), én bruks/sport-kennel (schæfer eller malinois), én rar-rase som ingen tjener i dag (Norsk Lundehund?), én ny oppdretter (sympati), én internasjonal som selger til Tyskland. Vi gir dem appen gratis i 12 måneder mot å være offentlig referansekunder. Sosial proof er alt.",
    "**Lag “Slik flytter du Wix-siden din til DogWorld”-video og artikkel.** Dette er det enkleste lønnsomme søkeordet. Folk som leter etter dette har allerede bestemt seg for at de vil skifte — vi trenger bare å være svaret.",
    "**Skriv den definitive guiden til norske oppdretter-regler.** RAS per rase, NKK-prosess, Mattilsynet, EU-pass, bendelorm-vinduer. 8 000 ord, oppdatert hvert år. Den blir den naturlige Google-toppen og bygger autoritet — også for folk som ennå ikke vil ha et produkt.",
]))

story.append(H2("Måling — slik vet vi om det virker"))
story.append(bullets([
    "<b>Nordstjerne-tall:</b> betalende kenneler. Alt annet er proxy.",
    "<b>Trakt:</b> besøkende → registrerte → fullført onboarding → første publiserte side → første kull → betalende. Faller volumet brutalt mellom to trinn, er det der UX-arbeidet skal.",
    "<b>Per-kanal-attribusjon:</b> UTM-koder på alt, Plausible eller Fathom for analytics (GDPR-vennlig, ingen cookie-banner).",
    "<b>NPS:</b> spør kundene hver tredje måned: “Ville du anbefalt DogWorld til en annen oppdretter?” → spørsmål 2: hvorfor / hvorfor ikke. Den åpne teksten er gull.",
]))

# 12. Delt genealogi
story.append(H1("Delt genealogi — vårt sterkeste kort"))
story.append(callout(
    "Av alle funksjonene vi har snakket om, er denne kanskje den mest defensive: et delt, "
    "dypt slektsregister som vokser med hver kennel som blir med. Når noen først er inne i "
    "nettverket, blir det dyrt å forlate."
))

story.append(H2("Hvorfor dette er hovedkortet"))
story.append(P(
    "Stamtavler er ikke bare data. De er kennelens identitet og bevis. Å eie det dypeste, mest "
    "korrekte, mest tilgjengelige slektsregisteret i markedet betyr tre ting på én gang:"
))
story.append(numbered([
    "**Verdien vokser med hver bruker.** Hver ny kennel som registrerer hundene sine kobler opp foreldre, besteforeldre, kull og avkom — alt blir søkbart for alle. Nettverkseffekt. Konkurrenter med statiske stamtavler kan ikke ta igjen dette uten å starte den samme reisen fra null.",
    "**Det er klistret.** Når en oppdretter har lagt inn 50 hunder, registrert helse-data, lastet opp sertifikater, og kobler til 200 slektninger i et nettverk — det er svært dyrt å flytte. Vi gir verdi tilbake, men de betaler oss en uskreven lojalitet.",
    "**Det åpner KI-funksjoner ingen andre kan ha.** “Finn lignende hunder”, “foreslå parringskandidat”, “varsel om dyp innavl i denne kombinasjonen”, “hvilke linjer er sterkest på dette helse-resultatet” — alt dette krever en stor, sammenhengende database. Vi har den. Andre må kjøpe den.",
]))

story.append(H2("Slik fungerer delingsmodellen"))
story.append(P(
    "Vi skiller mellom kennelens private data (vet-historikk, interne notater, kjøperinformasjon) "
    "og det vi kaller <b>stamtavlefakta</b> (registrert navn, sex, fødselsdato, foreldre, avkom, "
    "publiserte helse-resultater, registrerte titler). Standardregelen er at stamtavlefakta deles "
    "i fellesregisteret — med klart opt-out per hund."
))
story.append(P("<b>Hvordan brukervilkårene er bygget:</b>"))
story.append(bullets([
    "**Standard er “delt” (opt-out, ikke opt-in).** Ved registrering forklarer vi at hundens stamtavlefakta inngår i fellesregisteret, og at oppdretteren kan slå det av per hund eller på kennelnivå. Dette er hvordan vi får nettverkseffekten i gang.",
    "**Hva som deles:** registrert navn, kallenavn, registreringsnummer, sex, fødselsdato (dødsdato hvis aktuelt), rase, farge, foreldre + avkom (når de er registrert), publiserte titler, og helse-testresultater som kennelen allerede har publisert på sin nettside.",
    "**Hva som ALDRI deles:** kennelens kontaktinfo, interne notater, vet-besøk, vaksinasjons-historikk (med mindre eksplisitt delt), kjøperinfo, økonomi, planlegging, valpekontrakter.",
    "**Per-hund-granularitet:** opt-out kan settes på hver hund. Du kan dele de fleste, men holde en sjelden avlstispe privat.",
    "**Tilbakekall:** opt-out hvilket tidspunkt som helst. Hunden forsvinner fra søk og delte trær. Men kobling til avkom som er registrert av andre brukere består — vi viser bare “Skjult av eier”.",
    "**GDPR:** kennelen er behandlingsansvarlig for sine egne hundedata. Vi er databehandler. Klare DPA-avtaler ved registrering. EU-region lagring.",
]))

story.append(H2("Datamodellen — ingen grense på generasjoner"))
story.append(P(
    "Det er ingen god grunn til å begrense pedigree til 5 generasjoner. 5 generasjoner = 62 aner. "
    "10 generasjoner = 2 046 aner. 15 generasjoner = over 65 000 aner. Data blir naturlig "
    "sparsommere jo lengre tilbake du går — men når den finnes, må vi vise den."
))
story.append(bullets([
    "**Hver hund er en node** i en stor graf. Foreldre-koblinger er bare relasjoner. Vi rydder ikke i forhåndsdefinerte generasjoner.",
    "**Vi traverserer på forespørsel** — “gi meg alle aner til denne hunden så langt vi kan finne dem” — og cacher resultatet.",
    "**Stub-hunder:** når noen registrerer “Far: Bobby av Nordkapp” og vi ikke har Bobby i databasen, opprettes en stub. Når Bobbys eier senere registrerer, smelter vi sammen automatisk (med bekreftelse).",
    "**Avstamning er den sanne størrelsen.** Med 10+ generasjoner og linje-tilbakekrysninger gir COI / AVK helt andre svar enn med 5 generasjoner. Det er reell forskning — ikke pynt.",
]))

story.append(H2("UX på liten skjerm — det vanskeligste designvalget"))
story.append(P(
    "Et stamtre med 10 generasjoner kan ikke vises på en 6-tommers skjerm samtidig. Vi har "
    "vurdert seks mønstre:"
))
story.append(bullets([
    "<b>Horisontal sveiping</b> mellom generasjoner. Du ser én generasjon om gangen, sveiper. Enkel, men du mister oversikt.",
    "<b>Zoombart helt tre</b> med pinch-to-zoom. Imponerende, men dårlig i praksis — du ender med å zoome ut for langt.",
    "<b>Vertikal liste</b> som breadcrumb. Tar lite plass, men mister visuell struktur.",
    "<b>Kort-stabel per generasjon</b>. Hver generasjon er en horisontal stripe med kort. Sveiping ned for tilbake i tid.",
    "<b>Fokal navigasjon</b> (vårt valg). Én hund i sentrum. Foreldre over, besteforeldre lengre oppe. Søsken til siden. Avkom under. Trykk hvilket som helst kort → den blir nytt sentrum, alt animerer på plass. Du går gjennom treet som å gå gjennom en bygning.",
    "<b>Slektsgraf-visning</b> (for “finn lignende hunder”). Power-bruker-funksjon. Vis hunden din pluss alle som deler X aner. Vises som node-graf.",
]))
story.append(P("<b>Konkrete elementer i fokal-visningen:</b>"))
story.append(bullets([
    "Sentrum-hunden er stor, med bilde, navn, fødselsår, kjernehelse (HD/AD/øyne i et lite emblem)",
    "Foreldre vises som to mindre kort rett over",
    "Besteforeldre vises som fire enda mindre kort lengre opp — bare navn synlig, trykk for å fokusere",
    "Avkom listes som karusell under — sveip for å bla",
    "Søsken (samme kull) vises i en liten “knipe”-knapp som åpner sidepanel",
    "<b>Brødsmuler øverst:</b> hvor du har vært — kan gå tilbake",
    "<b>Delings-knapp:</b> generer offentlig URL til denne hundens kort. Andre oppdrettere kan se den uten konto.",
]))
story.append(P(
    "Inspirasjon: FamilySearch sin mobile tre-app, Apple Maps sitt fokuserte kort-paradigme, "
    "Notion sin <i>open as page</i>-navigasjon."
))

story.append(H2("Søk og oppdagelse"))
story.append(bullets([
    "<b>Standardsøk:</b> navn (registrert + kallenavn), registreringsnummer, kennel-prefiks, mikrochip-ID. Skriv noe → resultatene oppdaterer seg umiddelbart.",
    "<b>Filtre:</b> rase, farge, sex, fødselsår-spenn, titler, helse-status, kennel, land.",
    "<b>“Finn lignende hunder”:</b> mest mulig algorithmisk verdi — vi sammenligner aner, helse-profil, titler, fenotype. Resultater rangeres etter hvor mange aner som deles og hvor nært i slekten.",
    "<b>“Test-parring”:</b> velg to hunder, vi viser projisert avkom — innavl, helse-overlapp (begge foreldre må være clear på X for å unngå Y), titler i bakgrunnen. Dette er funksjonen seriøse oppdrettere vil betale for alene.",
    "<b>“Helsesterkeste linjer i [rase]”:</b> aggregert visning — hvilke avlsdyr har konsekvent gitt HD A-avkom, hvilke har lengst levetid i avkommet, osv. Krever store data — derfor er nettverkseffekten viktig.",
]))

story.append(H2("Hvor vi kan hente data lovlig (utenom våre egne kunder)"))
story.append(P(
    "Vi trenger en frøbase for at fellesregisteret skal være verdt noe på dag én. Tre lovlige kanaler:"
))
story.append(bullets([
    "<b>Offentlige stamtavle-databaser (scraping):</b> K9data.com (Goldens, Labs — brukerredigert, ingen API, lovlig å skrape offentlig data), Working-dog.com (brukshunder, freemium), PedigreeDatabase.com (schäfer-tungt), OFA.org (helseresultater, offentlig). De fleste tillater scraping av offentlig data ifølge nylige rettsavgjørelser i EU og USA (Meta v. Bright Data 2024, HiQ Labs v. LinkedIn).",
    "<b>Offisielle kennelklubb-registre:</b> NKK DogWeb, SKK Hunddata, DKK Hundeweb, VDH (Tyskland), Raad van Beheer (Nederland), KC Find a Dog (UK), AKC OnePass. Disse har ingen offentlig API, men de fleste tillater søk på enkelt-hund-nivå. Vi bygger varsomme integrasjoner som henter data når kennelen aktivt spør (ikke masse-scraping).",
    "<b>Importer fra andre programmer:</b> ZooEasy (.zoo-eksport), Breeders Assistant (CSV/XML), The Breeder's Standard. Brukeren laster opp filen sin og vi smelter inn. Trygt, tillatt, billig.",
    "<b>Partnerskap:</b> raseklubber kan velge å “laste opp” sin medlemsdatabase mot kreditt for sine medlemmer — bygger en symbiose der vi får data og de får verktøy.",
]))
story.append(P(
    "<b>Det vi IKKE gjør:</b> aggressiv masse-scraping som bryter med ToS, scraping av data bak "
    "innlogging, eller hvilken som helst form for personlig kontaktinfo. Også ingen scraping av "
    "tegn-registrerte data (varemerker fra kennelklubb-logoer osv.)."
))

story.append(H2("Risikoer som er verdt å se i øynene"))
story.append(bullets([
    "<b>“Data-suger”-oppfatning:</b> oppdrettere kan oppfatte fellesregisteret som at vi suger ut data og selger den. Motvirkes ved tydelig kommunikasjon: kennelen eier sine data, kan trekke tilbake når som helst, og vi tjener ikke på dataene direkte — vi tjener på å gjøre dem mer verdifulle for eieren.",
    "<b>Kvalitetsforurensing:</b> hvis brukere registrerer hunder feil (feil far/mor), forplanter feilen seg. Demper med: konfidens-merker per node (rødt om kun én kilde, grønt om flere stemmer overens), KI som flagger uvanlige kombinasjoner (foreldre yngre enn 12 mnd, motstridende registreringsnumre), og åpen redigeringshistorikk.",
    "<b>Tvilsomme stamtavler:</b> ikke-papir-hunder (uten registrering) — bør de være med? Vi sier ja, men markerer dem tydelig som “ikke offisielt registrert”. Tjener miks-rase-oppdrettere og folk som driver med eldre uregistrerte linjer.",
    "<b>“Stub”-konflikter:</b> to brukere registrerer samme hund forskjellig. Trenger en tydelig sammenslåings-flyt med menneskelig godkjenning.",
]))

story.append(H2("Når i veikartet"))
story.append(P(
    "Dette er ikke v1. Det er v2 eller v3. På launch fokuserer vi på at <i>din egen kennels</i> "
    "data ligger pent og søkbart. Når vi har 50–100 kunder, slår vi på “delt genealogi” og frør "
    "med scraping fra de offentlige basene. Da blir det en av de største oppgraderingene i "
    "DogWorld sin historie — og momentet hvor produktet vippeflyr fra “fint verktøy” til "
    "“du må være med”."
))

# 13. Flere markeder
story.append(H1("Flere markeder fra dag én — bygget for utvidelse"))
story.append(callout(
    "Norge er stort på pasjon, men lite på folketall. Vi bygger for å teste flere markeder "
    "samtidig — men vi gjør det smart, ikke spredt for tynt."
))

story.append(H2("Hvorfor utvide tidlig"))
story.append(P(
    "Tre grunner til å lansere bredere enn bare Norge:"
))
story.append(bullets([
    "**Optionalitet.** Vi vet ikke ennå hvilket marked som griper. Kanskje det er tyske brukshunde-kenneler som blir tidligadopterende. Kanskje britiske show-folk. Ved å lansere arkitektonisk bredt får vi se det.",
    "**Genealogi-funksjonen trenger volum.** Et delt slektsregister med 200 norske hunder er mindre verdt enn ett med 50 000 nordeuropeiske hunder. Vekst gir verdi.",
    "**Konkurransesignal.** Hvis vi viser oss i flere markeder samtidig, ser vi større og mer alvorlig ut. Investorer, partnere, og store kenneler tar oss raskere på alvor.",
]))

story.append(H2("Risikoer som må sees klart"))
story.append(P(
    "Brede lanseringer mislykkes oftere enn smale fordi du blir middelmådig overalt. Det "
    "som kan gå galt:"
))
story.append(bullets([
    "**Markedsføringsfokus splittes.** Vi kan ikke være den høyeste stemmen i 6 markeder samtidig med samme budsjett. Vi bør være dypt tilstede i 1–2 markeder, og lett tilstede i de andre.",
    "**Support-belastning multipliserer.** Spørsmål på 6 språk på samme tid, fra tidssoner over hele kloden.",
    "**Per-registry-dybde blir grunn.** Hvis vi har 6 halvferdige registerintegrasjoner i stedet for én strålende NKK-integrasjon, mister vi den primære norske wedgen vår.",
    "**Forventninger varierer.** Amerikanske oppdrettere har andre forventninger til kontraktshåndtering enn nordmenn. Lansering i USA uten lokal validering kan gi dårlige anmeldelser.",
]))

story.append(H2("Anbefaling — bygg bredt, lanser dypt"))
story.append(P(
    "Den smarteste fordelingen mellom “bygg for fremtiden” og “fokuser nå”:"
))
story.append(bullets([
    "**Arkitektur fra dag 1:** flerspråklig, fler-valuta, fler-registry. Ingen anger her — det er mye dyrere å rette opp senere.",
    "**Lansering i bølger:**",
    "&nbsp;&nbsp;&nbsp;&nbsp;<b>Bølge 1 (lansering):</b> Norge, Sverige, Danmark (Skandinavia). Dypt produkt, full lokalisering, NKK/SKK/DKK-integrasjon i ramme.",
    "&nbsp;&nbsp;&nbsp;&nbsp;<b>Bølge 2 (3–6 mnd etter):</b> Tyskland, Nederland, Belgia. VDH/Raad van Beheer-integrasjon, tysk og nederlandsk lokalisering, lokal partnerskap.",
    "&nbsp;&nbsp;&nbsp;&nbsp;<b>Bølge 3 (6–12 mnd etter):</b> UK, USA. Engelsk er allerede der. KC og AKC-integrasjon. Skiller seg fra eksisterende konkurrenter ved å være bedre og billigere.",
    "**Test-modus i alle markeder fra dag 1:** appen er tilgjengelig på engelsk i alle land. Brukere kan registrere seg. Vi måler hvor signups kommer fra. Markeder som overrasker, prioriteres opp.",
]))

story.append(H2("Språkfiler og i18n-arkitektur"))
story.append(P(
    "Resource files / språkfiler er den åpenbare og riktige tilnærmingen. Slik gjør vi det:"
))
story.append(bullets([
    "<b>Bibliotek:</b> <b>next-intl</b> (anbefalt for Next.js) eller i18next. Begge støtter ICU MessageFormat — den industristandard som håndterer flertall, kjønn, tall, datoer riktig på 100+ språk.",
    "<b>Filstruktur:</b> <code>messages/no.json</code>, <code>messages/sv.json</code>, <code>messages/da.json</code>, <code>messages/en.json</code>, <code>messages/de.json</code>, <code>messages/nl.json</code> ved lansering. Hver fil er en nøkkel-tekst-mapping.",
    "<b>Aldri hardkodet tekst:</b> all brukervennlig tekst går gjennom <code>t(\"key.name\")</code> i koden. Lintet, så det er enkelt å fange.",
    "<b>Oversettelsesverktøy:</b> Tolgee (åpen kildekode, gratis) eller Crowdin / Lokalise for større team. Lar oversettere se kontekst (skjermbilde, plass i UI).",
    "<b>KI-assistert oversettelse:</b> Claude lager førsteutkast på alle språk samtidig. Innfødt morsmål går gjennom og retter før publisering. Sparer 70 % av tida sammenlignet med menneske-fra-null.",
    "<b>Region vs språk:</b> språk og land er to forskjellige innstillinger. En tysker i Spania vil ha tysk språk, men kanskje spansk valuta. Vi støtter det.",
]))

story.append(H2("Det som ikke bare er oversettelse"))
story.append(P(
    "Ekte internasjonalisering går mye lenger enn å oversette teksten. Disse må vi ha klare "
    "abstraksjoner for fra dag 1:"
))
story.append(bullets([
    "<b>Kennelklubb-registre:</b> NKK, SKK, DKK, VDH, KC, AKC, UKC, Raad van Beheer, Société Centrale Canine, KKUSH (de baltiske). Vi modellerer dette som “Registry”-objekter, og hver hund har N registreringsnumre.",
    "<b>Helse-skala-skjemaer:</b> HD måles forskjellig i hvert system (FCI A–E vs OFA-skala vs PennHIP DI vs BVA-poeng). Vi viser i brukerens regions-standardform og lagrer alt råverdi + skjema.",
    "<b>BSL (rasespesifikke forbud):</b> per land, per delstat. Vi varsler kennelen som selger en valp til UK eller Tyskland hvis rasen er regulert.",
    "<b>Datoformat:</b> 11.05.2026 (NO/DE/SE) vs 11/05/2026 (UK) vs 05/11/2026 (US). Intl.DateTimeFormat løser det automatisk.",
    "<b>Valuta:</b> NOK, SEK, DKK, EUR (DE/NL/BE), GBP (UK), USD (US). Stripe takler det. Brukerens visning er i hennes valuta, kennelen får utbetalt i sin.",
    "<b>MVA / VAT:</b> Stripe Tax håndterer EU-MOMS automatisk. USA er per delstat — håndterbart men ny kompleksitet.",
    "<b>Adresse- og telefonformater:</b> bibliotek som <code>libphonenumber</code> og adresseparsing per land.",
    "<b>Tidssoner:</b> alle datoer lagres i UTC, vises i brukerens sone. Klassisk, men viktig.",
]))

story.append(H2("Hvilke språk på dag 1"))
story.append(bullets([
    "<b>Norsk Bokmål</b> (NO) — primært marked",
    "<b>Svensk</b> (SE) — nært naboskap, mange felles oppdrettere",
    "<b>Dansk</b> (DK) — det samme",
    "<b>Engelsk</b> (UK + US) — én variant er ok i starten, splittes senere ved behov",
    "<b>Tysk</b> (DE + AT + CH) — stort kennelmarked, sterk avlskultur",
    "<b>Nederlandsk</b> (NL + BE) — kompakt marked, tidlig adoptere ofte",
]))
story.append(P(
    "Seks språk på lansering. Klart innenfor det vi kan klare med KI-assistert oversettelse "
    "og to passer av menneske-validering. Italiensk, fransk, spansk kommer i bølge 3 eller 4 "
    "hvis vi ser etterspørsel."
))

story.append(H2("Det vi IKKE multipliserer"))
story.append(bullets([
    "<b>Marketing-fokus:</b> vi har én lighthouse-kampanje, ikke seks. Norge + Skandinavia først, så bygges Tyskland-kampanje etter validering.",
    "<b>Per-registry-integrasjoner:</b> vi gjør NKK helt og skikkelig først. Andre registre kommer i prioritert rekkefølge basert på hvor brukerne faktisk er.",
    "<b>Per-marked-mal:</b> samme app, samme funksjoner. Vi splitter ikke opp i “DogWorld DE” vs “DogWorld UK” — det er én plattform med lokale tilpasninger.",
    "<b>Support-team:</b> vi starter med engelsk + norsk support, og legger til etter hvert som vi har en kritisk masse i andre språk.",
]))

# 13.5. Tillit, identitet, karma og kvalitet
story.append(H1("Tillit og identitet — innlogging, roller, karma og kvalitetskontroll"))
story.append(callout(
    "Vi bygger en helautomatisert business. Det betyr at tillit må være bygget inn i strukturen "
    "fra dag 1 — vi har ikke folk til å håndtere disputter manuelt. Innlogging må være lett men "
    "trygg. Roller må være enkle nå men utvidbare senere. Kvalitet må være selvjustert, ikke "
    "polisiert. (Arbeidstittel “DogWorld” er fortsatt midlertidig — i koden bruker vi "
    "<b>DogWorld(tmp)</b> som placeholder-streng inntil vi lander endelig navn.)"
))

story.append(H2("Innlogging — enklest mulig, men aldri bare passord"))
story.append(P(
    "Vi tar ansvar for masse sensitive data — stamtavler, helse-resultater, kjøperinfo. Det "
    "betyr at vi kan ikke ha den tradisjonelle passord-sleivete tilnærmingen. Men det må også "
    "være så enkelt at en oppdretter på 65 ikke gir opp."
))
story.append(bullets([
    "<b>Magic link primært:</b> du skriver inn e-posten din, får en lenke, klikker, er inne. Ingen passord å glemme. Standard for moderne SaaS (Notion, Linear, Vercel).",
    "<b>Passkey-støtte fra dag 1:</b> WebAuthn / FIDO2-standarden. Du logger inn med Face ID, Touch ID eller Windows Hello — ingen passord eksisterer. Apple/Google/Microsoft har dette innebygget. Mer sikker enn passord, raskere å bruke.",
    "<b>På mobilappen:</b> biometri som standard etter første gangs pålogging.",
    "<b>Påtvunget 2-faktor på web:</b> når du logger inn fra ny enhet, push-varsel til telefonen din (eller magic link til e-post). Aldri SMS — for usikkert i 2026.",
    "<b>Ingen passord overhodet hvis vi kan unngå det.</b> Det er den ene tingen brukerne hater og som er minst trygg uansett.",
    "<b>Implementasjon:</b> Supabase Auth har magic link og passkey innebygget. Eller Clerk hvis vi vil ha mer ferdig brukergrensesnitt. Begge gratis under 50 000 brukere.",
]))

story.append(H2("Roller — bare Admin i v1, men arkitektur for fremtiden"))
story.append(P(
    "Vi har rett: full RBAC (rollebasert tilgangskontroll) er overkill for de fleste små "
    "kenneler. Mor-far-team er kanskje 80 % av tilfellene, og de deler ofte konto i praksis "
    "uansett. Men vi vil ikke male oss inn i et hjørne."
))
story.append(P("<b>v1-løsning:</b>"))
story.append(bullets([
    "Alle innloggede brukere på en kennel er <b>Admin</b> — full tilgang.",
    "Datamodellen har en <code>user_kennel_role</code>-tabell som kobler bruker til kennel med en rolle-kolonne. I v1 settes alle til 'admin'. Tabellen er der, men det finnes bare én rolle.",
    "Når vi vil legge til flere roller, er det en feature-flagg som åpner UI-en for å invitere folk med begrensede rettigheter — uten å migrere data eller endre arkitektur.",
]))
story.append(P("<b>Forslag til fremtidig rolle-sett (når og hvis vi trenger det):</b>"))
story.append(bullets([
    "<b>Owner:</b> full tilgang inkludert fakturering og sletting av hele kennelen",
    "<b>Co-owner:</b> full tilgang unntatt fakturering (typisk ektefelle / partner)",
    "<b>Editor:</b> kan opprette og redigere innhold, men ikke slette eller endre innstillinger (ansatte, lærlinger)",
    "<b>Helper:</b> kan logge daglige notater på et kull, laste opp bilder — typisk en tenåring eller venn som passer hundene",
    "<b>View-only:</b> tilgang til alt på lesing — familie, fast veterinær, en person på depositliste",
    "<b>Buyer (etter salg):</b> bare tilgang til sin egen valps reise + chat med oppdretter",
]))
story.append(P(
    "Tre lag, men prinsippet er det samme: ett brukernavn, en rolle per kennel. Klar arkitektur "
    "fra start, kompleksiteten venter til vi har behov."
))

story.append(H2("Karma — poengsystem som erstatter rabatter"))
story.append(P(
    "Tradisjonelle henvisningsprogrammer gir rabatter. Det fungerer dårlig i dette markedet — "
    "kennelene bryr seg ikke om 50 kr avslag, de bryr seg om <i>synlighet</i> og "
    "<i>anerkjennelse</i>. Karma-systemet utnytter det."
))
story.append(P("<b>Hva som gir karma:</b>"))
story.append(bullets([
    "Fullføre profil-oppsett (engangsbonus)",
    "Registrere hver hund og kull (skalerer med aktivitet)",
    "Bidra til delt genealogi (per opp-koblet hund)",
    "Henvise en ny kennel som blir betalende kunde (stor bonus)",
    "Få positiv anmeldelse fra valpekjøper",
    "Daglig aktivitet (streak — ikke for hard, men jevnlig bruk premieres)",
    "Dele kvalitetsbilder (vurdert av lett KI eller community-stemmer)",
    "Svare på andre kennelers spørsmål i community-funksjon (når den kommer)",
    "Eldre konto + lang positiv historie (lojalitet vektes)",
]))
story.append(P("<b>Hva karma gir tilbake:</b>"))
story.append(bullets([
    "<b>Høyere plassering i søk</b> — DogWorld(tmp)s offentlige søk etter rase, region, oppdretter rangerer karma-rike kenneler høyere",
    "<b>Prioritet i offentlige lister</b> som “Aktive oppdrettere i [rase]” og avlshund-katalogen",
    "<b>Kvalifikasjon for “Kennel of the Week”</b> — auto-genererte spotlight-stories på vår blogg + sosiale medier (drar trafikk til kennelen)",
    "<b>Badge-progresjon</b> som vises på kennel-siden — Bronze / Sølv / Gull / Platina (synlig sosial proof)",
    "<b>Tidlig tilgang til nye funksjoner</b> (psykologisk gulrot)",
    "<b>Karma-tier kan låse opp gratis måneder Pro</b> (så det også gir konkret økonomisk verdi)",
]))
story.append(P(
    "<b>Antimønster å unngå:</b> ikke bygg om karma til “gamification som sliter folk ut” à la "
    "Duolingo-streaks. Det skal føles meningsfullt, ikke krevende. Mistede streaks bør ikke gi "
    "skyldfølelse. Vi premierer aktivitet, men straffer ikke fravær."
))

story.append(H2("Kvalitetserklæring — etikk-skjema etter 2 måneder"))
story.append(P(
    "Du har rett: vi forbeholder oss retten til å fjerne oppdrettere som ikke følger etiske "
    "standarder. Men vi er ikke politi. I stedet bygger vi en <b>selv-erklæring</b> som gjør "
    "kvaliteten synlig — og gir oss grunnlag for å handle."
))
story.append(P("<b>Hvordan det fungerer:</b>"))
story.append(bullets([
    "Etter 2 måneders aktiv bruk får kennelen et skjema å fylle ut — én gang i året.",
    "Spørsmålene dekker etiske og praktiske standarder, alle med tydelig formulering. (Eksempler under.)",
    "Svar lagres som del av kennel-profilen — synlig for besøkende.",
    "Full grønn erklæring → <b>“DogWorld(tmp) Verifisert”-badge</b> på kennel-siden.",
    "Ufullstendig eller manglende svar → ingen straff, men ingen badge og lavere karma-vekt for synlighet.",
    "Hvis vi senere oppdager at kennelen har løyet i erklæringen → grunnlag for fjerning under bruksvilkårene.",
]))
story.append(P("<b>Eksempel-spørsmål (utforming må ferdigstilles med jurist):</b>"))
story.append(bullets([
    "Følger du FCI/NKK-regler for avl? (Ja / Nei / Min rase er ikke FCI-godkjent)",
    "Helse-tester du foreldre i henhold til breed-clubens RAS? (Ja, alle anbefalte / Noen / Nei)",
    "Selger du valper før 8 ukers alder? (Aldri / Kun ved spesielle omstendigheter / Ja)",
    "Tar du tilbake valpen hvis kjøperen ikke kan beholde den? (Ja, alltid / Av og til / Nei)",
    "Forhåndsscreener du valpekjøpere? (Ja, alltid / Noen ganger / Nei)",
    "Har du noen gang blitt sanksjonert av en kennelklubb? (Nei / Ja — beskriv)",
    "Har du skriftlige kontrakter med valpekjøpere? (Ja, alltid / Vanligvis / Nei)",
    "Hvor mange kull har tispene dine i året maksimalt? (≤1 / 1 hvert annet år / oftere)",
    "Driver du oppdrett som hovedinntekt eller som hobby? (Hobby / Hovedinntekt)",
]))
story.append(P(
    "Spørsmålene har dobbel funksjon: de skiller etiske oppdrettere fra mindre seriøse, OG de "
    "<b>tvinger refleksjon</b> hos kennelen selv. Mange dårlige praksiser eksisterer fordi "
    "ingen har stilt spørsmålet."
))

story.append(H2("Fjerning og kvalitetskontroll i praksis"))
story.append(bullets([
    "Bruksvilkårene gir oss eksplisitt rett til å fjerne kenneler ved brudd på etiske standarder",
    "Vi opererer en <b>intern sjekkliste</b> mot dokumenterte rapporter eller åpenbare brudd",
    "Vi er <b>reaktive, ikke proaktive politi</b> — vi handler på rapporter, ikke på utforskning",
    "Når vi sletter: stille, et privat varsel, ingen offentlig diskusjon. Ikke tannregulering på sosiale medier.",
    "<b>Tre stryk-systemet:</b> første rapport = privat samtale. Andre = midlertidig nedrangering. Tredje = fjerning.",
    "Falske rapporter har konsekvens også — vi sletter rapporterne hvis vi finner ondsinnet rapportering",
]))

story.append(H2("Press, PR og vekst — kort om fremtiden"))
story.append(P(
    "Du håndterer dette gjennom andre kanaler. Kort sagt for å fange det:"
))
story.append(bullets([
    "Vi bygger ingen pressavdeling internt — vi forholder oss til presse reaktivt",
    "Markedsføringsmotoren (kapittelet ovenfor) håndterer den daglige sosial-mediatilstedeværelsen automatisk",
    "Når vi har 5 lighthouse-kunder og en god story, kan vi tilby intervjuer til Hundesport, Onze Hond, Der Hund — disse er sultne på innhold",
    "Affiliate-programmer (Embark, Royal Canin) er en mulighet senere — ikke prioritert nå",
]))

story.append(H2("TODO og placeholdere — det vi vet vi kommer tilbake til"))
story.append(P(
    "Beslutninger som er bevisst utsatt, men der vi har klart hvilken retning vi går:"
))
story.append(bullets([
    "<b>Endelig branding:</b> “DogWorld(tmp)” brukes i koden inntil endelig navn er valgt og varemerke-registrert",
    "<b>Vet-/helse-rådgiver:</b> aldri diagnostikk. Aggregator + dyplenker til faktiske artikler. Vi viser frem og editerer, men diagnostiserer ikke.",
    "<b>Prising og pakke-struktur:</b> tas senere — påvirker ikke teknisk arkitektur",
    "<b>Juridisk grunnpakke:</b> håndteres parallelt — ikke utvikleroppgave",
    "<b>Affiliate-program:</b> scope for senere",
    "<b>Risikoregister:</b> håndteres “as we go” — vi reagerer når det skjer",
    "<b>Pressestrategi:</b> reaktivt, ikke proaktivt — markedsføringsmotoren dekker daglig kommunikasjon",
]))

# 14. Strategisk pivot — ingen integrasjoner antas
story.append(H1("Strategisk pivot — vi regner ikke med å få integrasjoner"))
story.append(callout(
    "I tidligere kapitler har vi snakket varmt om NKK DogWeb-integrasjon som en av våre tre store "
    "differensieringer. Det må vi justere. Dette kapittelet erstatter de mer offensive "
    "integrasjonsløftene tidligere i rapporten."
))

story.append(H2("Realiteten om kennelklubber"))
story.append(P(
    "Kennelklubber er notorisk politiske, kontroversielle og tungrodde organisasjoner. De fleste "
    "har ingen offentlig API. Å forhandle frem en integrasjon kan ta år, kreve juridiske "
    "ressurser vi ikke har, og ende med et nei. Vi kan høre, men hvis tilgangen ikke "
    "finnes, er vi stuck."
))

story.append(H2("Den ærlige nye posisjonen"))
story.append(P(
    "<b>Vi bygger DogWorld som om vi aldri får én eneste integrasjon med en kennelklubb.</b> "
    "Hvis det skjer en dag, er det en bonus. Men produktet må stå på egne ben uten den hjelpen."
))
story.append(P(
    "Det betyr at brukerens egne data og brukerens egne kilder (gammel nettside, papirstamtavler, "
    "vaksinepass, sertifikater) blir vår primære datainngang. Selvfyllingsopplevelsen må være så "
    "god at man ikke savner integrasjoner."
))

story.append(H2("Hva dette betyr for produktet"))
story.append(P(
    "Datainntastingen blir kjernekompetansen vår — ikke et tillegg. Konkret:"
))
story.append(bullets([
    "**Migrering fra eksisterende kennelnettside er ikke en gimmick — det er hovedinngangen til appen.** Vi må være best i verden på dette.",
    "**Kamera + KI for skanning** av papirstamtavler, vaksinekort, helse-sertifikater er normalflyten, ikke ekstra magi.",
    "**Den delte genealogien blir EKSTRA viktig** — det er vår erstatning for registerintegrasjon. Brukere bygger den sammen, vi fasiliterer.",
    "**Inline-redigering, raske felt, smarte standarder** — alt som er friksjon må vekk. Et felt skal kunne fylles ut på maks ett trykk.",
    "**Smart import fra andre programmer** (ZooEasy, Breeders Assistant) blir høyere prioritet — de som allerede har data andre steder skal flytte gratis til oss.",
]))

story.append(H2("Hvor integrasjoner kanskje fortsatt kommer (uten at vi lover noe)"))
story.append(numbered([
    "**Offentlige nettsider med dyp-lenking.** NKK DogWeb og lignende har offentlige søkesider uten API. Vi kan tilby en “slå opp i NKK”-knapp som åpner riktig søk i nettleseren, og lar brukeren kopiere det hun trenger inn til DogWorld. Halv-automatisering uten integrasjon.",
    "**Brukeren slår opp selv.** Når en bruker er logget inn på NKK DogWeb i sin egen nettleser, kan vi tilby en bookmarklet eller en nettleserutvidelse som sender data inn til DogWorld. <i>Brukeren</i> henter, ikke vi — det løser tillatelsesspørsmålet helt.",
    "**Partnerskap senere.** Når vi har 1 000+ betalende kenneler i Norge, har vi forhandlingskraft. Da kan en samtale med NKK være en helt annen samtale. Men det er ikke launch-strategien.",
    "**Tredjeparts-aggregatorer.** Noen kommersielle aktører kjøper data fra registrene og selger den videre. Vi kan kjøpe fra dem hvis det blir relevant og lønnsomt.",
]))

story.append(H2("AI-tidens fordel"))
story.append(P(
    "Det avgjørende poenget: i 2026 er det <i>ekstremt billig</i> å bygge integrasjoner når "
    "tilgangen åpner seg. En komplisert udokumentert API kan ofte håndteres på en uke med "
    "dagens KI-verktøy. Det betyr at vi ikke trenger å bygge dette nå “i tilfelle” — vi kan "
    "bygge det reaktivt når en mulighet faktisk åpner seg."
))
story.append(callout(
    "Den strategiske innsikten: <b>bygg produktets verdi som om integrasjoner aldri kommer, "
    "men ha beredskap til å bygge dem raskt når sjansen byr seg.</b> Vi er en KI-tids-aktør. "
    "Vi bygger fort når vi må."
))

story.append(H2("Hva endrer dette i markedsføringen"))
story.append(P("Vi sier ikke lenger:"))
story.append(callout(
    "<i>“Vi henter dataene dine fra NKK DogWeb automatisk.”</i>"
))
story.append(P("Vi sier i stedet:"))
story.append(callout(
    "<b>“Du får dataene dine inn i DogWorld på fem minutter — ta bilde av papirstamtavlen, lim "
    "inn fra din gamle nettside, eller importer fra ZooEasy. Vi bruker KI til å gjøre den "
    "kjedelige jobben.”</b>"
))
story.append(P(
    "Det er et ærligere og mer leverbart løfte. Og det er et løfte som ikke er avhengig av at "
    "vi får tillatelse fra noen som muligens aldri gir den."
))

story.append(H2("Hva dette betyr for de fem hullene i markedet"))
story.append(P(
    "Tidligere i rapporten listet vi “Nordisk lokalisering + NKK-integrasjon” som ett av de fem "
    "hullene. Den må omformuleres:"
))
story.append(bullets([
    "<b>Før:</b> “Ingen tjener det nordiske markedet ordentlig — ingen integrasjon med NKK DogWeb.”",
    "<b>Nå:</b> “Ingen tjener det nordiske markedet ordentlig — ingen programvare på norsk, ingen mobil-først-app som passer rytmen til en norsk oppdretter, ingen som hjelper deg å flytte fra den gamle nettsiden.”",
]))
story.append(P(
    "Det er fortsatt et reelt hull. Det er bare ikke avhengig av en enkelt institusjons "
    "velvilje for at vi skal kunne fylle det."
))

# 15. Nyhetsmotor og markedsføringsmotor
story.append(H1("Nyhetsmotor og markedsføringsmotor — én backend, to tjenester"))
story.append(callout(
    "Hovedidéen: vi bygger én KI-drevet aggregator som kontinuerlig samler hunde-relevant "
    "innhold fra hele nettet. Den brukes på to måter — som personlig nyhetsfeed for våre "
    "brukere (betalt tillegg), og som motor for vår egen markedsføring (drar trafikk inn). "
    "Samme infrastruktur, to inntektslinjer."
))

story.append(H2("Innsikten: én scraper, to tjenester"))
story.append(P(
    "Vi trenger uansett å vite hva som skjer i hundeverdenen — for å markedsføre oss, for å "
    "holde produktet relevant, for å sende varsler om nye lover og regler. Hvis vi først bygger "
    "den motoren, kan vi pakke den om og selge den som en nyhetsfeed-tjeneste til våre brukere "
    "som et tillegg. Den ene betaler for den andre."
))

story.append(H2("Tjeneste 1: nyhetsfeed for kennelene"))
story.append(P("<b>Hva brukeren får:</b>"))
story.append(bullets([
    "Personlig nyhetsfeed basert på rase(r), region og interesser hun har valgt",
    "<b>Aktuelle utstillinger og prøver</b> — “Norsk Vinnerutstilling 2026 åpner påmelding 15. juni”, “IGP-prøve i Tønsberg 12. august”, “Tysk Klubb-Sieger-utstilling i München”",
    "<b>Lover og regler</b> — “Mattilsynet endret krav for export av valp til Tyskland”, “UK utvider XL Bully-forbudet”, “EU-pass-regler oppdatert”",
    "<b>Helse-nyheter</b> — “Ny PRA-mutasjon oppdaget i din rase”, “Royal Canin tilbakekaller batch X”, “Forskning: ny test for Cavaliers MVD”",
    "<b>Bransjenyheter</b> — “Embark senker pris på rasepanel”, “FCI endrer titler i 2027”",
    "<b>Sosialt og innhold</b> — populære innlegg fra raseklubber og store kenneler i Europa",
]))
story.append(P("<b>UX-prinsipp:</b> ren, rask, mobil-først. Svipe gjennom kort. Trykk for å lese mer. Lagre, dele, varsle."))
story.append(P(
    "<b>Pris:</b> gratis basistier (5 kuraterte saker per uke, generell rase-feed). "
    "<b>Pro nyhetsfeed: 30 kr / 3 USD per måned</b> for full personalisering, alle kategorier, "
    "push-varsler ved viktige saker, og oversettelse av kilder fra alle våre språk. Dekker "
    "infrastrukturen og litt til."
))

story.append(H2("Tjeneste 2: markedsføringsmotor (intern, men bruker samme backend)"))
story.append(P(
    "Samme aggregator brukes til å produsere distribuerbar markedsføring som peker tilbake "
    "til DogWorld. KI lager utkast, vi reviderer. Eksempel:"
))
story.append(callout(
    "<i>Kilde: NKK kunngjør at Dogs4All 2026 holdes 15.–17. november på Lillestrøm.</i><br/><br/>"
    "<b>Generert post:</b> “Dogs4All åpner snart påmelding for 2026! 🐾 Norges største "
    "hundeutstilling samler tusenvis av hunder fra hele landet. Med DogWorld-appen får du "
    "påmeldings-påminnelser, full oversikt over kullene dine, og en ferdig publisert "
    "kennelside å vise frem. Slik er moderne kenneldrift. → dogworld.no”"
))
story.append(P("<b>Format per kanal:</b>"))
story.append(bullets([
    "<b>Facebook:</b> tekst + bilde fra kilden eller KI-generert relevant illustrasjon",
    "<b>Instagram Reels:</b> 15-sekunders klipp generert med Sora eller Veo, lukket med DogWorld-skjerm",
    "<b>TikTok:</b> samme som Reels, ofte mer hverdagslig tone",
    "<b>Twitter/X-tråd:</b> hovedpoenger i 3–5 tweets med lenke til oss",
    "<b>LinkedIn:</b> mer profesjonell vinkling, mot bransje og partnere",
    "<b>YouTube Shorts:</b> kortere video-format, samme kilde-materiale",
]))
story.append(P(
    "Volumen vi sikter på: 5–15 poster per dag på tvers av kanaler, alle med ekte nyhets-anker "
    "(ikke generisk fluff), alle med tilbake-lenke til DogWorld."
))

story.append(H2("Hva vi henter fra"))
story.append(bullets([
    "<b>Kennelklubber:</b> NKK, SKK, DKK, VDH, KC, AKC, FCI offisielle kalendere og kunngjøringer",
    "<b>Raseklubber:</b> hundretalls i Europa — vi prioriterer de største per rase per land",
    "<b>Mattilsynet, USDA, DEFRA</b> for regulatoriske oppdateringer",
    "<b>Veterinære fagtidsskrifter</b> for forskningsnyheter (PubMed RSS, JAVMA)",
    "<b>Større dyrebutikk-kjeder</b> for tilbakekallinger og nye produkter",
    "<b>FCI World Dog Show, European Dog Show</b> for store hendelser",
    "<b>Embark, Wisdom Panel, Laboklin</b> bloggene for genetiske oppdateringer",
    "<b>Reddit r/dogbreeding</b>, store offentlige Facebook-grupper for sosial puls",
]))

story.append(H2("Slik fungerer aggregatoren teknisk"))
story.append(bullets([
    "<b>Per kilde:</b> en lett scraper kjører på fast plan (RSS når det finnes, ellers Firecrawl + Claude for ustrukturerte sider)",
    "<b>Strukturering:</b> Claude leser hver sak og fyller inn JSON: tittel, sammendrag, dato, rase-tagger, region-tagger, kategori, viktighet, opphavslenke",
    "<b>Oversettelse:</b> alt oversettes til alle våre seks språk på inntak-tidspunktet (én pris, én jobb)",
    "<b>Bilder:</b> bruk kildens hvis tillatt; ellers KI-genererer relevant illustrasjon (tydelig merket); ellers fallback på lager-bilde",
    "<b>Dedup:</b> samme historie fra fem kilder smelter sammen til én sak med flere lenker",
    "<b>Personalisering:</b> for nyhetsfeed-brukere rangeres saker etter rase + region + interesser + ferskhet",
    "<b>Distribusjon for markedsføring:</b> Claude lager kanal-spesifikke utkast, vi godkjenner, Buffer publiserer",
]))

story.append(H2("Kostnad og økonomi"))
story.append(P("<b>Drift:</b>"))
story.append(bullets([
    "Scraping-infra: ~50 kr/mnd (cron-jobber, billige proxier)",
    "KI-prosessering: ~0,01 kr per sak. Med 200 saker/dag = ~60 kr/mnd",
    "KI-generering av markedsposter: ~5 kr/dag = 150 kr/mnd",
    "KI-bilde- og video-generering: ~30–100 kr/dag = 1 000–3 000 kr/mnd hvis vi går aktivt på TikTok/Reels",
    "<b>Total drift:</b> 1 500–4 000 kr/mnd for hele motoren",
]))
story.append(P("<b>Inntekt:</b>"))
story.append(bullets([
    "Per nyhetsfeed-pro-bruker: 30 kr/mnd. Marginen er ~80 % siden marginalkostnad per ekstra bruker er nesten null.",
    "Med 200 betalende nyhetsfeed-brukere = 6 000 kr/mnd → dekker hele motoren med god margin",
    "Markedsføringsmotoren har egen ROI: hvis den drar inn 2 nye DogWorld-kunder per måned (à ~200 kr i abonnement), tjener den seg inn etter 1–2 måneder",
]))

story.append(H2("Risikoer å håndtere"))
story.append(bullets([
    "<b>Opphavsrett:</b> vi republiserer ikke artikler — vi lager kort sammendrag + lenke til kilden. Det faller innenfor fair use / “sitatretten” i de fleste land. Aldri kopier original tekst lenger enn nødvendig.",
    "<b>Autentisitet i markedsføring:</b> KI-genererte poster kan kjennes oppblåst og falske. Vi setter en kvalitetsterskel: ingenting publiseres uten menneskelig godkjenning, ingenting later som om det er en ekte person, og vi merker når innholdet er KI-generert (spesielt video).",
    "<b>Kildekvalitet:</b> garbage in = garbage out. Vi kuraterer kildelisten manuelt, fjerner kilder som gir feil eller spam.",
    "<b>Faktasjekk:</b> for regulatoriske og medisinske saker dobbeltsjekker vi mot offisielle kilder før vi pusher varsel. En feil her kan koste tillit.",
    "<b>Spam-oppfattelse i sosiale grupper:</b> vi poster IKKE markedsføringsmotor-innhold i Facebook-grupper. Det er en skarp grense — gruppene er for ekte mennesker, ikke automatiserte tråler.",
]))

story.append(H2("Plassering i veikartet"))
story.append(P("<b>Markedsføringsmotoren bygger vi før lansering.</b>"))
story.append(P(
    "Den kan kjøre i bakgrunnen og bygge DogWorld sin tilstedeværelse på sosiale medier i "
    "ukene før produktet er live. Når vi lanserer, har vi allerede en mindre følgerbase som "
    "kjenner navnet — gull i en nisje hvor sosial proof betyr alt."
))
story.append(P("<b>Nyhetsfeed-tjenesten kommer som v2 eller v3 (måned 4–8 etter launch).</b>"))
story.append(P(
    "Den krever at infrastrukturen er moden, at vi har et publikum som er stort nok til at "
    "30 kr/mnd-tillegg er meningsfullt, og at vi har bygget tillit til at vi velger riktig innhold. "
    "Vi kan tilby gratis basistier mye tidligere for å bygge vane."
))

story.append(H2("Hvordan dette kobles til de andre funksjonene"))
story.append(bullets([
    "<b>Reiseledsageren:</b> regulatoriske endringer (BSL, bendelorm, ferge-regler) ender automatisk i reise-modulen som varsler",
    "<b>Helse-feed:</b> nye DNA-tester eller forskning relevant for kennelens rase ender i helse-dashbordet med “anbefales nå” -etikett",
    "<b>Kjøperguiden:</b> generelt råd-innhold som er relevant for valpekjøperens uke kan vises som tillegg til kennelens egen tekst (tydelig merket som “DogWorld bonus-stoff”, ikke som kennelens egen)",
    "<b>Stamtavle/genealogi:</b> hvis en utstilling produserer nye titler eller en helse-database publiserer nye resultater, oppdateres berørte hunder automatisk",
]))
story.append(P(
    "Det er ringen som lukkes: aggregator-motoren mater alle de andre delene av appen med "
    "fersk informasjon. Brukeren slipper å lete — informasjonen kommer til henne, der hun "
    "allerede er."
))

# 16. Hva vi vil at du skal sjekke
story.append(H1("Hva vi vil at du skal sjekke"))
story.append(P(
    "Du kjenner oppdrett innenfra. Les gjennom dette og fortell oss:"
))
story.append(numbered([
    "**Mangler vi noen seksjoner som ekte kennelnettsider har?** Spesielt noe norsk-spesifikt.",
    "**Brukte vi de rette ordene?** Hvis noe høres ut som en tech-person som prøver å snakke om hund, si fra.",
    "**Hvilke arbeidsflyter har vi glemt?** Vi tenker på: parringsprosessen, planlegging av kull, valping, oppfølging av valper uke for uke, vaksinering og avorming, screening av valpekjøpere, kontrakter, oppfølging av valpeeiere etter at de har fått hunden hjem, utstillingspåmeldinger og reise, veterinærtimer, avlsavtaler med utenforstående oppdrettere, lagring og forsendelse av sæd, import av hund fra utlandet, eksport, tap av valper eller retur. Har vi dekket det som faktisk betyr noe i en oppdretters hverdag?",
    "**Er det ting vi har listet som “sjelden” som egentlig burde vært “må ha”?** Eller motsatt?",
    "**To-mal-idéen (utstillingskennel vs. kommersiell valpekennel)** — stemmer det med hvordan du ser oppdrettere fordele seg?",
    "**Avlshund-app-idéen** — gir vår tilnærming mening, eller finnes det en sterkere versjon?",
    "**Reiseledsager-funksjonen** — er dette noe du tror hundeeiere faktisk ville bruke? Mangler vi noe åpenbart? Er det riktig å bake det inn i samme app, eller burde det være sin egen?",
    "**Kjøperguide-funksjonen** — gir det mening? Hvordan løser oppdrettere du kjenner det i dag (papirmappe, PDF, Messenger)? Hva er det viktigste innholdet en slik guide MÅ ha for at oppdrettere skal stole på den?",
    "**Sideplanen og rekkefølgen** — er det noen skjerm som mangler i oppdretterens hverdag? Eller noe vi har som ingen ville bruke? Hva er det FØRSTE en ny oppdretter ville forventet å finne når hun åpner appen?",
    "**Markedsføring** — i hvilke Facebook-grupper bor norske oppdrettere du kjenner? Hvilke 2–3 raseklubber eller utstillinger ville være perfekt sted å vise oss frem først?",
    "**Delt genealogi** — ville du vært komfortabel med å dele dine hunders stamtavlefakta i et felles register som standard, så lenge du kunne velge bort spesifikke hunder? Og hva ville fått deg til å si nei?",
    "**Flere markeder fra start** — Tyskland, Nederland, UK, USA i tillegg til Skandinavia. Lyder det realistisk eller ambisiøst-galskap? Hvilke land kjenner du oppdrettere i som faktisk ville prøvd noe norsk?",
    "**Nyhetsfeed for rasen din** — ville du betalt 30 kr/mnd for å få samlet alle relevante nyheter (utstillinger, helse, regler) for din rase i én personlig feed? Hvilke kilder ville du forventet at vi henter fra?",
    "**KI-genererte markedsposter** — føles det smart eller manipulerende at vi automatisk lager Facebook/Instagram-poster fra ekte hundenyheter for å markedsføre DogWorld? Hvor går grensen for deg?",
    "**Karma-systemet** — gir det mening å bruke karma (poeng for aktivitet og henvisninger) til å rangere kenneler i søk og lister, i stedet for vanlige rabatter? Vil du som oppdretter føle deg motivert eller utnyttet?",
    "**Etikk-erklæringen etter 2 mnd** — hvilke spørsmål MÅ være med for at en seriøs oppdretter skal anerkjenne erklæringen som ekte kvalitetsmål? Hvilke spørsmål er for kontroversielle eller upresise?",
    "**Er det noe du selv ville betalt for som ingen i dag selger?**",
]))
story.append(Spacer(1, 14))
story.append(callout(
    "Ærlig motbør er det mest verdifulle her."
))

# =========================================================================
# Data model + Cloudflare infrastructure
# =========================================================================
story.append(H1("Datamodell og infrastruktur — slik bygger og drifter vi DogWorld(tmp)"))
story.append(callout(
    "Dette er den arkitektoniske ryggraden. Den må oppfylle fem krav samtidig: "
    "<b>sikkerhet</b>, <b>stabilitet</b>, <b>lett å drifte</b>, <b>billig</b>, og "
    "<b>lett å bygge og vedlikeholde</b>. Vi har resonnert i flere runder for å lande på "
    "et oppsett som ikke er kompromiss på noen av aksene."
))

story.append(H2("Hovedanbefalingen i én setning"))
story.append(P(
    "<b>Cloudflare-tungt for alt unntatt primær-databasen, som kjører på Neon Postgres "
    "(EU-region) via Cloudflare Hyperdrive.</b> Det gir oss Cloudflares billige, globale "
    "edge-infrastruktur for 90 % av jobben, og Postgres' modne kraft for det ene stedet "
    "vi ikke kan kompromisse: den dype slektstre-grafen som er hjertet av produktet."
))

story.append(H2("Hva vi lagrer — den korte oversikten"))
story.append(P(
    "Vi har snakket om mange entiteter gjennom denne rapporten. Her er den fullstendige listen, "
    "gruppert:"
))
story.append(bullets([
    "<b>Identitet og tilgang:</b> brukere, kennel-medlemskap, roller (kun Admin i v1), sesjoner",
    "<b>Kennel:</b> profil, affiks, branding, abonnement, karma-poeng, etikk-erklæring",
    "<b>Hund:</b> hovedposten + N registrer-numre, foreldre-relasjoner (graf-koblinger), titler, helse-tester, vaksinasjoner, vekt-logg, vet-besøk (privat), bilder",
    "<b>Kull:</b> planlagt/aktivt/historisk status, mor og far, valpene, ukentlig logg, bilder per uke",
    "<b>Stamtavle/genealogi:</b> kobling-tabell hund → forelder, åpenhet-flagg per hund, stub-hunder, sammenslåings-historikk",
    "<b>Kjøper og salg:</b> søknader, eiere, salgs-historie, kjøperguide-maler, per-valp tidslinje-status",
    "<b>Minneside:</b> én rad per avdød hund, narrativ, hyllester fra alumni",
    "<b>Nyhetsmotor:</b> kilde-register, artikler (med oversettelser), bilder, lese/lagret-status per bruker",
    "<b>Markedsføringsmotor:</b> genererte poster (utkast og publiserte), planlegging",
    "<b>Reisemodus:</b> sted-database (vet, butikk, park), BSL per land, regelverk-tabeller",
    "<b>Migrering:</b> jobb-status per kunde, ekstrahert-rådata, gjennomgang-status",
    "<b>Audit:</b> hvem-gjorde-hva-når-logg for ansvar og GDPR",
    "<b>Filer:</b> bilder, PDF-er (sertifikater, stamtavler), video — alt i objektlagring, kun referanse i DB",
]))

story.append(H2("Stacken — komponent for komponent"))
story.append(stack_table([
    ["Komponent", "Hva den gjør", "Hvorfor dette valget"],
    ["<b>Cloudflare Pages</b>", "Hosting av frontend (Next.js)", "Gratis under 500k forespørsler/mnd. Edge-distribuert. Innebygget bygg-pipeline fra GitHub."],
    ["<b>Cloudflare Workers</b>", "API og edge-funksjoner", "Kjører på V8-isolater i 300+ byer. Billigere og raskere enn Lambda. Gratis 100 000 forespørsler/dag."],
    ["<b>Neon Postgres (EU)</b>", "Hovedrelasjonsdatabase", "Serverless Postgres. Skalerer auto. Vi bruker den fordi D1 er for begrenset (mer under). EU-region for GDPR."],
    ["<b>Cloudflare Hyperdrive</b>", "Connection pooler + cache foran Neon", "Reduserer latens fra Workers (globalt) til Postgres (én region). Cacher repeterte queries. Inkludert i Workers-planen."],
    ["<b>Cloudflare R2</b>", "Filer: bilder, PDF, video", "S3-kompatibel, men <b>null egress-kostnad</b> — kritisk når vi server bilder. 10 GB gratis, $0.015/GB derover."],
    ["<b>Cloudflare KV</b>", "Sesjons-cache, rate-limit-state, varme verdier", "Eventually consistent, edge-cached. Lese på 5 ms fra hvor som helst i verden. Gratis 100k operasjoner/dag."],
    ["<b>Cloudflare Queues</b>", "Bakgrunnsjobber: migrering, scraping, KI-generering", "$0.40 per million operasjoner. Erstatter behov for Redis/SQS."],
    ["<b>Cloudflare Durable Objects</b>", "Per-kennel sanntids-koordinering, chat", "Én instans per kennel garanterer konsistens. Perfekt for valpedagbok-redigering med flere personer."],
    ["<b>Cloudflare Vectorize</b>", "Embeddings for &laquo;finn lignende hunder&raquo;, semantisk søk", "Innebygget vektor-DB, 5 mill. vektorer gratis. Kobler rett til Workers AI."],
    ["<b>Cloudflare AI Gateway</b>", "Proxy + cache for Anthropic-kall", "Cacher gjentatte prompts (massiv besparelse). Logger alt. Bytter modell uten kode-endring."],
    ["<b>Cloudflare Workers AI</b>", "Små modeller for billige oppgaver (klassifisering, embeddings)", "Vi bruker dette til ting som ikke trenger Claudes kraft. Embeddings koster nesten ingenting."],
    ["<b>Cloudflare Browser Rendering</b>", "Headless Chrome for skraping av brukers gamle nettside", "Innebygget i Workers. Slipper Firecrawl-kostnad for brukerens-egne-data-scenariet."],
    ["<b>Cloudflare Email Workers</b>", "Mottak av e-post (svar fra brukere)", "Programmerbart. Vi kan rute valp-spørsmål direkte til oppdretter via e-post-bridge."],
    ["<b>Resend</b>", "Utgående transaksjons-e-post (magic links, varsler)", "Cloudflares egen e-post-utsendelse er enda umoden. Resend er $20/mnd for 50k e-poster og rensligere API."],
    ["<b>Better-Auth</b>", "Innlogging, passkeys, 2FA", "Åpen kildekode, kjører rett i Workers. Støtter magic link, WebAuthn, push-2FA. Ingen abonnement."],
    ["<b>Stripe (med Stripe Tax)</b>", "Betaling og moms", "Industristandard. Stripe Tax håndterer EU-MVA automatisk. Webhooks via Workers + Queues."],
    ["<b>Sentry</b>", "Feil- og ytelsesovervåking", "Gratis-tier dekker oss lenge. Cloudflare Workers Observability gir oss logger uansett."],
    ["<b>Cloudflare Analytics Engine</b>", "Hendelses-data for produktanalyse (klikk, søk, konvertering)", "Skrives til fra Workers, spørres med SQL. Gratis 10 mill. hendelser/mnd."],
    ["<b>Anthropic API (Claude)</b>", "Tunge KI-oppgaver: ekstraksjon, oversettelse, generering", "Beste kvalitet for innholds-oppgaver. EU-region tilgjengelig. Routet gjennom AI Gateway."],
]))

story.append(H2("Det avgjørende valget: hvorfor IKKE D1 som hovedbase"))
story.append(P(
    "Cloudflare D1 er en SQLite-basert database som kjører på Cloudflares nettverk. Det er "
    "fristende fordi det holder alt innenfor én leverandør og er ekstremt billig. Vi vurderte det "
    "seriøst, men landet på at det ikke holder for vårt produkt:"
))
story.append(bullets([
    "<b>10 GB-grense per database.</b> Den delte genealogien kan vokse forbi dette med 50–500k hunder + bilder-metadata + relasjoner. Vi kan dele opp (sharding), men det er kompleksitet vi ikke vil ta på oss.",
    "<b>50 ms query-budsjett.</b> Pedigree-traversering på 10+ generasjoner med 2000+ noder kan blåse dette. SQLite har <code>WITH RECURSIVE</code>, men ikke materialiserte views eller graph-optimaliseringer Postgres har.",
    "<b>Ingen Row-Level Security.</b> Postgres RLS lar oss enforce «kennel A ser kun sine egne private data» på database-laget. På D1 må vi gjøre det i applikasjonskode — én bug = dataleak.",
    "<b>Ingen full-text search på samme nivå.</b> Postgres tsvector + GIN-indexer gir lynrask norsk søk i hund-navn, kennel-navn osv.",
    "<b>Ingen JSONB med indeksering.</b> Mange av våre felt (helsetester med varierende skjemaer, stamtavle-cache) bør være JSONB med indekser — Postgres-nativ.",
    "<b>Single writer.</b> Når flere kenneler migrerer samtidig, køer skrivinger. På Postgres får vi flere parallelle skrivinger.",
]))
story.append(P(
    "Konklusjonen: D1 er glimrende for noen ting (hendelses-logg, midlertidige states, "
    "lette mikro-tjenester). Men hovedbasen vår må være Postgres. Vi taper litt billig-faktor, "
    "men vinner stort på modenhet og fremtidssikkerhet."
))

story.append(H2("Datamodell — kjerneskjelettet"))
story.append(P(
    "Komplett skjema er for langt for dette kapittelet. Her er <b>kjerne-entitetene og hvordan "
    "de henger sammen</b>. Hver tabell-navn under er en faktisk Postgres-tabell vi vil opprette."
))
story.append(P("<b>Identitet:</b>"))
story.append(bullets([
    "<code>users</code> — én rad per person. E-post, opprettet, tidssone, språk-preferanse",
    "<code>kennels</code> — én rad per kennel. Affiks, eier, branding, karma-poeng, etikk-status",
    "<code>user_kennel_role</code> — kobler bruker til kennel med rolle. (I v1: alltid 'admin'.)",
]))
story.append(P("<b>Hund:</b>"))
story.append(bullets([
    "<code>dogs</code> — én rad per hund. Registrert navn, kallenavn, sex, fødselsdato, rase, microchip, status, åpenhet-flagg, kover-bilde-referanse",
    "<code>dog_registrations</code> — N rader per hund. Én per kennelklubb (NKK + AKC + osv.)",
    "<code>dog_relationships</code> — graf-tabellen. Hver rad er &laquo;hund X har forelder Y i rolle (sire/dam)&raquo; med konfidens-merke. Dette er det som gjør dyp pedigree mulig.",
    "<code>titles</code>, <code>show_results</code>, <code>working_results</code> — N per hund",
    "<code>health_tests</code> — polymorf tabell. Hver rad har scheme + raw_value + normalized_value + sertifikat-referanse",
    "<code>vaccinations</code>, <code>dewormings</code>, <code>weight_log</code>, <code>vet_visits</code> (privat) — én rad per hendelse",
]))
story.append(P("<b>Kull:</b>"))
story.append(bullets([
    "<code>litters</code> — én rad per kull. Sire, dam, daters, status (planlagt/aktivt/historisk)",
    "<code>litter_puppies</code> — kobling. Hvilke hunder var i hvilket kull",
    "<code>litter_daily_logs</code> — én rad per dag per kull. Vekter, observasjoner, bilder",
]))
story.append(P("<b>Filer og bilder:</b>"))
story.append(bullets([
    "<code>files</code> — én rad per opplastet fil. R2-nøkkel, type, opplaster, opprettet, alt-tekst",
    "<code>dog_photos</code>, <code>litter_photos</code> — kobling fra fil til entitet",
    "Selve filene ligger i R2, ikke i DB. Vi henter via signerte URL-er.",
]))
story.append(P("<b>Kjøper og buyer-portal:</b>"))
story.append(bullets([
    "<code>buyer_applications</code> — innkomne søknader",
    "<code>buyers</code>, <code>dog_ownership_history</code> — hvem eier hvilken hund når",
    "<code>buyer_guide_templates</code> + <code>buyer_guide_sections</code> — kennelens egen guide",
    "<code>puppy_journeys</code> — per-valp-tidslinje, varselpreferanser",
]))
story.append(P("<b>Karma og kvalitet:</b>"))
story.append(bullets([
    "<code>karma_events</code> — audit-trail av alle karma-tildelinger",
    "<code>ethics_declarations</code> — per kennel, per år",
    "<code>reports</code> — bruker-rapporter på kenneler, status, intern oppfølging",
]))
story.append(P("<b>Nyhetsmotor:</b>"))
story.append(bullets([
    "<code>news_sources</code> — våre 50+ kilder med metadata",
    "<code>news_articles</code> — strukturerte saker med oversettelser i JSONB",
    "<code>user_news_state</code> — hvilke saker brukeren har lest, lagret, blitt varslet om",
]))
story.append(P("<b>Migrering:</b>"))
story.append(bullets([
    "<code>migration_jobs</code> — én rad per kennel-migrering. Status, råresultat, gjennomgang",
]))
story.append(P("<b>Audit og GDPR:</b>"))
story.append(bullets([
    "<code>audit_log</code> — hvem-gjorde-hva-når. Bevis ved tvist, GDPR-spor",
    "<code>data_deletion_requests</code> — håndtering av rett-til-å-bli-glemt",
]))

story.append(H2("Sikkerhet — slik beskytter vi dataene"))
story.append(bullets([
    "<b>Row-Level Security (RLS) i Postgres fra dag 1.</b> Hver tabell har policy som sjekker at brukerens kennel-id matcher radens. Glemmer vi en sjekk i applikasjonen, fanger DB-en det.",
    "<b>Kryptert i transit overalt.</b> TLS 1.3, HSTS, ingen unntak.",
    "<b>Kryptert i hvile.</b> Postgres-data, R2-objekter — alt kryptert. Cloudflare og Neon håndterer dette by default.",
    "<b>PII-felter ekstra-kryptert.</b> E-post, telefon, kjøper-kontaktinfo lagres med separat kryptering (column-level encryption) — selv om noen får DB-dump er disse ulesbare.",
    "<b>Ingen passord lagres.</b> Vi bruker passkeys og magic links — ingen passord-database å lekke.",
    "<b>Audit-log immutable.</b> Append-only. Ikke engang admin kan endre — kun nye rader.",
    "<b>Signerte URL-er for filer.</b> R2-objekter er ikke offentlig tilgjengelig som standard. Klient får tidsbegrenset signert URL.",
    "<b>Rate-limiting på alt.</b> KV holder counter per IP/bruker. Stopper både botter og buggy klient-kode.",
    "<b>Secrets i Cloudflare Secrets Store</b> — aldri i kode, aldri i miljøvariabler synlige i logger.",
    "<b>EU-region (Frankfurt eller Amsterdam) for alt med personoppdata.</b> GDPR-compliance fra dag 1.",
]))

story.append(H2("Drift, monitoring og stabilitet"))
story.append(bullets([
    "<b>Backup:</b> Neon har 7-dagers point-in-time recovery på gratis-tier, opp til 30 dager på betalt. Vi tar i tillegg ukentlige eksporter til R2 (forskjellig leverandør = ekstra forsikring).",
    "<b>Monitoring:</b> Cloudflare Workers Observability gir logs og metrics gratis. Sentry fanger feil og varsler oss. Vi setter opp et lite dashboard på en innsiden-side.",
    "<b>Uptime:</b> Cloudflare har 99,99 % SLA på Workers. Neon har 99,95 % på betalt-tier. Med riktige fallbacks (KV-cache når Postgres er nede for lese-operasjoner) vil brukeropplevd uptime være bedre enn 99,9 %.",
    "<b>Disaster recovery:</b> hele systemet kan re-provisjoneres fra IaC (Terraform / Pulumi) på under én time. Backup-data restaureres på toppen.",
    "<b>Skala-respons:</b> Workers og R2 skalerer automatisk. Neon skalerer compute auto opptil grensen vi setter. Ingen manuell skalering normalt.",
    "<b>On-call:</b> i starten er det Ole. Sentry varsler på telefonen ved kritiske feil. Cloudflare gir status-dashboard.",
    "<b>Deployment:</b> push til main → Cloudflare Pages bygger og deployer automatisk. Worker-funksjoner versjoneres med wrangler. Rollback med ett trykk.",
    "<b>Database-migrasjoner:</b> via drizzle-kit eller prisma migrate, kjørt fra GitHub Actions før deploy.",
    "<b>Stagings-miljø:</b> identisk produksjon, men på Neon branch (forks DB på sekunder, gratis).",
]))

story.append(H2("Kostnadsbilde — fra dag 1 til 10 000 kunder"))
story.append(cost_table([
    ["Skala", "Kunder", "Total/mnd", "Hva som driver kostnaden"],
    ["Utvikling", "0", "~50 kr", "Bare KI-prototyping. Alt annet på gratis-tier."],
    ["Tidlig", "100", "~500 kr", "Neon Launch ($19), R2 lagring (~$5), Resend ($20), Sentry (gratis), Stripe (% av salg)"],
    ["Vekst", "1 000", "~3 500 kr", "Neon Scale ($69), Workers Paid ($5 + $0.30/mill), R2 (~$30), Resend ($20), AI Gateway/Claude (~$200), Vectorize ($5)"],
    ["Skalert", "10 000", "~25 000 kr", "Neon Pro (~$200), Workers (~$50), R2 (~$200), Claude API (~$1 500), Resend Pro, Vectorize Pro, monitoring tools"],
]))
story.append(P(
    "Til sammenligning: 1 000 kunder à 200 kr/mnd = 200 000 kr/mnd i inntekt. Drift på "
    "3 500 kr er under 2 % av omsetning. Marginen er overveldende positiv."
))
story.append(P(
    "<b>Det som skalerer raskest:</b> KI-kostnader (Claude). Mitigeres ved aggressiv caching i "
    "AI Gateway (samme prompt = ingen ny kostnad), bruk av Workers AI for billige oppgaver "
    "(klassifisering, embeddings) i stedet for Claude, og rate-limiting per kennel for å stoppe "
    "uvettig bruk."
))

story.append(H2("Kritisk vurdering — det vi må holde øye med"))
story.append(P("Etter flere runders gjennomgang er disse de reelle risikoene:"))
story.append(numbered([
    "<b>Neon avhengighet.</b> Vi er låst til Neon for Postgres. Mitigert ved at: (a) det er åpen Postgres — vi kan migrere til Supabase, AWS RDS eller hvor som helst på en helg. (b) Backups eksporteres ut av Neon ukentlig.",
    "<b>Cloudflare Workers-grenser.</b> 30 sek CPU-budsjett, 128 MB minne. Fint for de fleste API-kall, men store KI-jobber (migrering av en kennel) må kjøres som queue jobs, ikke synkron Worker. Designet håndterer det.",
    "<b>Cold start på Neon.</b> Serverless Postgres kan ta 1–2 sek å våkne fra fullstopp. Mitigert ved Hyperdrive-cache (mange queries treffer aldri DB) og &laquo;always-on&raquo;-modus på betalt-tier.",
    "<b>Vendor lock-in på Cloudflare.</b> Real, men: Workers er kjøre-på-Node-kompatible, R2 er S3-kompatibel, Queues kan erstattes med SQS. Vi velger Cloudflare-spesifikke ting kun der det er åpenbar gevinst.",
    "<b>Vectorize er nyere produkt.</b> Modent nok for v2-funksjoner (&laquo;finn lignende hunder&raquo;), men vi kan bytte til Pinecone/Weaviate hvis det skuffer. Gjør embeddings-format leverandør-uavhengig.",
    "<b>KI-pris-volatilitet.</b> Anthropic kan øke priser. Mitigert ved AI Gateway som gir oss måling og cache, og ved at vi kan rute lette oppgaver til Workers AI (Cloudflares egne modeller) som er mye billigere.",
    "<b>Postgres-graf på dyp pedigree.</b> Recursive CTE på 10+ generasjoner kan bli treigt med millioner av hunder. Mitigert ved materialiserte ane-paths som oppdateres ved skriving, og caching i KV.",
]))

story.append(H2("Hvorfor dette er det riktige svaret"))
story.append(P(
    "La oss måle mot de fem aksene du satte:"
))
story.append(bullets([
    "<b>Sikkerhet:</b> Postgres RLS + passwordless auth + kryptert PII + signerte URL-er + EU-region + audit-log. Industri-best.",
    "<b>Stabilitet:</b> Cloudflare 99,99 % SLA + Neon 99,95 % + KV-cache som fallback + ukentlig backup-eksport + IaC for hurtig disaster recovery. Vi har flere lag å falle tilbake på.",
    "<b>Lett å drifte:</b> 90 % managed services. Ingen servere å passe på. Auto-skalering. Rollback med ett trykk. Én person kan drifte dette opp til 10k kunder.",
    "<b>Økonomi:</b> 50 kr/mnd til vi har 100 kunder. Drift under 2 % av omsetning ved 1k kunder. Aggressive cache-strategier holder KI-kostnader i sjakk.",
    "<b>Lett å bygge og vedlikeholde:</b> én kodebase (TypeScript), én deploy-pipeline (GitHub Actions → Cloudflare Pages), én stor leverandør (Cloudflare) + én Postgres (Neon). Smal, fokusert stack.",
]))
story.append(callout(
    "Konklusjonen: <b>vi går for Cloudflare-tungt + Neon Postgres</b>. Det er den enkleste "
    "stacken som ikke gir kompromiss på noen av aksene som betyr noe. Vi forplikter oss til den, "
    "starter implementering, og vurderer på nytt etter 6 måneder hvis noe overrasker oss."
))

# =========================================================================
# Appendix 1 — Source list for the news engine
# =========================================================================
story.append(H1("Appendix 1 — Kildeliste for nyhetsmotoren"))
story.append(P(
    "Dette er en startliste på 50 kuraterte kilder for nyhetsmotoren. Listen er ikke "
    "uttømmende — den er en seed vi bygger videre på etter hvert som vi ser hva som "
    "leverer kvalitet. Vi kommer til å fjerne kilder som gir spam eller feil, og legge "
    "til etter hvert som vi får forespørsler fra brukerne om manglende kilder."
))

story.append(H2("Evalueringskriterier"))
story.append(P(
    "Hver kilde er evaluert på seks dimensjoner som styrer både rangering i feeden og "
    "hvor ofte vi henter:"
))
story.append(bullets([
    "<b>Kategori (Cat):</b> KK = Kennelklubb · RG = Regulator · RB = Raseklubb · BR = Bruks/sport · VT = Veterinær/medisin · MG = Magasin/media · LB = Lab/test · Event = Stor hendelse",
    "<b>Land:</b> hvor kilden hører hjemme (en kilde kan være relevant for flere markeder)",
    "<b>Språk:</b> primærspråk innholdet publiseres på — alt oversettes ved inntak til våre 6 språk",
    "<b>Autoritet (1–5 stjerner):</b> 5 = primær myndighet, “alle leser dette”. 4 = bredt respektert. 3 = relevant supplement. 2 = bakgrunn. 1 = nisje.",
    "<b>Frekvens:</b> hvor ofte nytt innhold dukker opp (Daglig / Ukentlig / Månedlig / Sporadisk)",
    "<b>Feed:</b> hvordan vi henter (RSS = ferdig feed · Web = vi crawler HTML · NL = nyhetsbrev · Soc = primært sosiale medier · API = strukturert tilgang)",
]))
story.append(callout(
    "<b>NB:</b> URLer og feed-tilganger må verifiseres ved implementering. Mange "
    "kennelklubber og raseklubber legger om sider, fjerner RSS, eller endrer "
    "tilgangsmønstre uten varsel. Listen er en strategisk seed, ikke en teknisk spec."
))

# ---- Skandinavia ----
story.append(src_section("SKANDINAVIA — NORGE (6)"))
story.append(src(1, "NKK (Norsk Kennel Klub)", "nkk.no", "KK", "NO", "Bokmål", 5, "Ukentlig", "Web + NL",
    "Hovedkilde for norske oppdrettere. Utstillingskalender, stamtavle-data, regelendringer, NKK-styrets vedtak. Ingen offentlig RSS — vi crawler. Også DogWeb-søk er innenfor (per-hund)."))
story.append(src(2, "Mattilsynet", "mattilsynet.no", "RG", "NO", "Bokmål", 5, "Sporadisk", "Web + RSS",
    "Statlig regulator. Avgjørende for endringer i krav til import/eksport, dyrevelferd, sykdomsutbrudd. Sporadisk men kritisk — push-varsel ved hver nye sak."))
story.append(src(3, "Norsk Retrieverklubb", "retrieverklubben.no", "RB", "NO", "Bokmål", 5, "Sporadisk", "Web + Soc",
    "Største raseklubb i Norge etter Schäferhund. Dekker Labrador, Golden, Flat-Coated, Curly-Coated. Mye av aktiviteten ligger på Facebook også."))
story.append(src(4, "Norsk Schäferhund Klub", "nshk.no", "RB", "NO", "Bokmål", 5, "Månedlig", "Web + Soc",
    "Avlskåring (HD/AD/mental), bruks- og utstillingsresultater, IGP-prøver. Tradisjonsrik klubb med engasjerte oppdrettere."))
story.append(src(5, "Norsk Brukshundsportforbund", "nbf.no", "BR", "NO", "Bokmål", 4, "Månedlig", "Web",
    "IGP, lydighet, agility, rallylydighet, spor. Stevner og resultater for sportshunde-kenneler."))
story.append(src(6, "Norsk Spaniel Klub", "nsk.org", "RB", "NO", "Bokmål", 4, "Sporadisk", "Web",
    "Cocker, Springer, Sussex, Field. Mindre publiseringsvolum men gull for spaniel-folket."))

story.append(src_section("SKANDINAVIA — SVERIGE (5)"))
story.append(src(7, "SKK (Svenska Kennelklubben)", "skk.se", "KK", "SE", "Svenska", 5, "Ukentlig", "Web",
    "Hovedkilde Sverige. SKK Hunddata-søk, utstillingskalender, RAS-strategier per rase. Mer åpen om data enn NKK historisk."))
story.append(src(8, "Jordbruksverket", "jordbruksverket.se", "RG", "SE", "Svenska", 5, "Sporadisk", "Web",
    "Svensk regulator for dyrehold og oppdrett. Krav rundt L102-tillatelse (kommersielt oppdrett), import/eksport."))
story.append(src(9, "SBK (Svenska Brukshundklubben)", "brukshundklubben.se", "BR", "SE", "Svenska", 5, "Ukentlig", "Web",
    "Veldig aktivt — Sverige har den sterkeste IGP/brukshund-tradisjonen i Norden. Mange stevner per uke i sesong."))
story.append(src(10, "SSRK (Svenska Spaniel- och Retrieverklubben)", "ssrk.se", "RB", "SE", "Svenska", 5, "Månedlig", "Web",
    "Stor klubb — Sverige har et høyt antall Lab og Golden-oppdrettere. Jaktprøver og utstillinger."))
story.append(src(11, "Hundsport (SKK magasin)", "hundsport.se", "MG", "SE", "Svenska", 4, "Månedlig", "Web + print",
    "SKKs offisielle magasin. Oppdretter-portretter, dybde-saker om avl og helse."))

story.append(src_section("SKANDINAVIA — DANMARK (4)"))
story.append(src(12, "DKK (Dansk Kennel Klub)", "dkk.dk", "KK", "DK", "Dansk", 5, "Ukentlig", "Web",
    "Hovedkilde Danmark. Hundeweb-søk, utstillinger, regelverk. Mindre marked, men sterk avlskultur."))
story.append(src(13, "Fødevarestyrelsen", "foedevarestyrelsen.dk", "RG", "DK", "Dansk", 5, "Sporadisk", "Web",
    "Dansk regulator. Hundeloven (BSL — Danmark har den strengeste rase-lovgivningen i Norden). Endringer her er kritisk å varsle om."))
story.append(src(14, "Dansk Retriever Klub", "retriever.dk", "RB", "DK", "Dansk", 5, "Sporadisk", "Web",
    "Lab og Golden-oppdrettere i Danmark."))
story.append(src(15, "Schæferhundeklubben for Danmark", "schaeferhund.dk", "RB", "DK", "Dansk", 5, "Månedlig", "Web",
    "Dansk schæfer-klubb. Avlsgodkjenning, mentaltester, utstillinger."))

# ---- Tyskland ----
story.append(src_section("TYSKLAND (12)"))
story.append(src(16, "VDH (Verband für das Deutsche Hundewesen)", "vdh.de", "KK", "DE", "Deutsch", 5, "Ukentlig", "Web",
    "Tysklands nasjonale kennelklubb-paraply. Bundessieger-utstilling, FCI-tilknyttede raseklubber, Tierschutzgesetz-oppdateringer."))
story.append(src(17, "SV (Verein für Deutsche Schäferhunde)", "schaeferhunde.de", "RB", "DE", "Deutsch", 5, "Ukentlig", "Web",
    "Verdens største enkelt-rase-klubb. Sieger-utstillingen er årets viktigste hendelse for GSD globalt. Körung-regler, avlsstrategi."))
story.append(src(18, "ADRK (Allgemeiner Deutscher Rottweiler-Klub)", "adrk.de", "RB", "DE", "Deutsch", 5, "Månedlig", "Web",
    "Rottweiler-autoriteten — alle seriøse Rottweiler-oppdrettere globalt følger ADRK."))
story.append(src(19, "DTK (Deutscher Teckelklub 1888)", "dtk1888.de", "RB", "DE", "Deutsch", 5, "Månedlig", "Web",
    "Dachshund / tax. En av Europas eldste raseklubber (grunnlagt 1888)."))
story.append(src(20, "KfT (Klub für Terrier)", "klub-fuer-terrier.de", "RB", "DE", "Deutsch", 5, "Månedlig", "Web",
    "Paraplyklubb for alle terrier-raser i Tyskland."))
story.append(src(21, "PSK (Pinscher-Schnauzer-Klub)", "pscd.de", "RB", "DE", "Deutsch", 5, "Månedlig", "Web",
    "Schnauzer (alle størrelser) og Pinscher. Tysk hjemland for rasene."))
story.append(src(22, "JGHV (Jagdgebrauchshundverband)", "jghv.de", "BR", "DE", "Deutsch", 5, "Månedlig", "Web",
    "Tysk jakthund-paraply. VJP/HZP/VGP-prøver. Sentralt for jakthund-oppdrettere i hele Mellom-Europa."))
story.append(src(23, "DRC (Deutscher Retriever Club)", "drc.de", "RB", "DE", "Deutsch", 5, "Månedlig", "Web",
    "Retriever-klubben for Tyskland. Lab og Golden er svært populære."))
story.append(src(24, "BMEL (Bundesministerium für Ernährung und Landwirtschaft)", "bmel.de", "RG", "DE", "Deutsch", 5, "Sporadisk", "Web + RSS",
    "Tysk regulator. Tierschutzgesetz-endringer, BSL per delstat. Bayern, Hessen, NRW har egne lister."))
story.append(src(25, "Bundestierärztekammer", "bundestieraerztekammer.de", "VT", "DE", "Deutsch", 4, "Sporadisk", "Web",
    "Den tyske veterinærforening. Faglige uttalelser, vaksinasjons-veiledning."))
story.append(src(26, "Der Hund (magasin)", "der-hund.de", "MG", "DE", "Deutsch", 4, "Månedlig", "Web + print",
    "Etablert tysk hundemagasin. Oppdretter-portretter, helse-dypdykk, lov og rett."))
story.append(src(27, "Wuff (magasin)", "wuff.eu", "MG", "DE/AT", "Deutsch", 4, "Månedlig", "Web + print",
    "Tysk-språklig magasin, sterkt i Østerrike også. Hverdagshund og avl."))

# ---- UK ----
story.append(src_section("STORBRITANNIA (10)"))
story.append(src(28, "The Kennel Club", "thekennelclub.org.uk", "KK", "UK", "English", 5, "Ukentlig", "Web + RSS",
    "Hovedkilde Storbritannia. Find a Dog-søk, Assured Breeder Scheme, regelverk. Ledende på helse-screening (Mate Select)."))
story.append(src(29, "Dog World", "dogworld.co.uk", "MG", "UK", "English", 5, "Ukentlig", "Web + print",
    "Ukentlig avis for show-folket. Dommere, resultater, oppdretter-profiler. En av to definerende UK-publikasjoner."))
story.append(src(30, "Our Dogs", "ourdogs.co.uk", "MG", "UK", "English", 5, "Ukentlig", "Web + print",
    "Den andre store ukeavisen. Konkurrerer med Dog World, samme målgruppe."))
story.append(src(31, "Crufts", "crufts.org.uk", "Event", "UK", "English", 5, "Årlig peak + månedlig", "Web + Soc",
    "Verdens største enkelt-hundeutstilling. Februar/mars hvert år. Påmelding åpner høsten før — vi varsler."))
story.append(src(32, "BVA (British Veterinary Association)", "bva.co.uk", "VT", "UK", "English", 5, "Ukentlig", "Web + RSS",
    "Veterinærforeningens uttalelser om avl, helse, BSL, brachycefale raser. Påvirker mye av britisk politikk."))
story.append(src(33, "Defra (Dept. for Environment, Food & Rural Affairs)", "gov.uk/defra", "RG", "UK", "English", 5, "Sporadisk", "Web + RSS",
    "UK-regulator. DDA (Dangerous Dogs Act), XL Bully-håndtering, pet travel post-Brexit."))
story.append(src(34, "The Labrador Retriever Club", "labradorretrieverclub.co.uk", "RB", "UK", "English", 4, "Månedlig", "Web",
    "Britisk Lab-klubb. Working tests og field trials er sentrale."))
story.append(src(35, "GSD League of Great Britain", "gsdleague.co.uk", "RB", "UK", "English", 4, "Månedlig", "Web",
    "Britisk schäfer-klubb. Working-line vs show-line debatten lever sterkt her."))
story.append(src(36, "Dogs Today (magasin)", "dogstodaymagazine.co.uk", "MG", "UK", "English", 3, "Månedlig", "Web + print",
    "Eier-rettet magasin. Mer breddestoff enn bransje-stoff, men plukker opp regulatoriske endringer raskt."))
story.append(src(37, "Pet Industry Federation", "petindustryfederation.co.uk", "Bransje", "UK", "English", 3, "Månedlig", "Web",
    "Bransjeforening. Tilbakekallinger, regulatoriske oppdateringer, butikkjede-nyheter."))

# ---- Benelux ----
story.append(src_section("BENELUX — NEDERLAND (4)"))
story.append(src(38, "Raad van Beheer op Kynologisch Gebied", "raadvanbeheer.nl", "KK", "NL", "Nederlands", 5, "Ukentlig", "Web",
    "Nederlands kennelklubb. Stamtavle-base, utstillinger, regelverk. Mer åpen om brakycefale raser nylig."))
story.append(src(39, "NVWA (Nederlandse Voedsel- en Warenautoriteit)", "nvwa.nl", "RG", "NL", "Nederlands", 5, "Sporadisk", "Web",
    "Nederlandsk regulator. Streng på dyrevelferd og oppdrett — viktig for de som selger valp til NL."))
story.append(src(40, "Onze Hond (magasin)", "onzehond.nl", "MG", "NL", "Nederlands", 4, "Månedlig", "Web + print",
    "Nederlands største hundemagasin. Bred dekning av oppdrett, helse, trening."))
story.append(src(41, "KNJV (Koninklijke Nederlandse Jagersvereniging)", "jagersvereniging.nl", "BR", "NL", "Nederlands", 4, "Ukentlig", "Web",
    "Nederlandske jegere — jakthund-prøver, treningsdager, lover. Sentralt for jakthund-oppdrettere."))

story.append(src_section("BENELUX — BELGIA (3)"))
story.append(src(42, "KMSH / URCSH (Sint-Hubertus)", "kmsh.be", "KK", "BE", "Nederlands+Français", 5, "Månedlig", "Web",
    "Belgisk nasjonal kennelklubb (Flandern + Vallonia). Belgia er hjemlandet for Malinois og Tervueren — Mali-avl er internasjonalt sentralt."))
story.append(src(43, "FAVV-AFSCA", "favv-afsca.be", "RG", "BE", "Nederlands+Français", 5, "Sporadisk", "Web",
    "Belgisk regulator. Import/eksport, dyrevelferd. Belgia har streng dyrevelferdslovgivning."))
story.append(src(44, "Hondenwereld (magasin)", "hondenwereld.be", "MG", "BE", "Nederlands", 3, "Månedlig", "Web",
    "Belgisk hundemagasin. Mindre volum, men dekker både flamsk og nederlandsk publikum."))

story.append(src_section("BENELUX — LUXEMBOURG (1)"))
story.append(src(45, "UCL (Union Cynologique Luxembourgeoise)", "fcluxembourg.lu", "KK", "LU", "Français+Deutsch", 4, "Sporadisk", "Web",
    "Lite marked, men en del valpekjøp krysser grenser. Tysk- og fransktalende oppdrettere."))

# ---- Pan-europeisk ----
story.append(src_section("PAN-EUROPEISK / GLOBALT (5)"))
story.append(src(46, "FCI (Fédération Cynologique Internationale)", "fci.be", "KK", "Pan-EU", "English+Français", 5, "Ukentlig", "Web",
    "Den internasjonale paraplyen. World Dog Show, European Dog Show, raseendringer (FCI godkjenner nye raser), internasjonale titler (CACIB)."))
story.append(src(47, "Embark for Breeders blog", "embarkvet.com/breeders", "LB", "Global", "English", 4, "Ukentlig", "Web + RSS",
    "DNA-test-aktør med tung forskningsinvestering. Nye tester, breed-specific oppdagelser, COI-funn. Også relevant: brukerens egne resultater kan importeres."))
story.append(src(48, "Wisdom Panel blog", "wisdompanel.com/en-us/blog", "LB", "Global", "English", 4, "Ukentlig", "Web",
    "Embarks store konkurrent. Bredere testdekning på noen breeds, smalere på andre."))
story.append(src(49, "Laboklin", "laboklin.com", "LB", "DE-led", "Deutsch+English", 5, "Sporadisk", "Web",
    "Europeisk DNA-test-autoritet. Mange tester kreves spesifikt fra Laboklin av tyske og nordiske raseklubber. Nye test-utgivelser annonseres her."))
story.append(src(50, "OFA (Orthopedic Foundation for Animals)", "ofa.org", "LB", "USA", "English", 4, "Månedlig", "Web",
    "Amerikansk men globalt referert. Helse-database for HD/ED/hjerte/øyne/DNA. Mange amerikansk-importerte hunder har OFA-resultater."))

story.append(Spacer(1, 12))
story.append(H2("Hvordan vi rangerer i feeden"))
story.append(P(
    "Når brukeren får sin personlige nyhetsfeed, brukes disse signalene til å rangere sakene:"
))
story.append(numbered([
    "<b>Rase-match:</b> sak er tagget med en rase brukeren har registrert → vekt opp",
    "<b>Region-match:</b> sak er fra eller om brukerens region → vekt opp",
    "<b>Autoritet:</b> 5-stjerners kilde rangeres høyere enn 3-stjerners",
    "<b>Ferskhet:</b> nyere er bedre (men ikke alltid — “bendelorm-vinduet ditt utløper” er evig nyttig)",
    "<b>Kategori-vekt:</b> brukeren kan justere vekt per kategori (skru opp helse, skru ned events)",
    "<b>Viktighet:</b> KI flagger saker som “høy viktighet” (matsikkerhets-tilbakekallinger, alvorlige sykdomsutbrudd) — disse pushes uavhengig av personalisering",
]))

story.append(H2("Hva vi gjør med en kilde over tid"))
story.append(bullets([
    "<b>Måler kvalitet:</b> hvor ofte klikker brukere på sakene? Hvor ofte rapporterer de feil? Lav kvalitet → kilden nedjusteres eller fjernes.",
    "<b>Måler frekvens:</b> kilder som plutselig spammer (mange saker per dag) får automatisk frekvens-cap.",
    "<b>Måler dekning:</b> tomme områder (få saker per rase per måned) leter vi aktivt etter nye kilder for.",
    "<b>Liste over kandidater:</b> brukere kan foreslå kilder. Vi vurderer og legger til.",
    "<b>Årlig audit:</b> hele listen revideres en gang i året. Døde kilder fjernes, nye autoriteter legges til.",
]))

doc.build(story, onFirstPage=on_page, onLaterPages=on_page)
print(f"Wrote {OUT}")
