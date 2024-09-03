import OpenAIService from "@/services/openai.service";
import TimelineVisualizer from "./timeline";

export default async function SearchPage({ searchParams }: { searchParams: { query: string } }) {
    const { query } = searchParams;
    const timeline = await OpenAIService.generate(query);
    // const timeline = {
    //     "title": "Timeline of Mushroom History",
    //     "description": "This timeline provides an overview of significant events in the history of mushrooms, from their discovery and use in ancient cultures to their application in modern science and cuisine.",
    //     "markers": [
    //         {
    //             "time": "c. 30,000 BCE",
    //             "title": "Earliest Evidence of Mushroom Use",
    //             "preview": "Prehistoric humans are believed to have consumed mushrooms for nutrition.",
    //             "details": "Evidence of mushrooms as a food source dates back to around 30,000 BCE, highlighted by ancient paintings and artifacts that suggest early human communities recognized fungi for their nutritional value. Archaeological findings indicate that various mushroom species were foraged and consumed, potentially as part of hunting and gathering diets.",
    //             "medias": []
    //         },
    //         {
    //             "time": "c. 2000 BCE",
    //             "title": "Mushrooms in Ancient Egypt",
    //             "preview": "Mushrooms were revered by pharaohs and featured in ancient Egyptian cuisine.",
    //             "details": "In ancient Egypt, mushrooms were considered a delicacy and were associated with immortality, leading to their frequent use in royal feasts. Pharaohs believed that the consumption of mushrooms would grant them everlasting life, leading to strict regulations regarding their harvest and consumption.",
    //             "medias": [
    //                 {
    //                     "title": "2014-02-26 Ganoderma lingzhi Sheng H. Wu, Y. Cao & Y.C. Dai 574882.jpg",
    //                     "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/2014-02-26_Ganoderma_lingzhi_Sheng_H._Wu%2C_Y._Cao_%26_Y.C._Dai_574882.jpg/796px-2014-02-26_Ganoderma_lingzhi_Sheng_H._Wu%2C_Y._Cao_%26_Y.C._Dai_574882.jpg",
    //                     "width": 796,
    //                     "height": 599,
    //                     "pageTitle": "Mushroom"
    //                 }
    //             ]
    //         },
    //         {
    //             "time": "c. 500 BCE",
    //             "title": "Mushrooms in Ancient Greece",
    //             "preview": "The Greeks began classifying mushrooms and using them in dietary practices.",
    //             "details": "The ancient Greeks valued mushrooms for their culinary properties and began to classify them based on their characteristics. Hippocrates and other physicians documented the health benefits of various fungi, setting the foundation for future studies on their medicinal properties.",
    //             "medias": [
    //                 {
    //                     "title": "Amanita muscaria (fly agaric).JPG",
    //                     "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Amanita_muscaria_%28fly_agaric%29.JPG/407px-Amanita_muscaria_%28fly_agaric%29.JPG",
    //                     "width": 407,
    //                     "height": 599,
    //                     "pageTitle": "Mushroom"
    //                 },
    //                 {
    //                     "title": "Amanita phalloides young.jpg",
    //                     "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Amanita_phalloides_young.jpg/800px-Amanita_phalloides_young.jpg",
    //                     "width": 800,
    //                     "height": 600,
    //                     "pageTitle": "Mushroom"
    //                 },
    //                 {
    //                     "title": "ChampignonMushroom.jpg",
    //                     "url": "https://upload.wikimedia.org/wikipedia/commons/0/01/ChampignonMushroom.jpg",
    //                     "width": 800,
    //                     "height": 570,
    //                     "pageTitle": "Mushroom"
    //                 },
    //                 {
    //                     "title": "Close-up cross section of mushroom.jpg",
    //                     "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Close-up_cross_section_of_mushroom.jpg/800px-Close-up_cross_section_of_mushroom.jpg",
    //                     "width": 800,
    //                     "height": 590,
    //                     "pageTitle": "Mushroom"
    //                 },
    //                 {
    //                     "title": "Mixed mushrooms.jpg",
    //                     "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Mixed_mushrooms.jpg/800px-Mixed_mushrooms.jpg",
    //                     "width": 800,
    //                     "height": 600,
    //                     "pageTitle": "Mushroom"
    //                 }
    //             ]
    //         },
    //         {
    //             "time": "c. 200 CE",
    //             "title": "Mushrooms in Traditional Chinese Medicine",
    //             "preview": "Mushrooms were incorporated into Chinese medicine for their health benefits.",
    //             "details": "Chinese herbalists began using mushrooms in various medicinal concoctions as early as 200 CE. Traditional Chinese Medicine recognized the adaptogenic qualities of certain fungi, such as reishi and cordyceps, which were believed to improve overall vitality and combat illness.",
    //             "medias": [
    //                 {
    //                     "title": "Pleurotus eryngii - Doğal Ortamında Çaşır Mantarı.jpg",
    //                     "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Pleurotus_eryngii_-_Do%C4%9Fal_Ortam%C4%B1nda_%C3%87a%C5%9F%C4%B1r_Mantar%C4%B1.jpg/800px-Pleurotus_eryngii_-_Do%C4%9Fal_Ortam%C4%B1nda_%C3%87a%C5%9F%C4%B1r_Mantar%C4%B1.jpg",
    //                     "width": 800,
    //                     "height": 533,
    //                     "pageTitle": "Mushroom"
    //                 },
    //                 {
    //                     "title": "Fungi collage.jpg",
    //                     "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Fungi_collage.jpg/689px-Fungi_collage.jpg",
    //                     "width": 689,
    //                     "height": 600,
    //                     "pageTitle": "Fungus"
    //                 },
    //                 {
    //                     "title": "Ganoderma lucidum 01.jpg",
    //                     "url": "https://upload.wikimedia.org/wikipedia/commons/8/81/Ganoderma_lucidum_01.jpg",
    //                     "width": 800,
    //                     "height": 600,
    //                     "pageTitle": "Fungus"
    //                 },
    //                 {
    //                     "title": "Shiitake growing s.jpg",
    //                     "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shiitake_growing_s.jpg/481px-Shiitake_growing_s.jpg",
    //                     "width": 481,
    //                     "height": 600,
    //                     "pageTitle": "Fungiculture"
    //                 }
    //             ]
    //         },
    //         {
    //             "time": "c. 1600",
    //             "title": "Mushrooms in Renaissance Europe",
    //             "preview": "The Renaissance marked increased interest in the classification and cultivation of mushrooms.",
    //             "details": "During the Renaissance, European botanists and mycologists like Carolus Linnaeus began classifying mushrooms more scientifically. This period saw the cultivation of edible mushroom varieties, including the development of mushroom farms in France, enhancing culinary practices throughout Europe.",
    //             "medias": [
    //                 {
    //                     "title": "2016-01 Agaricus bisporus 01.jpg",
    //                     "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/2016-01_Agaricus_bisporus_01.jpg/800px-2016-01_Agaricus_bisporus_01.jpg",
    //                     "width": 800,
    //                     "height": 533,
    //                     "pageTitle": "Mushroom"
    //                 },
    //                 {
    //                     "title": "Amanita muscaria (fly agaric).JPG",
    //                     "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Amanita_muscaria_%28fly_agaric%29.JPG/407px-Amanita_muscaria_%28fly_agaric%29.JPG",
    //                     "width": 407,
    //                     "height": 599,
    //                     "pageTitle": "Mushroom"
    //                 },
    //                 {
    //                     "title": "ChampignonMushroom.jpg",
    //                     "url": "https://upload.wikimedia.org/wikipedia/commons/0/01/ChampignonMushroom.jpg",
    //                     "width": 800,
    //                     "height": 570,
    //                     "pageTitle": "Mushroom"
    //                 },
    //                 {
    //                     "title": "Fomes fomentarius.jpg",
    //                     "url": "https://upload.wikimedia.org/wikipedia/commons/5/5f/Fomes_fomentarius.jpg",
    //                     "width": 800,
    //                     "height": 600,
    //                     "pageTitle": "Mushroom"
    //                 },
    //                 {
    //                     "title": "Stuffed portabella mushrooms, June 2009.jpg",
    //                     "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Stuffed_portabella_mushrooms%2C_June_2009.jpg/800px-Stuffed_portabella_mushrooms%2C_June_2009.jpg",
    //                     "width": 800,
    //                     "height": 600,
    //                     "pageTitle": "Edible mushroom"
    //                 }
    //             ]
    //         },
    //         {
    //             "time": "1897",
    //             "title": "Agaricus bisporus Cultivation",
    //             "preview": "Widespread cultivation of the common mushroom revolutionizes the market.",
    //             "details": "In 1897, the cultivation of the common mushroom, Agaricus bisporus, was first commercialized in Europe. This led to the establishment of mushroom farms, making mushrooms more accessible to the public and laying the groundwork for mushroom farming as a significant agricultural industry.",
    //             "medias": [
    //                 {
    //                     "title": "Growing oyster mushrooms - timelapse.webm",
    //                     "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Growing_oyster_mushrooms_-_timelapse.webm/800px--Growing_oyster_mushrooms_-_timelapse.webm.jpg",
    //                     "width": 800,
    //                     "height": 450,
    //                     "pageTitle": "Mushroom"
    //                 },
    //                 {
    //                     "title": "White fungus in wood chips.jpg",
    //                     "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/White_fungus_in_wood_chips.jpg/800px-White_fungus_in_wood_chips.jpg",
    //                     "width": 800,
    //                     "height": 600,
    //                     "pageTitle": "Fungus"
    //                 },
    //                 {
    //                     "title": "Harvestingoystermushroomcultivatedinbaggedsawdustmixture.jpg",
    //                     "url": "https://upload.wikimedia.org/wikipedia/commons/0/09/Harvestingoystermushroomcultivatedinbaggedsawdustmixture.jpg",
    //                     "width": 728,
    //                     "height": 517,
    //                     "pageTitle": "Fungiculture"
    //                 },
    //                 {
    //                     "title": "Foodlogo2.svg",
    //                     "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Foodlogo2.svg/146px-Foodlogo2.svg.png",
    //                     "width": 146,
    //                     "height": 106,
    //                     "pageTitle": "Edible mushroom"
    //                 }
    //             ]
    //         },
    //         {
    //             "time": "1930s",
    //             "title": "Discovery of Psilocybin Mushrooms",
    //             "preview": "The psychedelic properties of psilocybin mushrooms gained attention.",
    //             "details": "In the 1930s, scientists began isolating and studying the psychedelic compound psilocybin, found in certain mushroom species. This discovery prompted a wave of research into the potential therapeutic uses of psychedelics, influencing both psychology and contemporary psychedelic culture.",
    //             "medias": [
    //                 {
    //                     "title": "Pschoactive Psilocybe distribution.png",
    //                     "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Pschoactive_Psilocybe_distribution.png/800px-Pschoactive_Psilocybe_distribution.png",
    //                     "width": 800,
    //                     "height": 396,
    //                     "pageTitle": "Mushroom"
    //                 },
    //                 {
    //                     "title": "Psilocybe.zapotecorum.1.jpg",
    //                     "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Psilocybe.zapotecorum.1.jpg/800px-Psilocybe.zapotecorum.1.jpg",
    //                     "width": 800,
    //                     "height": 600,
    //                     "pageTitle": "Mushroom"
    //                 },
    //                 {
    //                     "title": "Cubensis shrooms.jpg",
    //                     "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Cubensis_shrooms.jpg/800px-Cubensis_shrooms.jpg",
    //                     "width": 800,
    //                     "height": 451,
    //                     "pageTitle": "Psilocybin mushroom"
    //                 },
    //                 {
    //                     "title": "HarmCausedByDrugsTable.svg",
    //                     "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/HarmCausedByDrugsTable.svg/776px-HarmCausedByDrugsTable.svg.png",
    //                     "width": 776,
    //                     "height": 600,
    //                     "pageTitle": "Psilocybin mushroom"
    //                 }
    //             ]
    //         },
    //         {
    //             "time": "1957",
    //             "title": "The ‘Magic Mushroom’ Article",
    //             "preview": "Life magazine features an article introducing magic mushrooms to the American public.",
    //             "details": "In 1957, Life magazine published an article that revealed the existence of ‘magic mushrooms’ and their psychoactive effects. This sparked public interest and academic curiosity about these fungi, leading to increased popularity in the counterculture of the 1960s.",
    //             "medias": []
    //         },
    //         {
    //             "time": "1976",
    //             "title": "The First Psilocybin Study",
    //             "preview": "Johns Hopkins conducts one of the first rigorous studies on psilocybin mushrooms.",
    //             "details": "Johns Hopkins University launched a groundbreaking study in 1976 that explored the effects of psilocybin on human subjects. This pioneering research laid the foundation for further scientific investigation into the therapeutic applications of psilocybin, including its effects on depression and anxiety.",
    //             "medias": [
    //                 {
    //                     "title": "Mixed mushrooms.jpg",
    //                     "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Mixed_mushrooms.jpg/800px-Mixed_mushrooms.jpg",
    //                     "width": 800,
    //                     "height": 600,
    //                     "pageTitle": "Mushroom"
    //                 },
    //                 {
    //                     "title": "Fungi collage.jpg",
    //                     "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Fungi_collage.jpg/689px-Fungi_collage.jpg",
    //                     "width": 689,
    //                     "height": 600,
    //                     "pageTitle": "Fungus"
    //                 },
    //                 {
    //                     "title": "Eco Fair 2019 Mushrooms.jpg",
    //                     "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Eco_Fair_2019_Mushrooms.jpg/800px-Eco_Fair_2019_Mushrooms.jpg",
    //                     "width": 800,
    //                     "height": 600,
    //                     "pageTitle": "Fungiculture"
    //                 },
    //                 {
    //                     "title": "Common white mushrooms in various phases of cooking.jpg",
    //                     "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Common_white_mushrooms_in_various_phases_of_cooking.jpg/605px-Common_white_mushrooms_in_various_phases_of_cooking.jpg",
    //                     "width": 605,
    //                     "height": 600,
    //                     "pageTitle": "Edible mushroom"
    //                 },
    //                 {
    //                     "title": "Dried mushrooms.jpg",
    //                     "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Dried_mushrooms.jpg/800px-Dried_mushrooms.jpg",
    //                     "width": 800,
    //                     "height": 415,
    //                     "pageTitle": "Edible mushroom"
    //                 }
    //             ]
    //         },
    //         {
    //             "time": "1990s",
    //             "title": "Mushroom Cultivation Boom",
    //             "preview": "Advancements in cultivation techniques lead to a boom in mushroom farming.",
    //             "details": "The 1990s saw a significant increase in mushroom cultivation due to advancements in agricultural techniques and technology. This boom enabled the mass production of various edible mushrooms, making them a staple in many diets around the world and contributing to economic growth in agriculture.",
    //             "medias": [
    //                 {
    //                     "title": "Fomes fomentarius.jpg",
    //                     "url": "https://upload.wikimedia.org/wikipedia/commons/5/5f/Fomes_fomentarius.jpg",
    //                     "width": 800,
    //                     "height": 600,
    //                     "pageTitle": "Mushroom"
    //                 },
    //                 {
    //                     "title": "Fungi collage.jpg",
    //                     "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Fungi_collage.jpg/689px-Fungi_collage.jpg",
    //                     "width": 689,
    //                     "height": 600,
    //                     "pageTitle": "Fungus"
    //                 },
    //                 {
    //                     "title": "Cultivo tradicional de shiitake en Pradejón.jpg",
    //                     "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Cultivo_tradicional_de_shiitake_en_Pradej%C3%B3n.jpg/800px-Cultivo_tradicional_de_shiitake_en_Pradej%C3%B3n.jpg",
    //                     "width": 800,
    //                     "height": 534,
    //                     "pageTitle": "Fungiculture"
    //                 },
    //                 {
    //                     "title": "Harvestingoystermushroomcultivatedinbaggedsawdustmixture.jpg",
    //                     "url": "https://upload.wikimedia.org/wikipedia/commons/0/09/Harvestingoystermushroomcultivatedinbaggedsawdustmixture.jpg",
    //                     "width": 728,
    //                     "height": 517,
    //                     "pageTitle": "Fungiculture"
    //                 },
    //                 {
    //                     "title": "Edible fungi in basket 2009 G1 (cropped).jpg",
    //                     "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Edible_fungi_in_basket_2009_G1_%28cropped%29.jpg/800px-Edible_fungi_in_basket_2009_G1_%28cropped%29.jpg",
    //                     "width": 800,
    //                     "height": 423,
    //                     "pageTitle": "Edible mushroom"
    //                 }
    //             ]
    //         },
    //         {
    //             "time": "2000s",
    //             "title": "Emphasis on Sustainable Foraging",
    //             "preview": "Sustainable harvesting practices for wild mushrooms gain recognition.",
    //             "details": "In the 2000s, there was a growing awareness of the importance of sustainable foraging practices for wild mushrooms. Organizations began promoting ethical wildcrafting methods to preserve local ecosystems and ensure that mushroom populations remain healthy and viable for future generations.",
    //             "medias": []
    //         },
    //         {
    //             "time": "2015",
    //             "title": "Medicinal Mushroom Research",
    //             "preview": "Research into the health benefits of medicinal mushrooms surges.",
    //             "details": "The mid-2010s marked a resurgence in scientific research focused on the health benefits of medicinal mushrooms, such as lion's mane, reishi, and chaga. Studies began to explore their potential effects on cognitive health, immune support, and anti-inflammatory properties, highlighting mushrooms' significance in holistic health.",
    //             "medias": [
    //                 {
    //                     "title": "Common white mushrooms in various phases of cooking.jpg",
    //                     "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Common_white_mushrooms_in_various_phases_of_cooking.jpg/605px-Common_white_mushrooms_in_various_phases_of_cooking.jpg",
    //                     "width": 605,
    //                     "height": 600,
    //                     "pageTitle": "Edible mushroom"
    //                 }
    //             ]
    //         },
    //         {
    //             "time": "2021",
    //             "title": "Psychedelic Therapy Expansion",
    //             "preview": "Psychedelic-assisted therapies gain legitimacy in clinical settings.",
    //             "details": "By 2021, psychedelic therapy, particularly using psilocybin mushrooms, began gaining traction in mental healthcare. Clinical trials demonstrated significant benefits for patients with depression, anxiety, and PTSD, prompting discussions about legalizing and regulating psychedelic substances for therapeutic use.",
    //             "medias": [
    //                 {
    //                     "title": "Psilocybe allenii Oakland.jpg",
    //                     "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Psilocybe_allenii_Oakland.jpg/755px-Psilocybe_allenii_Oakland.jpg",
    //                     "width": 755,
    //                     "height": 600,
    //                     "pageTitle": "Psilocybin mushroom"
    //                 },
    //                 {
    //                     "title": "Psilocybe mexicana Veracruz.jpg",
    //                     "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Psilocybe_mexicana_Veracruz.jpg/800px-Psilocybe_mexicana_Veracruz.jpg",
    //                     "width": 800,
    //                     "height": 532,
    //                     "pageTitle": "Psilocybin mushroom"
    //                 },
    //                 {
    //                     "title": "Psilocybe semilanceata 6514.jpg",
    //                     "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Psilocybe_semilanceata_6514.jpg/600px-Psilocybe_semilanceata_6514.jpg",
    //                     "width": 600,
    //                     "height": 600,
    //                     "pageTitle": "Psilocybin mushroom"
    //                 },
    //                 {
    //                     "title": "Flag of Japan.svg",
    //                     "url": "https://upload.wikimedia.org/wikipedia/en/thumb/9/9e/Flag_of_Japan.svg/800px-Flag_of_Japan.svg.png",
    //                     "width": 800,
    //                     "height": 533,
    //                     "pageTitle": "Edible mushroom"
    //                 }
    //             ]
    //         },
    //         {
    //             "time": "2023",
    //             "title": "World Health Organization Examines Fungi",
    //             "preview": "WHO includes fungi in upcoming global health strategy discussions.",
    //             "details": "In 2023, the World Health Organization recognized the importance of fungi, including mushrooms, in global health and biodiversity discussions. This acknowledgment has paved the way for initiatives that aim to explore the ecological and health benefits of fungi, striving for increased awareness and research funding.",
    //             "medias": [
    //                 {
    //                     "title": "Amanita stirps Hemibapha 45069.jpg",
    //                     "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Amanita_stirps_Hemibapha_45069.jpg/755px-Amanita_stirps_Hemibapha_45069.jpg",
    //                     "width": 755,
    //                     "height": 600,
    //                     "pageTitle": "Mushroom"
    //                 },
    //                 {
    //                     "title": "Amanita phalloides 1.JPG",
    //                     "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Amanita_phalloides_1.JPG/450px-Amanita_phalloides_1.JPG",
    //                     "width": 450,
    //                     "height": 600,
    //                     "pageTitle": "Fungus"
    //                 },
    //                 {
    //                     "title": "Puffball Mushrooms On Sale.jpg",
    //                     "url": "https://upload.wikimedia.org/wikipedia/en/thumb/6/6e/Puffball_Mushrooms_On_Sale.jpg/800px-Puffball_Mushrooms_On_Sale.jpg",
    //                     "width": 800,
    //                     "height": 600,
    //                     "pageTitle": "Edible mushroom"
    //                 },
    //                 {
    //                     "title": "Flag of the People's Republic of China.svg",
    //                     "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Flag_of_the_People%27s_Republic_of_China.svg/800px-Flag_of_the_People%27s_Republic_of_China.svg.png",
    //                     "width": 800,
    //                     "height": 533,
    //                     "pageTitle": "Edible mushroom"
    //                 }
    //             ]
    //         }
    //     ],
    //     "related_wikis_pages": [
    //         "Mushroom",
    //         "Medicinal Mushroom",
    //         "Mycology",
    //         "Psychedelic Mushrooms",
    //         "Fungi",
    //         "Mushroom Cultivation",
    //         "Edible Mushrooms"
    //     ]
    // }
    return <TimelineVisualizer initTimeline={timeline} />;
}