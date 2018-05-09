# College quizbowl calendar

This is the repository for [collegequizbowlcalendar.com](http://collegequizbowlcalendar.com/),
a static site coded in [Jekyll](https://jekyllrb.com/) that is intended to centralize information about the college quizbowl calendar.

## Contributing

Contributions are certainly welcome. Anyone with a GitHub account can easily submit issues or pull requests. Feel free to participate in community review on issues and pull requests.

The layout of the main calendar pages (which contains the large tables) is defined by `_layouts/year.html`.

Information about each set is stored in a separate YAML file in the `_data` folder. The following list of keys are supported:

Key | Description | Example
- | - | -
`name`        | Name of the set                      | `EFT 2017`
`slot`        | Name of the standard schedule slot   | `“Fall Medium 1”`
`prev`        | List of sets previously in this slot | `[EFT 2016, MFT, PADAWAN, IFT]`
`diff`        | Difficulty name                      | `Medium`
`diffstar`    | Difficulty rating                    | `●●`
`eligible`    | Eligibility details                  | `Closed`
`submission`  | Packet submission details            | `Required`
`announced`   | Date of global announcement          | `2017-03-23`
`announceurl` | URL of global announcement           | `http://hsquizbowl.org/forums/viewtopic.php?f=8&t=19786`
`firstonline` | Date of first online mirror          | `2017-09-16`
`firstmirror` | Date of first mirror                 | `2017-09-30`
`online`      | List of online mirrors               | `{ date: 2017-09-16, name: Online }`
`mirrors`     | List of mirrors                      | `{ date: 2017-09-30, region: Florida, name: New College }`
`clear`       | Date when the set is clear           | `2018-01-23`
`reallyclear` | Is the set confirmed to be clear     | `yes`
`packetsurl`  | URL to packets on archive            | `http://collegiate.quizbowlpackets.com/2048/`

The spec is likely to change. Watch this repository to keep tabs on any changes.
