# ===== 阶段一：依赖安装 =====
FROM node:22-alpine AS deps
WORKDIR /app

# 安装 libc6-compat（Alpine 兼容性依赖）
RUN apk add --no-cache libc6-compat

# 优先拷贝 lock 文件，充分利用缓存层
COPY package.json package-lock.json ./

RUN npm ci --omit=dev=false


# ===== 阶段二：构建 =====
FROM node:22-alpine AS builder
WORKDIR /app

# 从 deps 阶段复制 node_modules
COPY --from=deps /app/node_modules ./node_modules

# 复制全部源码
COPY . .

# 构建时注入环境变量（构建期使用，非运行时）
ARG NEXT_PUBLIC_SITE_URL=http://localhost:3300
ENV NEXT_PUBLIC_SITE_URL=${NEXT_PUBLIC_SITE_URL}

# 关闭 Next.js 遥测
ENV NEXT_TELEMETRY_DISABLED=1

# 启用 standalone 输出，减小镜像体积
RUN npm run build


# ===== 阶段三：生产运行 =====
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# 创建非 root 用户，提高安全性
RUN addgroup --system --gid 1001 nodejs \
 && adduser  --system --uid 1001 nextjs

# 复制静态资源
COPY --from=builder /app/public ./public

# 复制 standalone 产物（Next.js standalone 模式）
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3300

ENV PORT=3300
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
