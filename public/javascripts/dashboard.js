/**
 * ShinchokuDashboard
 * @class
 */
class ShinchokuDashboard {
    /**
     * @constructor
     */
    constructor () {
        this.socket = new WS()

        this.init()
        this.sockets()
        this.onLoad()

        return this
    }

    /**
     * Class initialization
     */
    init () {
        // DOM Elements
        this.$elements = {
            encounter: {
                title: $('#encounter-title'),
                image: $('#encounter-image'),
                difficulty: $('#encounter-difficulty'),
                icon: $('#encounter-icon'),
            },
            summary: {
                attempts: $('#summary-attempts'),
                best: $('#summary-best'),
            },
            combat: {
                total: $('#combat-total'),
                deaths: $('#combat-deaths'),
                time: $('#combat-time'),
                meter: $('#combat-meter'),
            },
            foe: $('#current-foe span'),
            mustache: $('#mustache-combat-entry').html(),
        }

        // Encounters
        // Master list - Remove entries as encounter scripts are developed
        this.encounters = {
            unknown: './public/images/encounters/unknown.png',
            'the-temple-of-the-fist': 'https://xivapi.com/i/112000/112233.png',
            'ala-mhigo': 'https://xivapi.com/i/112000/112231.png',
            'kugane-castle': 'https://xivapi.com/i/112000/112232.png',
            'the-drowned-city-of-skalla': 'https://xivapi.com/i/112000/112255.png',
            'hells-lid': 'https://xivapi.com/i/112000/112264.png',
            'akadaemia-anyder': 'https://xivapi.com/i/112000/112349.png',
            'the-fractal-continuum-hard': 'https://xivapi.com/i/112000/112263.png',
            'the-swallows-compass': 'https://xivapi.com/i/112000/112283.png',
            'saint-mociannes-arboretum': 'https://xivapi.com/i/112000/112310.png',
            'the-burn': 'https://xivapi.com/i/112000/112311.png',
            'the-ghimlyt-dark': 'https://xivapi.com/i/112000/112333.png',
            'dohn-mheg': 'https://xivapi.com/i/112000/112343.png',
            'the-qitana-revel': 'https://xivapi.com/i/112000/112344.png',
            'malikahs-well': 'https://xivapi.com/i/112000/112345.png',
            'mt-gulg': 'https://xivapi.com/i/112000/112346.png',
            'holminster-switch': 'https://xivapi.com/i/112000/112342.png',
            'the-royal-menagerie': 'https://xivapi.com/i/112000/112244.png',
            'the-pool-of-tribute-extreme': 'https://xivapi.com/i/112000/112245.png',
            'emanation-extreme': 'https://xivapi.com/i/112000/112246.png',
            'the-minstrels-ballad-shinryus-domain': 'https://xivapi.com/i/112000/112258.png',
            'the-jade-stoa': 'https://xivapi.com/i/112000/112273.png',
            'the-jade-stoa-extreme': 'https://xivapi.com/i/112000/112274.png',
            'the-great-hunt': 'https://xivapi.com/i/112000/112289.png',
            'the-great-hunt-extreme': 'https://xivapi.com/i/112000/112290.png',
            'castrum-fluminis': 'https://xivapi.com/i/112000/112291.png',
            'the-minstrels-ballad-tsukuyomis-pain': 'https://xivapi.com/i/112000/112292.png',
            'hells-kier': 'https://xivapi.com/i/112000/112321.png',
            'hells-kier-extreme': 'https://xivapi.com/i/112000/112322.png',
            'kugane-ohashi': 'https://xivapi.com/i/112000/112320.png',
            'the-wreath-of-snakes': 'https://xivapi.com/i/112000/112339.png',
            'the-wreath-of-snakes-extreme': 'https://xivapi.com/i/112000/112340.png',
            'the-dancing-plague': 'https://xivapi.com/i/112000/112358.png',
            'the-crown-of-the-immaculate': 'https://xivapi.com/i/112000/112360.png',
            'deltascape-v10': 'https://xivapi.com/i/112000/112234.png',
            'deltascape-v20': 'https://xivapi.com/i/112000/112235.png',
            'deltascape-v30': 'https://xivapi.com/i/112000/112236.png',
            'deltascape-v40': 'https://xivapi.com/i/112000/112237.png',
            'deltascape-v10-savage': 'https://xivapi.com/i/112000/112238.png',
            'deltascape-v20-savage': 'https://xivapi.com/i/112000/112239.png',
            'deltascape-v30-savage': 'https://xivapi.com/i/112000/112240.png',
            'deltascape-v40-savage': 'https://xivapi.com/i/112000/112241.png',
            'the-unending-coil-of-bahamut-ultimate': 'https://xivapi.com/i/112000/112261.png',
            'the-royal-city-of-rabanastre': 'https://xivapi.com/i/112000/112256.png',
            'sigmascape-v10': 'https://xivapi.com/i/112000/112265.png',
            'sigmascape-v20': 'https://xivapi.com/i/112000/112267.png',
            'sigmascape-v30': 'https://xivapi.com/i/112000/112269.png',
            'sigmascape-v40': 'https://xivapi.com/i/112000/112271.png',
            'sigmascape-v10-savage': 'https://xivapi.com/i/112000/112266.png',
            'sigmascape-v20-savage': 'https://xivapi.com/i/112000/112268.png',
            'sigmascape-v30-savage': 'https://xivapi.com/i/112000/112270.png',
            'sigmascape-v40-savage': 'https://xivapi.com/i/112000/112272.png',
            'the-weapons-refrain-ultimate': 'https://xivapi.com/i/112000/112296.png',
            'the-ridorana-lighthouse': 'https://xivapi.com/i/112000/112286.png',
            'alphascape-v10': 'https://xivapi.com/i/112000/112312.png',
            'alphascape-v20': 'https://xivapi.com/i/112000/112313.png',
            'alphascape-v30': 'https://xivapi.com/i/112000/112314.png',
            'alphascape-v40': 'https://xivapi.com/i/112000/112315.png',
            'alphascape-v10-savage': 'https://xivapi.com/i/112000/112316.png',
            'alphascape-v20-savage': 'https://xivapi.com/i/112000/112317.png',
            'alphascape-v30-savage': 'https://xivapi.com/i/112000/112318.png',
            'alphascape-v40-savage': 'https://xivapi.com/i/112000/112319.png',
            'the-orbonne-monastery': 'https://xivapi.com/i/112000/112334.png',
            amaurot: 'https://xivapi.com/i/112000/112347.png',
            'the-twinning': 'https://xivapi.com/i/112000/112348.png',
            'the-grand-cosmos': 'https://xivapi.com/i/112000/112373.png',
            'anamnesis-anyder': 'https://xivapi.com/i/112000/112378.png',
            'the-dancing-plague-extreme': 'https://xivapi.com/i/112000/112359.png',
            'the-crown-of-the-immaculate-extreme': 'https://xivapi.com/i/112000/112361.png',
            'the-dying-gasp': 'https://xivapi.com/i/112000/112362.png',
            'the-minstrels-ballad-hades-elegy': 'https://xivapi.com/i/112000/112372.png',
            'cinder-drift': 'https://xivapi.com/i/112000/112379.png',
            'cinder-drift-extreme': 'https://xivapi.com/i/112000/112380.png',
            'memoria-misera-extreme': 'https://xivapi.com/i/112000/112381.png',
            'edens-gate-ressurection': 'https://xivapi.com/i/112000/112350.png',
            'edens-gate-ressurection-savage': 'https://xivapi.com/i/112000/112351.png',
            'edens-gate-inundation': 'https://xivapi.com/i/112000/112354.png',
            'edens-gate-inundation-savage': 'https://xivapi.com/i/112000/112355.png',
            'edens-gate-descent': 'https://xivapi.com/i/112000/112352.png',
            'edens-gate-descent-savage': 'https://xivapi.com/i/112000/112353.png',
            'edens-gate-sepulture': 'https://xivapi.com/i/112000/112356.png',
            'edens-gate-sepulture-savage': 'https://xivapi.com/i/112000/112357.png',
            'the-epic-of-alexander-ultimate': 'https://xivapi.com/i/112000/112374.png',
            'the-copied-factory': 'https://xivapi.com/i/112000/112375.png',
            'edens-verse-fulmination': 'https://xivapi.com/i/112000/112385.png',
            'edens-verse-fulmination-savage': 'https://xivapi.com/i/112000/112386.png',
            'edens-verse-furor': 'https://xivapi.com/i/112000/112387.png',
            'edens-verse-furor-savage': 'https://xivapi.com/i/112000/112388.png',
            'edens-verse-iconoclasm': 'https://xivapi.com/i/112000/112389.png',
            'edens-verse-iconoclasm-savage': 'https://xivapi.com/i/112000/112390.png',
            'edens-verse-refulgence': 'https://xivapi.com/i/112000/112391.png',
            'edens-verse-refulgence-savage': 'https://xivapi.com/i/112000/112392.png',
        }

        // Combat log
        this.combat = {
            active: null,
            default: {
                title: 'Awaiting Encounter...',
            },
            title: '',
            timeline: [],
        }

        // Socket Events
        this.events = {
            onCombatData: this._onCombatData.bind(this),
            onChat: this._onChat.bind(this),
        }
    }

