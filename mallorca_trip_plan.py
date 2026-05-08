from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import mm
from reportlab.lib import colors
from reportlab.platypus import (SimpleDocTemplate, Paragraph, Spacer, Table,
                                TableStyle, HRFlowable, KeepTogether)
from reportlab.lib.enums import TA_LEFT, TA_CENTER

W, H = A4
BLUE  = colors.HexColor('#1e64b4')
GREEN = colors.HexColor('#1a7a1a')
AMBER = colors.HexColor('#b45a14')
LGREY = colors.HexColor('#f0f5ff')
DGREY = colors.HexColor('#e0e8f8')
WHITE = colors.white

styles = getSampleStyleSheet()

def style(name, parent='Normal', **kw):
    return ParagraphStyle(name, parent=styles[parent], **kw)

title_s  = style('title',  fontSize=20, textColor=WHITE, alignment=TA_CENTER, spaceAfter=2)
sub_s    = style('sub',    fontSize=10, textColor=WHITE, alignment=TA_CENTER)
h1_s     = style('h1',     fontSize=11, textColor=WHITE, fontName='Helvetica-Bold')
day_s    = style('day',    fontSize=10, textColor=WHITE, fontName='Helvetica-Bold')
body_s   = style('body',   fontSize=9,  leading=13, spaceAfter=1)
bullet_s = style('bul',    fontSize=9,  leading=13, leftIndent=10, bulletIndent=0, spaceAfter=1)
small_s  = style('small',  fontSize=8,  leading=11, textColor=colors.HexColor('#444444'))
bold_s   = style('bold',   fontSize=9,  fontName='Helvetica-Bold', leading=13)

def section_header(text):
    t = Table([[Paragraph(f'  {text}', h1_s)]], colWidths=[W - 30*mm])
    t.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), BLUE),
        ('TOPPADDING',    (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('LEFTPADDING',   (0,0), (-1,-1), 4),
    ]))
    return t

def day_header(text, tag=None):
    color = GREEN if tag == 'free' else AMBER if tag == 'training' else colors.HexColor('#505050')
    t = Table([[Paragraph(f'  {text}', day_s)]], colWidths=[W - 30*mm])
    t.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), color),
        ('TOPPADDING',    (0,0), (-1,-1), 3),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3),
    ]))
    return t

def bullet(text):
    return Paragraph(f'<bullet>&bull;</bullet> {text}', bullet_s)

def kv(key, val):
    return Table([[Paragraph(f'<b>{key}</b>', body_s), Paragraph(val, body_s)]],
                 colWidths=[45*mm, W - 75*mm],
                 style=TableStyle([('VALIGN',(0,0),(-1,-1),'TOP'),
                                   ('TOPPADDING',(0,0),(-1,-1),1),
                                   ('BOTTOMPADDING',(0,0),(-1,-1),1)]))

def data_table(headers, rows, col_widths):
    data = [[Paragraph(f'<b>{h}</b>', body_s) for h in headers]]
    for i, row in enumerate(rows):
        data.append([Paragraph(str(c), body_s) for c in row])
    t = Table(data, colWidths=col_widths)
    ts = [
        ('BACKGROUND', (0,0), (-1,0), BLUE),
        ('TEXTCOLOR',  (0,0), (-1,0), WHITE),
        ('GRID',       (0,0), (-1,-1), 0.4, colors.HexColor('#cccccc')),
        ('VALIGN',     (0,0), (-1,-1), 'TOP'),
        ('TOPPADDING', (0,0), (-1,-1), 3),
        ('BOTTOMPADDING',(0,0),(-1,-1), 3),
    ]
    for i in range(1, len(data)):
        if i % 2 == 0:
            ts.append(('BACKGROUND', (0,i), (-1,i), LGREY))
    t.setStyle(TableStyle(ts))
    return t

# ── Build document ────────────────────────────────────────────────────────────
story = []

