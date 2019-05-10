import csv
import re

'''
Scrapes the titles to identify which artists played and are connected to who
'''

def getArtists(title):
    artists = []
    feats = re.search('(feat\.?|ft\.?) ([^\(\)\-\n]+)', title)
    prods = re.search('[Pp]rod(\.|uced)?( [Bb]y\.?)? ([^\)\]\-\n]+)', title)
    main = re.search('(^[^-]+)', title)

    def splitArtistString(str):
        return re.split('(?:(?:ft|feat)\.| [xX\+&] |, &|,|and)' ,str)

    def standardizeArtist(str):
        s = str.lower()
        if s == "joji": return "Joji"
        elif s == "rich brian": return "Rich Brian"
        elif s == "higher brothers" or s == "higher brothers over the wall": return "Higher Brothers"
        elif s == "ronnyjlistenup": return "RONNYJ"
        elif s == "yaeji": return "Yaeji"
        elif s == "j mag": return "J. MAG"
        elif s == "lexie": return "Lexie Liu"
        else: return str

    if feats: artists += splitArtistString(feats.group(2))
    if prods: artists += splitArtistString(prods.group(3))
    if main: artists += splitArtistString(main.group(0))

    artists = list(map(lambda x: standardizeArtist(x.strip()), artists))

    return list(set(artists))

with open('video_statistics.csv') as csvfile:
    rows = csv.DictReader(csvfile)

    artists = []
    views = []
    count = []

    for row in rows:
        for artist in getArtists(row["displayTitle"]):
            if artist in artists:
                views[artists.index(artist)] += int(row["views"])
                count[artists.index(artist)] += 1
            else:
                artists.append(artist)
                views.append(int(row["views"]))
                count.append(1)

    # Create adjacency matrix

    # Create bar chart of each artist views
    f = open('artist_statistics.csv', "w+")
    av = sorted(list(zip(artists, views, count)), key=lambda x: x[1], reverse=True)
    f.write("artist,views,num_videos,avg_views\n")
    for data in av:
        f.write(data[0] + "," + str(data[1]) + "," + str(data[2]) + "," + str(data[1] / data[2]) + "\n")

    f.close()