    /**
     * DOM Event Listeners
     */
    listeners () {
        $(document)
            // OverlayPlugin
            .on('onOverlayStateUpdate', (e) => {
                console.log(e)

                if (e.detail.isLocked) {
                    $('body').removeClass('resize')
                } else {
                    if (!this.combat.active) {
                        $('body').addClass('active').removeClass('inactive')
                    }

                    $('body').addClass('resize')
                }
            })
            // Overlay Plugin
            .on('onOverlayDataUpdate', (e) => {
                if (!this.socket.ready) this.events.onCombatData(e.detail)
            })
    }

    /**
    * Socket Events
    */
    sockets () {
        // Connect
        this.socket.connect()

        this.socket.subscribe('CombatData', this.events.onCombatData)
        this.socket.subscribe('LogLine', this.events.onChat)
    }

    /**
     * Window Load
     */
    onLoad () {
        Utils.setElementValue(this.$elements.encounter.title, this.combat.default.title)
        Utils.setElementValue(this.$elements.encounter.image, this.encounters.unknown)

        this.listeners()
    }

    // Functions

    /**
     * 
     * @param {JQuery} a 
     * @param {JQuery} b 
     * @return {Number}
     */
    _sort (a, b) {
        const
            val_a = +$(a).data('sort'),
            val_b = +$(b).data('sort')

        return val_a > val_b ? -1 : (val_a < val_b ? 1 : 0)
    }

