#!/usr/bin/python

"""
Outputs a sorted dictionary of Timezones parsed from Wikipedia's timezone
database. It's designed for JavaScript/HTML usage, populating a `datalist`
with currently active Timezones.

Run the script, then copy-and-paste the output.

```bash
# Linux using xsel, Windows would use clipboard.exe (or something...)
python ./parse_tz_database.py | xsel -i -b
```

```javascript
const timezoneInfo = /* the output */;
```
"""

from __future__ import annotations

import dataclasses
import pprint
import sys
from typing import TYPE_CHECKING, TypedDict

import bs4
import requests

if TYPE_CHECKING:
    from builtins import list as List
    from typing import Optional

URL = "https://en.wikipedia.org/wiki/List_of_tz_database_time_zones"


@dataclasses.dataclass
class TimezoneInfo:
    country_code: str
    identifier: str
    comments: str
    type: str
    utc_offset_sdt: str
    utc_offset_dst: str
    tz_abbrev_sdt: str
    tz_abbrev_dst: str
    source_file: str
    notes: str


class TimezoneOption(TypedDict):
    label: str
    value: str


def get_wikipedia_html() -> Optional[str]:
    if (response := requests.get(URL)).status_code != 200:
        return None

    return response.text


def normalize_string(entry: str) -> str:
    return entry.strip().replace("\u2009", "").replace("\u2212", "-")


def convert_row_to_obj(text: str) -> TimezoneInfo:
    # Country | Identifier | Comments | Type | UTC Offset | Abbreviation | Source File | Notes
    # --------|------------|----------|------|-SDT-|-DST--|-SDT--|-DST---|-------------|------
    # 0       | 1          | 2        | 3    | 4   | 5    | 6    | 7     | 8           | 9

    columns = [normalize_string(s) for s in text.split("\n\n")]

    if len(columns) == 8:
        columns.insert(5, "")
        columns.insert(7, "")
    elif len(columns) == 9:
        if (first_char := columns[5][0]) == "+" or first_char == "-":
            columns.insert(7, "")
        else:
            columns.insert(5, "")
    else:
        pass

    assert len(columns) == 10, len(columns)
    return TimezoneInfo(*columns)


def main() -> int:
    html_doc = get_wikipedia_html()
    soup = bs4.BeautifulSoup(html_doc, "html.parser")

    # before js executes, the first two rows in the table are the column names
    rows = soup.select_one("table > tbody").findChildren("tr")[2:]

    options: List[TimezoneOption] = []

    for row in rows:
        tz = convert_row_to_obj(row.text)
        label = "(GMT{}) {}".format(tz.utc_offset_sdt, tz.identifier)
        option = TimezoneOption(label=label, value=tz.identifier)
        options.append(option)

    sorted_options = sorted(options, key=lambda k: k["label"])
    pprint.pprint(sorted_options)

    return 0


if __name__ == "__main__":
    sys.exit(main())
