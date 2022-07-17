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
`name`             | Name of the set                           | `EFT 2017`
`fullname`         | Full name of the set                      | `Early Fall Tournament 2017`
`slot`             | Name of the standard slot                 | `“Fall Medium 1”`
`prev`             | List of sets previously in this slot      | `[EFT 2016, MFT, PADAWAN, IFT]`
`production_team`  | Organization or club(s) producing the set |  `ACF`
`diff`             | Difficulty name                           | `Medium`
`diffdots`         | Difficulty rating                         | `●●`
`diffd2`           | Difficulty name in Division II            | `Easy`
`diffdotsd2`       | Difficulty rating in Division II          | `●`
`eligible`         | Eligibility details                       | `Closed`
`submission`       | Packet submission details                 | `Required`
`announced`        | Date of global announcement               | `2017-03-23`
`announceurl`      | URL of global announcement                | `https://hsquizbowl.org/forums/viewtopic.php?f=8&t=19786`
`speculative_date` | Is the first mirror date confirmed        |  `Yes`
`firstonline`      | Date of first online mirror               | `2017-09-16`
`firstmirror`      | Date of first mirror                      | `2017-09-30`
`firstideal`       | Date of first ideal mirror                | `2017-10-19`
`lastideal`        | Date of last ideal mirror                 | `2017-10-26`
`mirrors`          | List of mirrors                           | `{ date: 2017-09-30, region: 1A, name: Yale,` <br /> `eligible: HS, cancelled: yes, url: "..." }`
`clear`            | Date when the set is clear                | `2018-01-23`
`reallyclear`      | Is the set confirmed to be clear          | `yes`
`ebol`             | Is the set participating in EBOL          | `no`
`packetsurl`       | URL to packets on archive                 | `https://collegiate.quizbowlpackets.com/2048/`

Dates may be `TBD`. If `speculative_date` is used (i.e. is non-empty), the value for `firstmirror` will not be converted to a date and instead will be added to the `First mirror` cell as text, allowing for more detail when the date is not exactly known (ex: "either 2/3 or 2/4", "likely 11/20").

Information about the geographic regions is stored in `map/regions.js`. The two-letter region IDs are also defined by `_layouts/year.html`, but this duplication will eventually be removed.

Information about the colleges on the circuit map is stored in `map/colleges.tsv`.

The spec is likely to change. Watch this repository to keep tabs on any changes.