    /**
     * 
     * @param {Object} encounter 
     */
    async loadEncounter (encounter) {
        console.log(`Combat begins: ${encounter.title}`)

        this.combat.active = true
        this.combat.title = (new URLSearchParams(location.search)).get('z') ? (new URLSearchParams(location.search)).get('z') : encounter.CurrentZoneName
        this.combat.slug = Utils.slugify(this.combat.title)
        this.combat.win = null

        try {
            const f = $.getJSON(`./public/javascripts/encounters/${this.combat.slug}.json`)

            Promise
                .all([f])
                .then(([data]) => {
                    this.combat.type = data.type
                    this.combat.splash = data.splash ? data.splash : this.encounters.unknown
                    this.combat.win = new RegExp(data.win)
                    this.combat.timeline = data.timeline.map((t) => {
                        if (t.trigger) t.trigger = new RegExp(t.trigger)
                        return t
                    })

                    this.updateEncounter()
                })
                .catch((err) => {
                    console.error(`${this.combat.title} is not (yet) supported by Shinchoku.`)

                    this.combat.type = 'unknown'
                    this.combat.splash = this.encounters[this.combat.slug] ? this.encounters[this.combat.slug] : this.encounters.unknown

                    this.updateEncounter({ foe: encounter.title })
                })
                .finally(() => {
                    this.updateTitle()
                })
        } catch (err) {
            console.error(err)
        }
    }

    /**
     * 
     * @param {Object} [foe]
     */
    updateEncounter (foe = false) {
        Utils.setElementValue(this.$elements.foe, foe ? foe.foe : this.combat.timeline.shift().foe)
    }

