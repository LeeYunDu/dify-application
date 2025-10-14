import { imgPath } from "@/utils"

export const tipTags = [
  {
    label: '写作类型',
    key: 'writeType',
    componentType: 'select',
    options: [
      { label: '文章', value: '文章' },
      { label: '新闻', value: '新闻' },
      { label: '报告', value: '报告' },
      { label: '书籍', value: '书籍' },
    ],
    value: '文章',
    contentKey: [
      '请帮我写一篇',
      '$componentKey'
    ]
  },
  {
    label: '写作主题',
    key: 'writeTitle',
    componentType: 'input',
    value: '乡村建设',
    contentKey: [
      '围绕',
      '$componentKey',
      '为主题'
    ]
  },

  {
    label: '写作风格',
    key: 'writeStyle',
    componentType: 'select',
    options: [
      { label: '正式', value: '正式' },
      { label: '专业', value: '专业' },
      { label: '幽默', value: '幽默' },
      { label: '热情', value: '热情' },
      { label: '吐槽', value: '吐槽' },
      { label: '口语', value: '口语' },
      { label: '书面', value: '书面' },

    ],

    contentKey: [
      '风格为',
      '$componentKey',
    ]
  },
  {
    label: '字数限制',
    key: 'writeLimit',
    componentType: 'input',

    contentKey: [
      '需要写',
      '$componentKey',
      '字'
    ],
    props: {
      style: {
        width: '50px'

      }
    }
  },
  {
    label: '大纲',
    key: 'writeOutline',
    componentType: 'input',
    value: '乡村建设的重要性',
    contentKey: [
      '文章大纲为',
      '$componentKey'
    ]
  },
  {
    label: '关键词',
    key: 'writeKeywords',
    componentType: 'input',
    contentKey: [
      '关键词为',
      '$componentKey'
    ],
    props: {
      style: {
        width: 'auto'

      }
    }
  },
  {
    label: '阅读对象',
    key: 'readAudience',
    componentType: 'select',
    options: [
      { label: '领导', value: '领导' },
      { label: '亲人', value: '亲人' },
      { label: '朋友', value: '朋友' },
      { label: '读者', value: '读者' },
      { label: '大学生', value: '大学生' },
      { label: '商家', value: '商家' },
      { label: '爱人', value: '爱人' },
      { label: '下属', value: '下属' },
    ],
    value: '领导',
    contentKey: [
      '文章面向',
      '$componentKey'
    ],
    props: {
      style: {
        width: 'auto'

      }
    }
  },
  {
    label: '时事内容',
    key: 'writeNews',
    componentType: 'input',
    value: '',
    contentKey: [
      '结合',
      '$componentKey',
      '时事内容'
    ],
    props: {
      style: {
        width: 'auto'

      }
    }
  },
  {
    label: '讲话时长',
    key: 'readDuration',
    componentType: 'input',
    value: '',
    contentKey: [
      '讲话时长为',
      '$componentKey',
    ],
    props: {
      style: {
        width: 'auto'

      }
    }
  },
]



export const writeAIplugins = [
  { label: '润色', key: 'polish', icon: 'polish-1.png', tip: '让您的文笔更加丰富多彩' },
  { label: '续写', key: 'continue', icon: 'polish-2.png', tip: '轻松完成整篇文章' },
  { label: '扩写', key: 'expand', icon: 'polish-3.png', tip: '一键拓展您的文章' },
  { label: '翻译', key: 'translate', icon: 'polish-4.png', tip: '金牌翻译，创作互通' },
  { label: '纠错', key: 'correct', icon: 'polish-5.png', tip: '细致校对' },
  { label: '摘要', key: 'abstract', icon: 'polish-6.png', tip: '正确摘取，高速办公' },
]

