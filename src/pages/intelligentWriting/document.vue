<template>
  <div class="application-container">
    <Outline
      ref="outlineRef"
      :content="state.params.richText"
      @heading-click="handleHeadingClick"
      @expand="handleExpand"
    />
    <div class="editor-container">
      <Portal
        :content="state.params.richText"
      />
      <div class="rich-text-container">
        <RichText
          v-if="state.init"
          v-model="state.params.richText"
          ref="richTextRef"
        />
      </div>
    </div>
  </div>
  <Plugins />
</template>


<script lang="ts" setup>
import { ref ,reactive,onMounted,nextTick } from 'vue'
import RichText from '@/components/UI/richText/index.vue'
import Portal from './components/portal.vue'
import Outline from './components/outline.vue'
import  { useRoute } from 'vue-router'
import Plugins from './components/plugins.vue'
let route = useRoute()

let state = reactive({
  init:false,
  params: {
    richText: ''
  }
})

const richTextRef = ref(null)
const outlineRef = ref(null)

const mockDocumentContent = `
<h1>一、引言</h1>
<h2>1.1 研究背景</h2>
<p>随着人工智能技术的快速发展，自然语言处理领域取得了显著的进步。大型语言模型（LLM）的出现，为文本生成、理解、翻译等任务提供了强大的技术支持。本研究旨在探讨基于大型语言模型的智能写作系统的设计与实现。</p>
<h2>1.2 研究目的</h2>
<p>本研究的主要目的是设计并实现一个基于大型语言模型的智能写作系统，该系统能够根据用户的写作需求，自动生成高质量、结构化的文档内容。具体目标包括：</p>
<ul>
<li>分析用户写作需求，提取关键信息</li>
<li>利用大型语言模型生成文档大纲</li>
<li>根据大纲生成完整的文档内容</li>
<li>提供文档编辑、润色、扩写等辅助功能</li>
</ul>
<h2>1.3 研究意义</h2>
<p>智能写作系统的研究具有重要的理论意义和实际应用价值。理论上，它能够推动自然语言生成技术的发展；实践上，它能够显著提高文档写作效率，降低写作门槛，为教育、办公、科研等领域提供有力支持。</p>
<h1>二、文献综述</h1>
<h2>2.1 国内外研究现状</h2>
<p>近年来，国内外学者在智能写作领域进行了大量研究。国外方面，OpenAI的GPT系列模型在文本生成任务中表现出色；国内方面，百度文心一言、阿里通义千问等大模型也取得了显著成果。然而，现有系统在长文档生成、结构化输出等方面仍有提升空间。</p>
<h2>2.2 理论基础</h2>
<p>本研究的理论基础主要包括：大型语言模型原理、提示工程（Prompt Engineering）、文档结构化理论等。大型语言模型通过在海量文本数据上进行预训练，学习语言的统计规律和语义信息，从而能够生成连贯、合理的文本。</p>
<h2>2.3 相关技术</h2>
<p>本研究涉及的关键技术包括：Transformer架构、注意力机制、微调技术、检索增强生成（RAG）等。这些技术的综合应用，能够有效提升生成内容的质量和相关性。</p>
<h1>三、研究方法</h1>
<h2>3.1 研究设计</h2>
<p>本研究采用系统化的研究方法，包括需求分析、系统设计、原型开发、测试评估等阶段。首先，通过用户调研和竞品分析，明确系统的功能需求；其次，基于需求分析结果，设计系统架构和功能模块；然后，进行原型开发和迭代优化；最后，通过用户测试和专家评审，评估系统性能。</p>
<h2>3.2 数据采集</h2>
<p>数据采集是模型训练和优化的重要环节。本研究通过多种渠道收集高质量的文档数据，包括学术论文、技术报告、商业文档等。同时，构建领域知识库，为检索增强生成提供数据支持。</p>
<h2>3.3 数据分析</h2>
<p>对采集的数据进行清洗、标注和分类，构建训练数据集。采用统计分析方法，分析文档的结构特征、语言风格、主题分布等，为模型训练和系统设计提供依据。</p>
<h1>四、研究结果</h1>
<h2>4.1 数据统计</h2>
<p>通过对收集的数据进行统计分析，得出以下结论：平均文档长度为5000字，最常见的文档类型为技术报告，文档结构以三级标题为主。这些统计结果为系统设计提供了重要参考。</p>
<h2>4.2 结果分析</h2>
<p>实验结果表明，本系统在文档生成质量、结构合理性、内容相关性等方面表现良好。与基线模型相比，本系统生成的文档在可读性、专业性方面有明显提升。</p>
<h2>4.3 结果讨论</h2>
<p>系统的优势在于能够根据用户需求生成结构化的文档，支持多轮交互和实时编辑。然而，在处理超长文档、特定领域专业术语等方面仍有改进空间。未来工作将重点关注这些问题的优化。</p>
<h1>五、结论与展望</h1>
<h2>5.1 主要结论</h2>
<p>本研究成功设计并实现了一个基于大型语言模型的智能写作系统。该系统能够自动生成高质量、结构化的文档内容，提供丰富的编辑辅助功能，有效提升了文档写作效率。</p>
<h2>5.2 创新点</h2>
<p>本研究的创新点主要包括：提出了基于需求分析的大纲生成方法、设计了多步骤文档生成流程、实现了文档大纲与内容的联动编辑等。这些创新为智能写作领域提供了新的思路和方法。</p>
<h2>5.3 未来展望</h2>
<p>未来工作将从以下几个方面展开：优化模型性能、扩展文档类型支持、增强多模态生成能力（如图文混排）、提升系统交互体验等。同时，将探索在更多垂直领域的应用，如法律文书、医疗报告等。</p>
<h1>六、参考文献</h1>
<p>[1] Vaswani A, Shazeer N, Parmar N, et al. Attention is all you need[J]. arXiv preprint arXiv:1706.03762, 2017.</p>
<p>[2] Brown T, Mann B, Ryder N, et al. Language models are few-shot learners[J]. Advances in neural information processing systems, 2020, 33: 1877-1901.</p>
<p>[3] OpenAI. GPT-4 Technical Report[J]. 2023.</p>
<h1>七、致谢</h1>
<p>感谢导师在本研究过程中的悉心指导和帮助，感谢实验室同学在数据收集和系统测试方面提供的支持，感谢家人在研究期间的理解和鼓励。</p>
`

