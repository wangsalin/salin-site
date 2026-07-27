# 餐饮大众点评美团差评得体抚慰 Agent 多文件技能包 (v1.2.0)

## 文件目录结构
- `skill.json`: 技能主配置文件与参数定义
- `prompts/system_prompt.md`: 主系统 Prompt 与多少样本示范
- `prompts/sentiment_classifier.md`: 情绪分析与负面因子抽取子 Prompt
- `prompts/compensation_rules.md`: 代金券与到店补偿匹配规则
- `tools/keyword_extractor.py`: 菜品与服务动作关键词提取 Python 脚本
- `tools/reply_formatter.js`: 格式化输出与字数拦截 JS 校验器
- `evals/test_reviews.json`: 20 组真实大众点评/美团差评测试集

## 导入与使用方式
1. **Dify / Coze**: 导入 `skill.json`，并将 `prompts/system_prompt.md` 贴入系统 Prompt。
2. **OpenAI / LangChain**: 直接加载本文件夹作为 Agent 工具库。