export const mockAIData = `
<think> 嗯，用户让我写一篇以盗墓为主题的惊悚小说，300字左右。首先，我需要确定故事的核心元素。盗墓题材通常涉及古墓、机关、神秘事件，还有紧张的氛围。用户可能希望有悬疑和恐怖的感觉，所以得设计一些令人不安的情节。 接下来，考虑结构。300字比较短，所以得紧凑。可能需要一个开头引入场景，中间发展冲突，结尾留下悬念。比如主角进入古墓，遇到奇怪的现象，最后发现更大的秘密。 然后，角色设定。主角可能是盗墓贼，或者考古学家，但盗墓更符合惊悚主题。可能需要一个团队，但为了简洁，或许只聚焦一两个人。比如老手带新人，增加互动和紧张感。 环境描写很重要，要营造阴森的气氛。古墓的细节，比如石壁上的壁画、腐烂的棺材、奇怪的声音，这些都能增强恐怖感。机关陷阱也是常见的元素，可以设计一个突然出现的危机，比如地面塌陷或毒气释放。 关键情节方面，可能需要一个转折点，比如发现尸体、听到声音，或者触发机关。最后留个开放结局，让读者回味，比如暗示更大的阴谋或未解之谜。 还要注意语言风格，用简短的句子和生动的描写，加快节奏。避免冗长的背景介绍，直接切入行动。检查字数，确保在300字左右，可能需要删减不必要的部分，突出重点场景。 可能用户希望有独特的元素，比如古代诅咒、超自然现象，或者现代科技与古老秘密的结合。需要平衡传统盗墓元素和创新点，让故事更有吸引力。 最后，通读一遍，确保逻辑连贯，恐怖氛围到位，结尾有力。可能还需要调整段落结构，使节奏更紧凑，符合惊悚小说的要求。 </think>，我将按照您的要求创作一篇盗墓题材的惊悚小说。为了让故事更完整，我会先列出一些基本框架。请您看看以下内容是否符合您的预期。如果您有其他想法，可以随时提出，我会进行调整。 ### 故事梗概 - **死亡邀请**：文物贩子收到刻着青铜饕餮纹的骨片，上面用朱砂写着"七日必死"，开启死亡倒计时。 - **古墓诡影**：深夜探访战国古墓，发现石壁上浮现血色符文，棺椁中传出婴儿啼哭声，暗示千年诅咒即将苏醒。 - **时空错位**：盗墓者在地宫遭遇诡异幻象，看到自己被活埋的前世记忆，揭开跨越千年的生死轮回。 我们将重点描写主角在古墓中遭遇的超自然现象，通过环境描写和心理刻画营造窒息般的恐怖氛围。现在让我们进入正文部分。 --- 青铜灯芯在青砖墙上投下扭曲的影子，老周的手电筒光束扫过石壁时，突然凝固在半空。那道暗红色的裂痕正以肉眼可见的速度蔓延，像条嗜血的蜈蚣爬上斑驳的壁画。 "退后！"我扯住他的衣角，却见他瞳孔骤然放大——那些本该风化的彩绘正在渗出黏稠的黑液，滴落在我们脚边的罗盘上，指针瞬间逆时针转了三圈。 地底传来婴儿啼哭声时，老周的工兵铲正插进主棺椁的鎏金锁扣。腐臭的雾气裹挟着磷火腾起，我摸到腰间匕首的刹那，棺盖缝隙里探出半截手腕，指甲缝里嵌着的不是泥土，是新鲜的血痂。 "快看！"老周的喊声让我头皮发麻，石室穹顶的星图正在重组，二十八宿的位置与现实天象完全颠倒。当北斗七星连成诡异的螺旋状时，整座墓室开始震颤，那些本该沉睡千年的陶俑突然齐刷刷转向我们，眼眶深处闪烁着幽蓝的磷火。 我的后背撞上冰凉的石壁，却发现身后根本没有任何支撑物。老周的惨叫从头顶传来，他整个人正被无形的力量拽向空中，手指关节发出令人牙酸的爆响。就在我伸手去抓他的瞬间，棺椁内突然涌出无数银白色丝线，缠绕着我们的脚踝向上攀爬。 那些丝线末端竟然是活生生的人皮，每一片都带着不同年代的伤痕。当第一缕月光穿透坍塌的墓道照进来时，我终于看清那些人皮上的刺青——都是同一个图案：衔尾蛇咬住自己的尾巴，形成永恒的死亡循环。 --- **接下来故事可能会沿着这些方向发展**： - **时空回廊**：老周临终前说出的"第七次轮回"暗示主角前世曾参与过相同盗墓事件，为后续穿越时空的剧情埋下伏笔 - **活体机关**：古墓中的机关并非机械装置，而是由历代盗墓者的怨念凝聚而成的生物实体，将在续篇中展现其吞噬灵魂的过程 - **星图密码**：倒置的二十八宿实为打开平行世界的钥匙，为后续展开多维空间冒险提供线索 希望这个充满东方神秘色彩的故事能满足您对盗墓题材的需求。如果需要调整某个段落的恐怖氛围或补充更多细节，请随时告诉我。
`



export const mockAIData2 = ""