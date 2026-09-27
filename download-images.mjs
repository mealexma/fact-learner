import {writeFile} from 'node:fs/promises';
const files=[
 ['sparrow','House sparrow (Passer domesticus).jpg'],
 ['mallard','Mallard (Anas platyrhynchos) (26436726209).jpg'],
 ['magpie','Eurasian magpie (Pica pica).jpg'],
 ['great-tit','Great tit - Parus major (51988627968).jpg'],
 ['blue-tit','Eurasian blue tit (Cyanistes caeruleus) 2021.jpg']
];
for(const [id,title] of files){
 const api=new URL('https://commons.wikimedia.org/w/api.php');api.search=new URLSearchParams({action:'query',titles:'File:'+title,prop:'imageinfo',iiprop:'url|extmetadata',iiurlwidth:'800',format:'json'});
 const data=await (await fetch(api,{headers:{'User-Agent':'FactLearner/0.1 (local prototype)'}})).json();const page=Object.values(data.query.pages)[0];const info=page.imageinfo?.[0];if(!info)throw Error(title);
 const response=await fetch(info.thumburl,{headers:{'User-Agent':'FactLearner/0.1 (local prototype)'}});if(!response.ok)throw Error(response.status+' '+title);
 await writeFile('images/'+id+'.jpg',Buffer.from(await response.arrayBuffer()));
 console.log(id,info.descriptionurl, info.extmetadata.Artist?.value,info.extmetadata.LicenseShortName?.value);
}