function getSelectionText() {
  const editor = richTextRef.value?.editor
  if (!editor) return ''
  return editor.getSelectionText()
}

function handleHeadingClick(heading: any) {
  nextTick(() => {
    const editor = richTextRef.value?.editor
    if (!editor) return

    const headingText = heading.title
    const editorElem = editor.getEditableContainer()

    if (!editorElem) return

    const headings = editorElem.querySelectorAll('h1, h2, h3, h4, h5, h6')

    for (let i = 0; i < headings.length; i++) {
      const h = headings[i]
      if (h.textContent?.includes(headingText.replace(/^[一二三四五六七八九十]+、/, ''))) {
        h.scrollIntoView({ behavior: 'smooth', block: 'start' })
        break
      }
    }
  })
}

function handleExpand(heading: any) {
  nextTick(() => {
    const editor = richTextRef.value?.editor
    
    if (!editor) return

    const headingText = heading.title
    const editorElem = editor.getEditableContainer()

    if (!editorElem) return

    const headings = editorElem.querySelectorAll('h1, h2, h3, h4, h5, h6')
    let targetHeading = null

    for (let i = 0; i < headings.length; i++) {
      const h = headings[i]
      if (h.textContent?.includes(headingText.replace(/^[一二三四五六七八九十]+、/, ''))) {
        targetHeading = h
        break
      }
    }

    if (!targetHeading) return

    const expandContent = '<p style="background-color: #f0f4ff; padding: 16px; border-left: 4px solid #667eea; margin: 16px 0;">该内容将由AI根据全文完成扩写</p>'

    const tempDiv = document.createElement('div')
    tempDiv.innerHTML = expandContent
    const paragraph = tempDiv.firstChild

    targetHeading.insertAdjacentElement('afterend', paragraph)

    setTimeout(() => {
      paragraph.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 100)
  })
}

onMounted(() => {
  setTimeout(() => {
    state.init = true
  }, 0)

  if(route.query.documentId){
    let richText = sessionStorage.getItem(route.query.documentId + 'richText') || ''
    state.params.richText = richText
  } else {
    state.params.richText = mockDocumentContent
  }
})
</script>


<style scoped lang="scss">
.application-container {
  width: 100%;
  height: calc(100vh);
  background: #fff;
  border-radius: 0;
  display: flex;
  overflow: hidden;
}

.editor-container {
  flex: 1;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  .rich-text-container {
    flex: 1;
    overflow: auto;
  }
}
</style>
