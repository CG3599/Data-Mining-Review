// Keep TeX intact until Markdown has finished processing underscores, pipes and escapes.
function typeset(tex, display = false) {
 const html = katex.renderToString(tex, {output:'mathml', displayMode:display, strict:'ignore', trust:false});
 return '<span class="'+(display?'equation-block':'equation-inline')+'">'+html+'</span>';
}

function mathMarkdown(source) {
 const formulas=[];
 const pattern=/\x60\x60\x60[\s\S]*?\x60\x60\x60|\x60[^\x60\n]*\x60|\\\[([\s\S]*?)\\\]|\\\(((?:(?!\\\()[^\n])*?)\\\)/g;
 const protectedSource=source.replace(pattern,(match,block,inline)=>{
  if(block===undefined && inline===undefined)return match;
  const id=formulas.push(typeset(block??inline,block!==undefined))-1;
  return 'DMFORMULAKEY'+id+'END';
 });
 return marked.parse(escapeText(protectedSource)).replace(/DMFORMULAKEY(\d+)END/g,(_,id)=>formulas[id]);
}

const mathRewrites = new Map([
 ['(35 − 20) ÷ (80 − 20)', '\\frac{35-20}{80-20}'],
 ['0.3 ÷ (0.4 × 0.5)', '\\frac{0.3}{0.4\\times0.5}'],
 ['(2 + 4 + 6) ÷ 3','\\frac{2+4+6}{3}'],
 ['1 ÷ (1 + e⁰)','\\frac{1}{1+e^0}'],
 ['√(3² + 4²)','\\sqrt{3^2+4^2}'],
 ['Variance = Mean of Squares − Square of Mean','\\operatorname{Var}(X)=E[X^2]-(E[X])^2']
]);
const subDigits='₀₁₂₃₄₅₆₇₈₉';
function plainTex(expr) {
 return expr.replace(/([CL])([₀-₉ₖ₊]+)/g,(_,s,n)=>s+'_{'+[...n].map(c=>c==='ₖ'?'k':c==='₊'?'+':subDigits.indexOf(c)).join('')+'}')
 .replace(/\bQ([123])\b/g,'Q_$1').replace(/log₂/g,'\\log_2').replace(/σ/g,'\\sigma ')
 .replace(/[²⁰]/g,c=>c==='²'?'^2':'^0').replace(/−/g,'-').replace(/×/g,'\\times ')
 .replace(/(\d+(?:\.\d+)?%?)\s*(?:÷|\/)\s*(\d+(?:\.\d+)?%?)/g,'\\frac{$1}{$2}')
 .replace(/÷/g,'\\div ').replace(/%/g,'\\%').replace(/[∩→]/g,c=>c==='∩'?'\\cap ':'\\to ')
 .replace(/\b(Support|Confidence|Lift|Count|Entropy|Gini|IQR)\b/g,'\\operatorname{$1}');
}
const literalPattern=[...mathRewrites.keys()].map(k=>k.replace(/[.*+?^\x24{}()|[\]\\]/g,'\\$&')).join('|');
const atom=String.raw`(?:[−-]?\d+(?:[.,]\d+)*(?:%|²)?|\(\d+/\d+\)²|log₂\([\d.]+\)|[Pσ]\([A-Z0-9∩]+\)|[CL][₀-₉ₖ₊]+|Q[123]|Confidence|Support|Entropy|Count|Gini|Lift|IQR|[kmxz])`;
const term='(?:'+literalPattern+'|'+atom+')';
const ordinaryMath=new RegExp(term+'(?:\\s*(?:=|×|÷|/|−|\\+)\\s*'+term+')+|'+literalPattern+'|[CL][₀-₉ₖ₊]+','g');
function convertPlainMath(root) {
 const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
 const nodes=[];
 while(walker.nextNode()){
  const node=walker.currentNode;
  if(!node.parentElement.closest('math,svg,pre,code,course-note,textarea,script,style,.equation-inline,.equation-block'))nodes.push(node);
 }
 for(const node of nodes){
  const text=node.data,matches=[...text.matchAll(ordinaryMath)];
  if(!matches.length)continue;
  const fragment=document.createDocumentFragment();
  let start=0;
  for(const match of matches){
   fragment.append(text.slice(start,match.index));
   let parts=match[0].split(new RegExp('('+literalPattern+')','g'));
   const tex=parts.map(p=>mathRewrites.get(p)??plainTex(p)).join('');
   const wrapper=document.createElement('span');
   wrapper.innerHTML=typeset(tex);
   fragment.append(wrapper.firstChild);
   start=match.index+match[0].length;
  }
  fragment.append(text.slice(start));node.replaceWith(fragment);
 }
}
