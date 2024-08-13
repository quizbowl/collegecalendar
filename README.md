# College quizbowl calendar

This is the repository for [collegequizbowlcalendar.com](https://collegequizbowlcalendar.com/),
a static site coded in [Jekyll](https://jekyllrb.com/) that is intended to centralize information about the college quizbowl calendar.

## License

This project is licensed under the terms of the [GNU General Public License (GPL)](https://www.gnu.org/licenses/gpl-3.0.en.html).

## Contributing

Contributions are certainly welcome. Anyone with a GitHub account can easily submit issues or pull requests. Feel free to participate in community review on issues and pull requests. Ask for help if you need to.

Some guidelines: Non-trivial pull requests should be left open for at least 48 hours to allow for review. Please don’t forget to test your changes locally. Don’t blindly push upstream if you’re a contributor with commit permissions. Keep the code clean and the commit graph sane.

## Spec

The layout of the main calendar pages (which contains the large tables) is defined by `_layouts/year.html`.

The order of tournaments within each part of a year (e.g. Fall or Spring) is defined by <code>\_data/sets/_‹year›_/seasons.yaml</code>.

Information about each set is stored in a separate YAML file in the <code>\_data/sets/_‹year›_/</code> folder. The following list of keys are supported:

Key | Description | Example
-|-|-
`name`        | Name of the set                      | `EFT 2017`
`fullname`    | Full name of the set                 | `Early Fall Tournament 2017`
`slot`        | Name of the standard slot            | `“Fall Medium 1”`
`prev`        | List of sets previously in this slot | `[EFT 2016, MFT, PADAWAN, IFT]`
`producedby`  | Who is producing the set (not shown) | `ACF`
`diff`        | Difficulty name                      | `Medium`
`diffdots`    | Difficulty rating                    | `●●`
`diffd2`      | Difficulty name in Division II       | `Easy`
`diffdotsd2`  | Difficulty rating in Division II     | `●`
`eligible`    | Eligibility details                  | `Closed`
`submission`  | Packet submission details            | `Required`
`announced`   | Date of global announcement          | `2017-03-23`
`announceurl` | URL of global announcement           | `https://hsquizbowl.org/forums/viewtopic.php?f=8&t=19786`
`firstonline` | Date of first online mirror          | `2017-09-16`
`firstmirror` | Date of first mirror                 | `2017-09-30`
`speculative` | Indicates `firstmirror` is freeform  | `yes`
`firstideal`  | Date of first ideal mirror           | `2017-10-19`
`lastideal`   | Date of last ideal mirror            | `2017-10-26`
`mirrors`     | List of mirrors                      | `{ date: 2017-09-30, region: 1A, name: Yale,` <br /> `eligible: HS, cancelled: yes, url: "..." }`
`clear`       | Date when the set is clear           | `2018-01-23`
`reallyclear` | Is the set confirmed to be clear     | `yes`
`ebol`        | Is the set participating in EBOL     | `no`
`packetsurl`  | URL to packets on archive            | `https://collegiate.quizbowlpackets.com/2048/`

Dates may be `TBD`. If `speculative` is non-empty, the value for `firstmirror` will be interpreted as freeform text instead of a date, allowing for provisional detail when the date is not exactly known (e.g. `"late February"`, `"either 2/3 or 2/4"`, `"likely 11/20"`).

In general, blank values are used when reliable information does not yet exist. The value for `clear` can be a future date if it is strongly assumed, but should later be changed to match the actual date when the set became clear.

Information about the geographic regions is stored in `map/regions.js`. The two-letter region IDs are also defined by `_layouts/year.html`, but this duplication will eventually be removed.
For convenience, the regions are listed below:

ID | Region
-- | --
0P | Online playtest
0L | Online
1A | New England
1B | New York
2A | N. Mid-Atlantic
2B | S. Mid-Atlantic
3A | Upper South
3B | Deep South
3C | Florida
4A | Texas/Louisiana
4B | Southwest
5A | S. California
5B | N. California
6A | Pacific Northwest
6B | Rocky Mountains
7A | Great Plains
7B | Missouri
8A | Upper Midwest
8B | Central Midwest
8C | Eastern Midwest
CA | Canada
UK | UK
AS | Asia

Mirrors should generally be ordered in the source file canonically by date (weekend) and then by region, with playtest mirrors first and HS mirrors at the end, unless there is a good reason to order them in another manner.

Mirror names (i.e. college or school names) should generally remain consistent with existing convention in this repository. A guiding principle for mirror names is to be short enough to not wrap onto two lines when displayed in the main table, but not be overly abbreviated.

Information about the colleges on the circuit map is stored in `map/colleges.tsv`.

The spec is likely to change. Watch this repository to keep tabs on any changes.