    /**
     * 
     */
    updateTitle () {
        const
            title = this.combat.title.split(' '),
            difficulty = title.pop()

        if (/\([\w]*\)/.test(difficulty)) {
            Utils.setElementValue(this.$elements.encounter.title, title.join(' '))
            Utils.setElementValue(this.$elements.encounter.difficulty, difficulty)
        } else {
            Utils.setElementValue(this.$elements.encounter.title, this.combat.title)
            Utils.setElementValue(this.$elements.encounter.difficulty, '')
        }

        Utils.setElementValue(this.$elements.encounter.icon, `./public/images/icons/encounter-${Utils.slugify(this.combat.type)}.png`)
        Utils.setElementValue(this.$elements.encounter.image, this.combat.splash)

        Utils.setElementValue(this.$elements.summary.attempts, +window.sessionStorage.getItem(`shinchoku.${this.combat.slug}.attempts`) || 0)
        Utils.setElementValue(this.$elements.summary.best, window.sessionStorage.getItem(`shinchoku.${this.combat.slug}.best.timestamp`) || 'N/A')
    }

    /**
     * 
     * @param {Object} encounter 
     * @param {Object} combatants
     */
    async updateCombat (encounter, combatants) {
        Utils.setElementValue(this.$elements.combat.total, new Intl.NumberFormat().format(encounter['encdps']))
        Utils.setElementValue(this.$elements.combat.deaths, encounter.deaths)
        Utils.setElementValue(this.$elements.combat.time, encounter.duration)

        this.$elements.combat.meter.empty().append(($(Mustache.render(this.$elements.mustache, {
            items: Object.values(combatants).map((combatant) => {
                combatant.uuid = `combatant-${Utils.slugify(combatant.name)}`
                combatant.job = combatant.Job.length ? combatant.Job.toUpperCase() : Utils.in(combatant.name, '(') ? '-pet' : '-limit-break'

                return combatant
            }),
        }))).sort(this._sort)).slice(0, 8)
    }

    /**
     * 
     * @param {Object} encounter 
     */
    async unloadEncounter (encounter) {
        console.log(`Combat ends: ${encounter.title}`)

        this.combat.active = false

        const slug = this.encounters[this.combat.slug] ? this.combat.slug : `unknown-${Utils.generateUUID()}`

        window.sessionStorage.setItem(`shinchoku.${slug}.attempts`, (+window.sessionStorage.getItem(`shinchoku.${slug}.attempts`) || 0) + 1)

        if (+encounter.DURATION > (+window.sessionStorage.getItem(`shinchoku.${slug}.best`) || 0)) {
            window.sessionStorage.setItem(`shinchoku.${slug}.best`, +encounter.DURATION)
            window.sessionStorage.setItem(`shinchoku.${slug}.best.timestamp`, encounter.duration)
        }

        Utils.setElementValue(this.$elements.summary.attempts, window.sessionStorage.getItem(`shinchoku.${slug}.attempts`))
        Utils.setElementValue(this.$elements.summary.best, window.sessionStorage.getItem(`shinchoku.${slug}.best.timestamp`))
    }

    // Socket Events

    /**
     * Handles a CombatData event
     * @return {Boolean}
     */
    async _onCombatData ({ type: type, Encounter: encounter, Combatant: combatants, isActive: active }) {
        // Convert all types to Boolean
        active = String(active).toString().toLowerCase() == 'true'

        // Start new combat
        if (!this.combat.active && active) {
            // Load the script
            this.loadEncounter(encounter)
        }

        // Continuation of combat
        this.updateCombat(encounter, combatants)

        // End of combat
        if (active == false) this.unloadEncounter(encounter)

        return true
    }

    /**
     * Handles a Chat event
     * @return {Boolean}
     */
    async _onChat ({ type: type, line: line, rawLine: raw }) {
        if (this.combat.win && this.combat.win.test(raw)) {
            const slug = this.encounters[this.combat.slug] ? this.combat.slug : `unknown-${Utils.generateUUID()}`

            window.sessionStorage.setItem(`shinchoku.${slug}.best`, 9999)
            window.sessionStorage.setItem(`shinchoku.${slug}.best.timestamp`, 'Victory')
            Utils.setElementValue(this.$elements.summary.best, window.sessionStorage.getItem(`shinchoku.${slug}.best.timestamp`))

            console.log('Win detected')
        }

        if (!this.combat.timeline.length) return false
        if (this.combat.timeline[0].trigger.test(raw)) this.updateEncounter()

        return true
    }
}

new ShinchokuDashboard()