# Cover / title block
cover = Table(
    [[Paragraph('Mallorca Trip Plan', title_s)],
     [Paragraph('May 8 – 16, 2026  |  Porreres, Mallorca', sub_s)],
     [Paragraph('2 travellers  ·  Mid-range  ·  Relaxed pace  ·  Accommodation &amp; breakfast included', sub_s)]],
    colWidths=[W - 30*mm]
)
cover.setStyle(TableStyle([
    ('BACKGROUND', (0,0), (-1,-1), BLUE),
    ('TOPPADDING',    (0,0), (-1,-1), 6),
    ('BOTTOMPADDING', (0,0), (-1,-1), 6),
]))
story += [cover, Spacer(1, 5*mm)]

# Overview
story.append(section_header('TRIP OVERVIEW'))
story.append(Spacer(1, 1*mm))
for k, v in [
    ('Destination',    'Mallorca, Balearic Islands, Spain'),
    ('Dates',          'Friday 8 May – Saturday 16 May 2026  (8 nights)'),
    ('Base',           'Porreres  (central-south Mallorca)'),
    ('Accommodation',  'Already arranged, breakfast included'),
    ('Transport',      'TIB bus A51 (airport transfers) · Bike rental · Taxis'),
    ('Interests',      'Food &amp; culinary, adventure outdoors, beach &amp; relaxation'),
]:
    story.append(kv(k, v))
story.append(Spacer(1, 3*mm))

# Schedule at a glance
story.append(section_header('SCHEDULE AT A GLANCE'))
story.append(Spacer(1, 1*mm))
story.append(data_table(
    ['Date', 'Day', 'Type', 'Plan'],
    [
        ('8 May',  'Friday',    'Arrival',        'Bus A51 from airport · settle in · local dinner'),
        ('9 May',  'Saturday',  'FREE TOGETHER',  'Serra de Tramuntana — Valldemossa · Deià · Sóller'),
        ('10 May', 'Sunday',    'Training 9–5',   'Solo: Es Trenc beach by bike  |  Eve: Palma by bus'),
        ('11 May', 'Monday',    'Training 9–5',   'Solo: Caló des Moro by bike  |  Eve: dinner locally'),
        ('12 May', 'Tuesday',   'FREE TOGETHER',  'East coast by bike — Drach Caves · Cala Mondragó'),
        ('13 May', 'Wednesday', 'Training 9–5',   'Solo: Santanyí market + Cala Llombards  |  Eve: splurge dinner'),
        ('14 May', 'Thursday',  'Training 9–5',   'Solo: Sant Salvador sanctuary  |  Eve: last dinner'),
        ('15 May', 'Friday',    'Training 9–5',   'Solo: local morning, ensaïmades  |  Eve: early night'),
        ('16 May', 'Saturday',  'Departure',      'Bus A51 to Palma airport'),
    ],
    [22*mm, 22*mm, 30*mm, W - 104*mm]
))
story.append(Spacer(1, 3*mm))

# Budget
story.append(section_header('BUDGET  (accommodation & breakfast already covered)'))
story.append(Spacer(1, 1*mm))
story.append(data_table(
    ['Category', 'Total', 'Notes'],
    [
        ('Food (lunch & dinner)', 'EUR 580', '8 days x 2 people · dinners ~EUR 50 · lunches ~EUR 15pp'),
        ('Activities',            'EUR 200', 'Drach Caves EUR 28 · Tramuntana taxi/tram · misc entries'),
        ('Transport',             'EUR 480', 'Bus A51 EUR 20 return · bikes EUR 280 · taxis EUR 180'),
        ('Miscellaneous',         'EUR 120', 'Tips, snacks, souvenirs, emergencies'),
        ('TOTAL',                 'EUR 1,380', ''),
        ('With 15% buffer',       'EUR 1,600', 'Recommended'),
    ],
    [45*mm, 28*mm, W - 103*mm]
))
story.append(Spacer(1, 3*mm))

# Day by day
story.append(section_header('DAY-BY-DAY ITINERARY'))
story.append(Spacer(1, 1*mm))

