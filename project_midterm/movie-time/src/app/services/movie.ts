import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Movie } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private movies: Movie[] = [
    {
      id: 1,
      title: 'Inception',
      description: 'A thief who steals corporate secrets through dream-sharing technology.',
      year: 2010,
      director: 'Christopher Nolan',
      rating: 8.8,
      trailer: 'https://www.youtube.com/embed/YoHD9XEInc0',
      category: 'netflix',
      image: 'https://i.pinimg.com/1200x/b0/ae/a4/b0aea49646879a043ad9f6ec3002e99f.jpg'
    },
    {
      id: 2,
     title: 'Demon Slayer: Kimetsu no Yaiba - To the Hashira Training (2025)',
  description: 'Tanjiro and his friends continue their path as demon slayers, undergoing harsh training under the Hashira — the strongest members of the Demon Slayer Corps. Epic animation and emotional battles await.',
  year: 2025,
  director: 'Haruo Sotozaki',
  rating: 8.9,
  trailer: 'https://www.youtube.com/embed/VQGCKyvzIM4',
  category: 'anime',
  image: 'https://i.pinimg.com/736x/39/9b/83/399b83aa72375e3e8aad65b57656f646.jpg'
},
    {
      id: 3,
      title: 'My Neighbor Totoro',
      description: 'When two girls move to the country to be near their ailing mother, they have adventures with the wondrous forest spirits who live nearby.',
      year: 1988,
      director: 'Hayao Miyazaki',
      rating: 8.2,
      trailer: 'https://www.youtube.com/embed/92a7Hj0ijLs',
      category: 'anime',
      image: 'https://i.pinimg.com/736x/d1/2c/ad/d12cadc3f62500594821be0278aef5a8.jpg'
    },
     {
      id: 4,
      title: 'Your Name',
      description: 'Two strangers find themselves linked in a bizarre way. When a connection forms, will distance be the only thing to keep them apart?',
      year: 2016,
      director: 'Makoto Shinkai',
      rating: 8.2,
      trailer: 'https://www.youtube.com/embed/xU47nhruN-Q',
      category: 'anime',
      image: 'https://i.pinimg.com/1200x/f4/29/4b/f4294bf1a9fe8aaff7902c5c4d1872d3.jpg'},
    {
      id: 5,
      title: 'Spirited Away',
      description: 'During her family\'s move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits.',
      year: 2001,
      director: 'Hayao Miyazaki',
      rating: 8.6,
      trailer: 'https://www.youtube.com/embed/ByXuk9QqQkk',
      category: 'anime',
      image: 'https://i.pinimg.com/1200x/16/8e/9f/168e9fba9f9e89d1fed1945b4b6c494e.jpg'
    }
    ,
     {
       id: 6,
  title: 'Your Lie in April',
  description: 'A touching story about a young pianist, Kousei, who loses his ability to hear the sound of the piano after his mother’s death. His life changes when he meets a spirited violinist named Kaori.',
  year: 2014,
  director: 'Kyohei Ishiguro',
  rating: 8.7,
  trailer: 'https://www.youtube.com/embed/3aL0gDZtFbE',
  category: 'anime',
  image: 'https://i.pinimg.com/1200x/45/e5/3c/45e53c9b5224f5a650f23d257ae75320.jpg'
},
{
  id:7,
  title: 'A Silent Voice',
  description: 'A story about a boy who bullied a deaf girl in elementary school and later seeks redemption and forgiveness. A powerful drama about pain, regret, and hope.',
  year: 2016,
  director: 'Naoko Yamada',
  rating: 8.9,
  trailer: 'https://www.youtube.com/embed/nfK6UgLra7g',
  category: 'anime',
  image: 'https://i.pinimg.com/1200x/5a/cc/4f/5acc4fba56226d361289cc72892a80c3.jpg'
},
{
  id: 8,
  title: 'Spring ride',
  description: 'A coming-of-age story about friendship, growth, and the struggle to find one’s true self. The characters navigate the joys and pains of youth while chasing their dreams.',
  year: 2023,
  director: 'Makoto Shinkai',
  rating: 8.2,
  trailer: 'https://www.youtube.com/embed/dQw4w9WgXcQ', 
  category: 'anime',
  image: 'https://i.pinimg.com/736x/47/b8/51/47b851f14460c610949271b8ee2f1166.jpg'
},
{
  id: 9,
  title: 'I Want to Eat Your Pancreas',
  description: 'A quiet and reserved boy discovers that his classmate is terminally ill. Together, they spend her final days finding meaning and beauty in every moment.',
  year: 2018,
  director: 'Shinichiro Ushijima',
  rating: 8.6,
  trailer: 'https://www.youtube.com/embed/Mo2_E3cOq7I',
  category: 'anime',
  image: 'https://i.pinimg.com/1200x/ad/74/ff/ad74ffd0e0b2e4115edfe88e08421c92.jpg'
},
{
  id: 10,
  title: 'The Promised Neverland',
  description: 'A group of children living happily in an orphanage discover a dark secret about their fate. They must plan a daring escape to survive.',
  year: 2019,
  director: 'Mamoru Kanbe',
  rating: 8.7,
  trailer: 'https://www.youtube.com/embed/3dS2YKD9Z40',
  category: 'anime',
  image: 'https://i.pinimg.com/736x/13/a9/6b/13a96b03c3e1d60bb526fe4de5c8a16b.jpg'
},
{
  id: 11,
  title: 'JoJo’s Bizarre Adventure',
  description: 'A multi-generational saga following the Joestar family as they battle supernatural enemies. Known for its flamboyant style, creative battles, and iconic poses.',
  year: 2012,
  director: 'Naokatsu Tsuda',
  rating: 8.8,
  trailer: 'https://www.youtube.com/embed/fDBwGk7mXqg',
  category: 'anime',
  image: 'https://i.pinimg.com/1200x/db/c1/30/dbc1305dabb2ff1a76a25096266c58ab.jpg'
},
{
  id: 12,
  title: 'Ratatouille',
  description: 'A heartwarming story about Remy, a rat who dreams of becoming a chef in Paris. With passion and creativity, he proves that anyone can cook, no matter where they come from.',
  year: 2007,
  director: 'Brad Bird',
  rating: 8.0,
  trailer: 'https://www.youtube.com/embed/NgsQ8mVkN8w',
  category: 'disney',
  image: 'https://i.pinimg.com/1200x/1e/e6/c8/1ee6c8ee7e14fffe3dfb9f6c152e0855.jpg'
},
{
  id: 13,
  title: 'Turning Red',
  description: 'Mei Lee, a 13-year-old girl torn between being her mother’s obedient daughter and the chaos of adolescence, suddenly transforms into a giant red panda whenever she gets too excited.',
  year: 2022,
  director: 'Domee Shi',
  rating: 7.0,
  trailer: 'https://www.youtube.com/embed/XdKzUbAiswE',
  category: 'disney',
  image: 'https://i.pinimg.com/736x/3b/c9/85/3bc98592ed2b34e4dc7537ea0d44c849.jpg'
},
{
  id: 14,
  title: 'The Princess and the Frog',
  description: 'Tiana, a hardworking young woman in New Orleans, dreams of opening her own restaurant. When she kisses a frog prince, she’s swept into a magical journey of love and courage.',
  year: 2009,
  director: 'Ron Clements, John Musker',
  rating: 7.1,
  trailer: 'https://www.youtube.com/embed/uQBy6jqbmlU',
  category: 'disney',
  image: 'https://i.pinimg.com/736x/1e/5d/ca/1e5dca84af2672fa9ad25317aaa8d360.jpg'
},
{
  id: 15,
  title: 'Tangled',
  description: 'Rapunzel, a spirited girl with magical hair, escapes her tower with the help of a charming thief. Together, they discover the world and find their true purpose.',
  year: 2010,
  director: 'Nathan Greno, Byron Howard',
  rating: 7.7,
  trailer: 'https://www.youtube.com/embed/2f516ZLyC6U',
  category: 'disney',
  image: 'https://i.pinimg.com/736x/43/ee/14/43ee14b4ceb6f632ba47b74342c3a89a.jpg'
},
{
  id: 16,
  title: 'Frozen',
  description: 'When Queen Elsa’s powers trap her kingdom in eternal winter, her sister Anna sets out on a daring journey to bring her back and restore summer.',
  year: 2013,
  director: 'Chris Buck, Jennifer Lee',
  rating: 7.5,
  trailer: 'https://www.youtube.com/embed/TbQm5doF_Uc',
  category: 'disney',
  image: 'https://i.pinimg.com/736x/c5/7a/a1/c57aa1543487d2bcb69c0217bead64a8.jpg'
},
{
  id: 17,
  title: 'Coco',
  description: 'A young boy named Miguel embarks on a journey to the Land of the Dead to discover his family’s history and pursue his passion for music.',
  year: 2017,
  director: 'Lee Unkrich, Adrian Molina',
  rating: 8.4,
  trailer: 'https://www.youtube.com/embed/Ga6RYejo6Hk',
  category: 'disney',
  image: 'https://i.pinimg.com/736x/a1/6c/89/a16c89e3dcd2bbc3d19c1c23ceaf266d.jpg'}
,{
  id: 18,
  title: 'The Nightmare Before Christmas',
  description: 'Jack Skellington, the Pumpkin King of Halloween Town, discovers Christmas and decides to take it over, leading to spooky and magical consequences.',
  year: 1993,
  director: 'Henry Selick',
  rating: 8.0,
  trailer: 'https://www.youtube.com/embed/wr6N_hZyBCk',
  category: 'disney',
  image: 'https://i.pinimg.com/1200x/4e/6c/f1/4e6cf194d77e17489394d4ada6e94759.jpg'
},
{
  id: 19,
  title: 'Mulan',
  description: 'A brave young woman disguises herself as a man to take her father’s place in the army, proving that courage and honor know no gender.',
  year: 1998,
  director: 'Tony Bancroft, Barry Cook',
  rating: 7.6,
  trailer: 'https://www.youtube.com/embed/KK8FHdFluOQ',
  category: 'disney',
  image: 'https://i.pinimg.com/1200x/d7/50/7c/d7507c4ca2a49cd37a4f26ffbacaf327.jpg'
},
{
  id: 20,
  title: 'Inside Out',
  description: 'An imaginative journey into the mind of an 11-year-old girl, where her emotions — Joy, Sadness, Anger, Fear, and Disgust — help her navigate life’s challenges.',
  year: 2015,
  director: 'Pete Docter, Ronnie del Carmen',
  rating: 8.1,
  trailer: 'https://www.youtube.com/embed/seMwpP0yeu4',
  category: 'disney',
  image: 'https://i.pinimg.com/1200x/b0/5f/73/b05f7320abf03fc521e36806cda20309.jpg'
},
{
  id: 21,
  title: '101 Dalmatians',
  description: 'When the evil Cruella de Vil kidnaps puppies for their fur, Pongo and Perdita set out on a daring rescue mission filled with heart and adventure.',
  year: 1961,
  director: 'Clyde Geronimi, Hamilton Luske, Wolfgang Reitherman',
  rating: 7.3,
  trailer: 'https://www.youtube.com/embed/i9QJ8ecuvF0',
  category: 'disney',
  image: 'https://i.pinimg.com/1200x/a0/f0/9f/a0f09f57820a68d62022efcc2da57dfd.jpg'
},
{
  id: 22,
  title: 'The Irishman',
  description: 'A mob hitman reflects on his life and his involvement in the disappearance of union leader Jimmy Hoffa. A powerful crime epic from Martin Scorsese.',
  year: 2019,
  director: 'Martin Scorsese',
  rating: 7.8,
  trailer: 'https://www.youtube.com/embed/WHXxVmeGQUc',
  category: 'netflix',
  image: 'https://i.pinimg.com/1200x/11/e4/9a/11e49ab4795f33a7e45975e4c7ad3476.jpg'
},
{
  id: 23,
  title: 'Marriage Story',
  description: 'A stage director and his actor wife struggle through a grueling, coast-to-coast divorce that pushes them to their limits.',
  year: 2019,
  director: 'Noah Baumbach',
  rating: 7.9,
  trailer: 'https://www.youtube.com/embed/BHi-a1n8t7M',
  category: 'netflix',
  image: 'https://i.pinimg.com/1200x/4f/6f/ed/4f6fed30bc4f1bf40594a2f874035fb3.jpg'
},
{
  id: 24,
  title: 'The Trial of the Chicago 7',
  description: 'The story of seven people on trial for various charges surrounding the uprising at the 1968 Democratic National Convention in Chicago.',
  year: 2020,
  director: 'Aaron Sorkin',
  rating: 7.8,
  trailer: 'https://www.youtube.com/embed/FVb6EdKDBfU',
  category: 'netflix',
  image: 'https://i.pinimg.com/1200x/1f/fd/46/1ffd46b696f5be983df84edcf6c2209b.jpg'
},
{
  id: 25,
  title: 'Glass Onion: A Knives Out Mystery',
  description: 'Detective Benoit Blanc travels to Greece to peel back the layers of a complex mystery involving a tech billionaire and his friends.',
  year: 2022,
  director: 'Rian Johnson',
  rating: 7.1,
  trailer: 'https://www.youtube.com/embed/gj5ibYSz8C0',
  category: 'netflix',
  image: 'https://i.pinimg.com/736x/bc/b2/70/bcb2701aba4a843373f7075c57b3437d.jpg'
},
{
  id: 26,
  title: 'The Power of the Dog',
  description: 'A domineering rancher responds with mocking cruelty when his brother brings home a new wife and her son—until the unexpected happens.',
  year: 2021,
  director: 'Jane Campion',
  rating: 7.8,
  trailer: 'https://www.youtube.com/embed/LRDPo0CHrko',
  category: 'netflix',
  image: 'https://i.pinimg.com/736x/59/c2/48/59c24846136d50e695d54422717682e1.jpg'
},
{
  id: 27,
  title: 'Klaus',
  description: 'A selfish postman and a reclusive toymaker form an unlikely friendship that brings joy to a cold, dark town — and creates a holiday legend.',
  year: 2019,
  director: 'Sergio Pablos',
  rating: 8.2,
  trailer: 'https://www.youtube.com/embed/taE3PwurhYM',
  category: 'netflix',
  image: 'https://i.pinimg.com/736x/87/93/0d/87930dda3ad01661d0fbc6d7fa9f259e.jpg'
},
{
  id: 28,
  title: 'Roma',
  description: 'A domestic worker in 1970s Mexico City navigates love, loss, and class tensions in this deeply personal masterpiece.',
  year: 2018,
  director: 'Alfonso Cuarón',
  rating: 7.9,
  trailer: 'https://www.youtube.com/embed/6BS27ngZtxg',
  category: 'netflix',
  image: 'https://i.pinimg.com/736x/b5/4b/00/b54b00b000d4cf7a47340ecc8817d8bf.jpg'
},
{
  id: 29,
  title: 'All Quiet on the Western Front',
  description: 'A young German soldier’s terrifying experiences and distress on the western front during World War I.',
  year: 2022,
  director: 'Edward Berger',
  rating: 7.8,
  trailer: 'https://www.youtube.com/embed/hf8EYbVxtCY',
  category: 'netflix',
  image: 'https://i.pinimg.com/1200x/93/66/b2/9366b2276edecff9172008f3c37f9634.jpg'
},
{
  id: 30,
  title: 'The Mitchells vs. The Machines',
  description: 'A quirky, creative family must save the world from a robot apocalypse while on a road trip.',
  year: 2021,
  director: 'Michael Rianda, Jeff Rowe',
  rating: 7.6,
  trailer: 'https://www.youtube.com/embed/_ak5dFt8Ar0',
  category: 'netflix',
  image: 'https://i.pinimg.com/736x/fe/e3/3f/fee33f597287945671f8d33f0b35aa44.jpg'
},
{
  id: 31,
  title: 'The Social Dilemma',
  description: 'Explores the dangerous human impact of social networking, with tech experts sounding the alarm on their own creations.',
  year: 2020,
  director: 'Jeff Orlowski',
  rating: 7.6,
  trailer: 'https://www.youtube.com/embed/uaaC57tcci0',
  category: 'netflix',
  image: 'https://i.pinimg.com/1200x/e3/6f/5e/e36f5ea029752e6f7982b4304e341e75.jpg'
},
{
  id: 32,
  title: 'Dune',
  description: 'A noble family becomes embroiled in a war for control over the galaxy’s most valuable asset while its heir wrestles with his destiny.',
  year: 2021,
  director: 'Denis Villeneuve',
  rating: 8.0,
  trailer: 'https://www.youtube.com/embed/n9xhJrPXop4',
  category: 'hbo',
  image: 'https://i.pinimg.com/736x/1a/12/e4/1a12e43e9f2083ffca2174bdaeaa2968.jpg'
},
{
  id: 33,
  title: 'The Batman',
  description: 'Batman ventures into Gotham’s underworld when a sadistic killer leaves behind a trail of cryptic clues.',
  year: 2022,
  director: 'Matt Reeves',
  rating: 7.8,
  trailer: 'https://www.youtube.com/embed/mqqft2x_Aa4',
  category: 'hbo',
  image: 'https://i.pinimg.com/1200x/42/91/f9/4291f97873fe0f3c1ee554997cdb0466.jpg'
},
{
  id: 34,
  title: 'Joker',
  description: 'A mentally troubled comedian embarks on a downward spiral that leads to the creation of an iconic villain.',
  year: 2019,
  director: 'Todd Phillips',
  rating: 8.4,
  trailer: 'https://www.youtube.com/embed/zAGVQLHvwOY',
  category: 'hbo',
  image: 'https://i.pinimg.com/736x/42/bb/ba/42bbbaefd687903bc80b02c014e64a5b.jpg'
},
{
  id: 35,
  title: 'Chernobyl',
  description: 'A skilled thief who steals secrets through dream-sharing technology must complete one final, mind-bending mission.',
  year: 2010,
  director: 'Christopher Nolan',
  rating: 8.8,
  trailer: 'https://www.youtube.com/embed/YoHD9XEInc0',
  category: 'hbo',
  image: 'https://i.pinimg.com/736x/4c/1e/47/4c1e474478cfdfef236f17cfa6c69d40.jpg'
},
{
  id: 36,
  title: 'Tenet',
  description: 'A secret agent manipulates time itself to prevent World War III in Christopher Nolan’s high-concept thriller.',
  year: 2020,
  director: 'Christopher Nolan',
  rating: 7.3,
  trailer: 'https://www.youtube.com/embed/L3pk_TBkihU',
  category: 'hbo',
  image: 'https://i.pinimg.com/736x/0a/2e/de/0a2ede27c6bc3a3abe98f5f50db22e89.jpg'
},
{
  id: 37,
  title: 'The Matrix Resurrections',
  description: 'Neo must choose to follow the white rabbit once more as he returns to a world both familiar and vastly more dangerous.',
  year: 2021,
  director: 'Lana Wachowski',
  rating: 6.6,
  trailer: 'https://www.youtube.com/embed/9ix7TUGVYIo',
  category: 'hbo',
  image: 'https://i.pinimg.com/736x/64/25/8d/64258d13101b08c10cd1c8586670783c.jpg'
},
{
  id: 38,
  title: 'The Dark Knight',
  description: 'Batman faces his greatest psychological and physical test when the Joker wreaks havoc on Gotham City.',
  year: 2008,
  director: 'Christopher Nolan',
  rating: 9.0,
  trailer: 'https://www.youtube.com/embed/EXeTwQWrcwY',
  category: 'hbo',
  image: 'https://i.pinimg.com/736x/d6/8e/d7/d68ed7640751a026ca8968f2faffa909.jpg'
},
{
  id: 39,
  title: 'Interstellar',
  description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity’s survival.',
  year: 2014,
  director: 'Christopher Nolan',
  rating: 8.7,
  trailer: 'https://www.youtube.com/embed/zSWdZVtXT7E',
  category: 'hbo',
  image: 'https://i.pinimg.com/736x/73/26/0e/73260e80b7873849c1d514e9fbc45391.jpg'
},
{
  id: 40,
  title: 'Mad Max: Fury Road',
  description: 'In a post-apocalyptic wasteland, a woman rebels against a tyrannical ruler in search of her homeland.',
  year: 2015,
  director: 'George Miller',
  rating: 8.1,
  trailer: 'https://www.youtube.com/embed/hEJnMQG9ev8',
  category: 'hbo',
  image: 'https://i.pinimg.com/736x/fa/de/e8/fadee85208ca3164b62e6c6b38662330.jpg'
},
{
  id: 41,
  title: 'The Prestige',
  description: 'Two rival magicians engage in a dangerous competition to create the ultimate illusion, blurring the line between magic and obsession.',
  year: 2006,
  director: 'Christopher Nolan',
  rating: 8.5,
  trailer: 'https://www.youtube.com/embed/o4gHCmTQDVI',
  category: 'hbo',
  image: 'https://i.pinimg.com/736x/d1/5e/fe/d15efe63a6da540a9cdc674ea984dd71.jpg'
},
{
  id: 42,
  title: 'Top Gun: Maverick',
  description: 'After more than 30 years of service, Maverick continues to push the limits as a top naval aviator while training a new generation of pilots.',
  year: 2022,
  director: 'Joseph Kosinski',
  rating: 8.3,
  trailer: 'https://www.youtube.com/embed/giXco2jaZ_4',
  category: 'paramount',
  image: 'https://i.pinimg.com/1200x/dc/77/a2/dc77a2ce208d4333898c1650f6d2fba7.jpg'
},
{
  id: 43,
  title: 'A Quiet Place',
  description: 'In a post-apocalyptic world, a family is forced to live in silence while hiding from monsters with ultra-sensitive hearing.',
  year: 2018,
  director: 'John Krasinski',
  rating: 7.5,
  trailer: 'https://www.youtube.com/embed/WR7cc5t7tv8',
  category: 'paramount',
  image: 'https://i.pinimg.com/1200x/93/1a/b8/931ab8aa547a58c7c4b983536e7738c6.jpg'
},
{
  id: 44,
  title: 'Mission: Impossible – Fallout',
  description: 'Ethan Hunt and his team race against time after a mission goes wrong, in one of the most thrilling entries in the franchise.',
  year: 2018,
  director: 'Christopher McQuarrie',
  rating: 7.7,
  trailer: 'https://www.youtube.com/embed/wb49-oV0F78',
  category: 'paramount',
  image: 'https://i.pinimg.com/736x/3b/8b/27/3b8b27fdc85a572fea2623bb4d918029.jpg'
},
{
  id: 45,
  title: 'Catch Me If You Can',
  description: 'A brilliant con artist poses as a pilot, doctor, and lawyer, while being pursued by an FBI agent in this stylish cat-and-mouse thriller.',
  year: 2002,
  director: 'Steven Spielberg',
  rating: 8.1,
  trailer: 'https://www.youtube.com/embed/s-7pyIxz8Qg',
  category: 'paramount',
  image: 'https://i.pinimg.com/1200x/93/98/a1/9398a15b1ff3f1a3afacb8dbbbcc25db.jpg'
},
{
  id: 46,
  title: 'Transformers: Rise of the Beasts',
  description: 'The Autobots join forces with the Maximals to face a new global threat in this action-packed sci-fi adventure.',
  year: 2023,
  director: 'Steven Caple Jr.',
  rating: 6.5,
  trailer: 'https://www.youtube.com/embed/itnqEauWQZM',
  category: 'paramount',
  image: 'https://i.pinimg.com/736x/f2/9e/81/f29e81c4527a8d05f00e6a2f13d2b510.jpg'
},
{
  id: 47,
  title: 'The Wolf of Wall Street',
  description: 'Based on the true story of Jordan Belfort, who rises to immense wealth through corruption and fraud on Wall Street.',
  year: 2013,
  director: 'Martin Scorsese',
  rating: 8.2,
  trailer: 'https://www.youtube.com/embed/iszwuX1AK6A',
  category: 'paramount',
  image: 'https://i.pinimg.com/1200x/e4/f7/36/e4f736f717cf4c7737f698c2d8ff117d.jpg'
},
{
  id: 48,
  title: 'Sonic the Hedgehog 2',
  description: 'Sonic and Tails team up to stop Dr. Robotnik and his new partner Knuckles in a fun and fast-paced adventure.',
  year: 2022,
  director: 'Jeff Fowler',
  rating: 6.5,
  trailer: 'https://www.youtube.com/embed/G5kzUpWAusI',
  category: 'paramount',
  image: 'https://i.pinimg.com/736x/cd/0d/f1/cd0df1c19c17cc86615b80b7a61164b3.jpg'
},
{
  id: 49,
  title: 'The Godfather',
  description: 'The aging patriarch of an organized crime dynasty transfers control of his empire to his reluctant son.',
  year: 1972,
  director: 'Francis Ford Coppola',
  rating: 9.2,
  trailer: 'https://www.youtube.com/embed/sY1S34973zA',
  category: 'paramount',
  image: 'https://i.pinimg.com/1200x/3a/2d/34/3a2d34f0a80d0a462ed5b953df963a3e.jpg'
},
{
  id: 50,
  title: 'Forrest Gump',
  description: 'The life story of a simple man with a big heart, who unwittingly influences several historical events.',
  year: 1994,
  director: 'Robert Zemeckis',
  rating: 8.8,
  trailer: 'https://www.youtube.com/embed/bLvqoHBptjg',
  category: 'paramount',
  image: 'https://i.pinimg.com/736x/a8/39/7d/a8397dcfdf56fc342c3712a91e186575.jpg'
},
{
  id: 51,
  title: 'Titanic',
  description: 'A tragic romance unfolds aboard the ill-fated RMS Titanic, blending historical drama with unforgettable emotion.',
  year: 1997,
  director: 'James Cameron',
  rating: 7.9,
  trailer: 'https://www.youtube.com/embed/kVrqfYjkTdQ',
  category: 'paramount',
  image: 'https://i.pinimg.com/736x/44/55/d9/4455d96357fb041d1cf3c8a5264ed593.jpg'
},
{
  id: 52,
  title: 'Shrek',
  description: 'An ogre named Shrek embarks on a quest to rescue Princess Fiona, uncovering the meaning of true love and friendship along the way.',
  year: 2001,
  director: 'Andrew Adamson, Vicky Jenson',
  rating: 8.1,
  trailer: 'https://www.youtube.com/embed/CwXOrWvPBPk',
  category: 'dreamworks',
  image: 'https://i.pinimg.com/1200x/35/3c/6e/353c6e5c70c755466d66aaf8a768aeaa.jpg'
},
{
  id: 53,
  title: 'Kung Fu Panda',
  description: 'A clumsy panda named Po is chosen as the Dragon Warrior and must learn to harness his power to defeat the villainous Tai Lung.',
  year: 2008,
  director: 'Mark Osborne, John Stevenson',
  rating: 8.0,
  trailer: 'https://www.youtube.com/embed/PXi3Mv6KMzY',
  category: 'dreamworks',
  image: 'https://i.pinimg.com/1200x/e8/f8/d5/e8f8d5f5e40afd31ca1f5f4000927525.jpg'
},
{
  id: 54,
  title: 'How to Train Your Dragon',
  description: 'A young Viking befriends a dragon and changes his tribe’s long-standing beliefs about the creatures.',
  year: 2010,
  director: 'Dean DeBlois, Chris Sanders',
  rating: 8.1,
  trailer: 'https://www.youtube.com/embed/oKiYuIsPxYk',
  category: 'dreamworks',
  image: 'https://i.pinimg.com/1200x/b5/fa/1c/b5fa1ca5079b6fa67d19e93e9d94c5ca.jpg'
},
{
  id: 55,
  title: 'Madagascar',
  description: 'A group of New York zoo animals find themselves stranded on the island of Madagascar after a shipwreck.',
  year: 2005,
  director: 'Eric Darnell, Tom McGrath',
  rating: 7.0,
  trailer: 'https://www.youtube.com/embed/fq5zU9T_Hl4',
  category: 'dreamworks',
  image: 'https://i.pinimg.com/736x/d8/53/b9/d853b9be96e886632b7d8e4215fd8f7d.jpg'
},
{
  id: 56,
  title: 'Megamind',
  description: 'After defeating his nemesis, the supervillain Megamind discovers that life without an enemy is meaningless.',
  year: 2010,
  director: 'Tom McGrath',
  rating: 7.3,
  trailer: 'https://www.youtube.com/embed/Xu42-p6_5RE',
  category: 'dreamworks',
  image: 'https://i.pinimg.com/1200x/9a/df/ff/9adfff93898262baa8b870115d01ca3a.jpg'
},
{
  id: 57,
  title: 'Trolls',
  description: 'Two trolls embark on a journey to rescue their friends from the Bergens, who have lost their joy.',
  year: 2016,
  director: 'Mike Mitchell, Walt Dohrn',
  rating: 6.5,
  trailer: 'https://www.youtube.com/embed/xyjm5VQ11TQ',
  category: 'dreamworks',
  image: 'https://i.pinimg.com/1200x/0e/98/ca/0e98caf82ff5829ce1adff3a29eaff79.jpg'
},
{
  id: 58,
  title: 'The Croods',
  description: 'A prehistoric family embarks on a journey of survival and discovery as they encounter a new world.',
  year: 2013,
  director: 'Kirk DeMicco, Chris Sanders',
  rating: 7.2,
  trailer: 'https://www.youtube.com/embed/4fVCKy69zUY',
  category: 'dreamworks',
  image: 'https://i.pinimg.com/736x/24/ff/8d/24ff8d7dfcba4f2c648c67153ea02857.jpg'
},
{
  id: 59,
  title: 'Rise of the Guardians',
  description: 'The legendary figures of childhood — Santa Claus, the Easter Bunny, and others — unite to protect the world’s children from darkness.',
  year: 2012,
  director: 'Peter Ramsey',
  rating: 7.3,
  trailer: 'https://www.youtube.com/embed/aPLiBxhoug0',
  category: 'dreamworks',
  image: 'https://i.pinimg.com/736x/3f/e4/82/3fe48276e43f277c3db4d2d648b84ed6.jpg'
},
{
  id: 60,
  title: 'Puss in Boots: The Last Wish',
  description: 'Puss in Boots embarks on a final epic adventure to restore his nine lives in this visually stunning sequel.',
  year: 2022,
  director: 'Joel Crawford',
  rating: 8.0,
  trailer: 'https://www.youtube.com/embed/xgZLXyqbYOc',
  category: 'dreamworks',
  image: 'https://i.pinimg.com/736x/43/34/3f/43343f8ed72ff460ce046077d09d1912.jpg'
},
{
  id: 61,
  title: 'Boss Baby',
  description: 'A baby who wears a suit and speaks like an adult teams up with his older brother to stop a corporate plot involving love.',
  year: 2017,
  director: 'Tom McGrath',
  rating: 6.3,
  trailer: 'https://www.youtube.com/embed/tquIfapGVqs',
  category: 'dreamworks',
  image: 'https://i.pinimg.com/736x/66/2e/a5/662ea575aa78f7c1f261ef57918d12eb.jpg'
},
 
  ];

  constructor(private http: HttpClient) { }

  getMovies(): Observable<Movie[]> {
    return of(this.movies);
  }

  searchMovies(term: string): Observable<Movie[]> {
    return of(this.movies.filter(movie => 
      movie.title.toLowerCase().includes(term.toLowerCase())
    ));
  }

  getMoviesByCategory(category: string): Observable<Movie[]> {
    return of(this.movies.filter(movie => 
      movie.category.toLowerCase() === category.toLowerCase()
    ));
  }

  getMovie(id: number): Observable<Movie | undefined> {
    return of(this.movies.find(movie => movie.id === id));
  }

  private categories = [
  { 
    name: 'anime', 
    displayName: 'Anime',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop'
  },
  { 
    name: 'disney', 
    displayName: 'Disney',
    image: 'https://images.unsplash.com/photo-1624138784310-001789779451?w=300&h=200&fit=crop'
  },
  { 
    name: 'netflix', 
    displayName: 'Netflix',
    image: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=300&h=200&fit=crop'
  },
  { 
    name: 'hbo', 
    displayName: 'HBO',
    image: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=300&h=200&fit=crop'
  },
  { 
    name: 'paramount', 
    displayName: 'Paramount',
    image: 'https://images.unsplash.com/photo-1489599809505-f2d4cbd5a0c9?w=300&h=200&fit=crop'
  },
  { 
    name: 'dreamworks', 
    displayName: 'DreamWorks',
    image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=300&h=200&fit=crop'
  }
];

getCategories() {
  return this.categories;
}

getCategoryByName(name: string) {
  return this.categories.find(cat => cat.name === name);
}
}