days = [
    ('Day 1 — Fri 8 May  |  Arrival', None, [
        'Take TIB bus A51 from Palma airport to Porreres (~45 min, ~EUR 10pp)',
        'Settle in, walk around Porreres town',
        'Dinner locally — try <i>pa amb oli</i> and local wine',
    ]),
    ('Day 2 — Sat 9 May  |  FREE DAY — Serra de Tramuntana', 'free', [
        'Taxi to Valldemossa (~EUR 70)',
        'Drive the MA-10: Valldemossa village → Deià → swim at Cala Deià',
        'Vintage tram from Sóller down to Port de Sóller, lunch at the port',
        'Taxi back to Porreres (~EUR 60)',
        '<b>Est. cost: EUR 200</b> (taxis, tram, lunch, entries)',
    ]),
    ('Day 3 — Sun 10 May  |  Training day (9–5)', 'training', [
        '<b>Training person:</b> training 9–5',
        '<b>Free person:</b> bike to Es Trenc beach (~20km) — long wild beach, flamingos at salt flats, bring a picnic',
        '<b>Evening together:</b> Palma by bus — La Lonja, Santa Catalina, dinner (~EUR 8 return pp)',
    ]),
    ('Day 4 — Mon 11 May  |  Training day (9–5)', 'training', [
        '<b>Training person:</b> training 9–5',
        '<b>Free person:</b> early start, bike to Caló des Moro (~22km) — arrive before 9am',
        'Cliff walk to Cala s\'Almunia, picnic, cycle to Cala Figuera fishing village on the way back',
        '<b>Evening together:</b> quiet dinner in Porreres or Campos',
    ]),
    ('Day 5 — Tue 12 May  |  FREE DAY — East Coast by Bike', 'free', [
        'Cycle together to Porto Cristo (~18km, flat)',
        'Coves del Drac at 11am — underground lake, classical music boat concert (<b>EUR 14pp — book ahead!</b>)',
        'Lunch in Porto Cristo harbour',
        'Cycle south to Cala Mondragó (~12km), afternoon swim',
        'Cycle back to Porreres  |  Total ~50km, flat and relaxed',
        '<b>Est. cost: EUR 80</b> (caves, lunch, snacks)',
    ]),
    ('Day 6 — Wed 13 May  |  Training day (9–5)', 'training', [
        '<b>Training person:</b> training 9–5',
        '<b>Free person:</b> Santanyí Wednesday market (~15km by bike) — best local market on the island',
        'Explore old town, afternoon at Cala Llombards nearby',
        '<b>Evening together:</b> farewell splurge dinner — book somewhere nice in Felanitx or Campos',
    ]),
    ('Day 7 — Thu 14 May  |  Training day (9–5)', 'training', [
        '<b>Training person:</b> training 9–5',
        '<b>Free person:</b> bike up Santuari de Sant Salvador (~8km, short climb) — panoramic views across the whole island',
        'Afternoon: pack and relax',
        '<b>Evening together:</b> last dinner in Porreres',
    ]),
    ('Day 8 — Fri 15 May  |  Training day (9–5)', 'training', [
        '<b>Training person:</b> training 9–5',
        '<b>Free person:</b> local morning, pick up <i>ensaïmades</i> from bakery to take home',
        'Evening: early night, ready for departure',
    ]),
    ('Day 9 — Sat 16 May  |  Departure', None, [
        'Morning: last coffee, collect <i>ensaïmades</i>',
        'TIB bus A51 from Porreres to Palma airport (~45 min)',
    ]),
]

for header, tag, bullets in days:
    block = [day_header(header, tag), Spacer(1, 1*mm)]
    for b in bullets:
        block.append(bullet(b))
    block.append(Spacer(1, 2*mm))
    story.append(KeepTogether(block))

# Transport
story.append(section_header('TRANSPORT'))
story.append(Spacer(1, 1*mm))
for b in [
    'Airport ↔ Porreres: TIB bus <b>A51</b> (direct, ~45 min, ~EUR 10pp each way)',
    'Bike rental: <b>Best Bike Hire Mallorca</b> or <b>Can Velo Mallorca</b> — both deliver to Porreres (2 bikes x 8 days ~EUR 280)',
    'Taxis: pre-book for Tramuntana day — Porreres to Valldemossa ~EUR 70, return ~EUR 60',
    'Palma evenings: TIB bus from Campos (~EUR 4pp each way)',
]:
    story.append(bullet(b))
story.append(Spacer(1, 3*mm))

# Packing
story.append(section_header('PACKING CHECKLIST'))
story.append(Spacer(1, 1*mm))
packing = {
    'Essentials': [
        'Passport (check 6-month validity)',
        'Travel insurance documents',
        'Flight tickets &amp; hotel confirmations',
        'Credit/debit cards (notify your bank)',
        'EUR 200–300 cash',
        'European plug adapter (Type C/F)',
        'Medications',
    ],
    'Clothing  (May: 19–24°C, sunny)': [
        '2 swimsuits',
        '5–6 lightweight tops / t-shirts',
        '2 pairs shorts',
        '1–2 pairs long trousers (evenings, church visits)',
        '1 light jacket for evenings',
        'Sandals',
        'Hiking boots (Sant Salvador + rough beach paths)',
        'Sun hat &amp; sunglasses',
    ],
    'Activities': [
        'Day backpack',
        'Reusable water bottle',
        'Snorkel gear (or rent locally ~EUR 10/day)',
        'Waterproof bag / dry sack',
        'Sunscreen SPF 50',
        'Compact beach towel',
        'Camera',
    ],
}
for section, items in packing.items():
    story.append(Paragraph(f'<b>{section}</b>', bold_s))
    for item in items:
        story.append(bullet(f'[ ]  {item}'))
    story.append(Spacer(1, 1*mm))
story.append(Spacer(1, 2*mm))

# Cultural tips
story.append(section_header("CULTURAL DO'S & DON'TS"))
story.append(Spacer(1, 1*mm))
story.append(Paragraph('<b>Do\'s</b>', bold_s))
for d in [
    "Greet with <i>Hola</i> or <i>Bones</i> (Mallorquí) when entering any shop",
    "Eat lunch at 2pm and dinner after 9pm — restaurants won't be open earlier",
    "Cover up when moving from beach to town — legally required in Palma (EUR 100–200 fine otherwise)",
    "Try the <i>menú del día</i> for lunch — 3 courses + drink for EUR 12–18",
]:
    story.append(bullet(f'✓  {d}'))
story.append(Spacer(1, 1*mm))
story.append(Paragraph("<b>Don'ts</b>", bold_s))
for d in [
    "Don't walk around Palma in just a swimsuit — illegal and disrespectful",
    "Don't assume everyone speaks English outside tourist areas",
    "Don't rush meals — sit, enjoy, linger",
    "Don't make noise during siesta (2–5pm) or late at night",
]:
    story.append(bullet(f'✗  {d}'))
story.append(Spacer(1, 3*mm))

# Book ahead
story.append(section_header('BOOK BEFORE YOU GO'))
story.append(Spacer(1, 1*mm))
for b in [
    '<b>Coves del Drac</b> — book online for Tue 12 May 11am: covesdeldrach.com',
    '<b>Bike rental x2</b> — contact Best Bike Hire Mallorca or Can Velo Mallorca, request delivery to Porreres',
    '<b>Taxi for Tramuntana day</b> — pre-book for Sat 9 May early morning pickup',
    '<b>Splurge dinner</b> — reserve for Wed 13 May evening in Felanitx or Campos',
]:
    story.append(bullet(f'[ ]  {b}'))

# Build PDF
output = '/home/user/straps/mallorca_may2026.pdf'
doc = SimpleDocTemplate(output, pagesize=A4,
                        leftMargin=15*mm, rightMargin=15*mm,
                        topMargin=15*mm, bottomMargin=15*mm)
doc.build(story)
print(f'Saved: {output}')
