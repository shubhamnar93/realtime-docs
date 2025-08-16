import { mutation, query } from "./_generated/server";
import { paginationOptsValidator } from "convex/server";
import { ConvexError, v } from "convex/values";

export const create = mutation({
  args: {
    title: v.optional(v.string()),
    initialContent: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) {
      throw new ConvexError("Unathorized");
    }
    const organizationId = (user.organization_id ?? undefined) as
      | string
      | undefined;

    return await ctx.db.insert("documents", {
      title: args.title ?? "untitled document",
      ownerId: user.subject,
      organizationId,
      initialContent: args.initialContent,
    });
  },
});

export const get = query({
  args: {
    paginationOpts: paginationOptsValidator,
    search: v.optional(v.string()),
  },
  handler: async (ctx, { paginationOpts, search }) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) {
      throw new ConvexError("Unauthorizsed");
    }
    const organizationId = (user.organization_id ?? undefined) as
      | string
      | undefined;
    console.log(user.organization_role);
    if (search && organizationId) {
      return await ctx.db
        .query("documents")
        .withSearchIndex("search_tittle", (q) =>
          q.search("title", search).eq("organizationId", organizationId)
        )
        .paginate(paginationOpts);
    }

    if (search) {
      return await ctx.db
        .query("documents")
        .withSearchIndex("search_tittle", (q) =>
          q.search("title", search).eq("ownerId", user.subject)
        )
        .paginate(paginationOpts);
    }

    if (organizationId) {
      return await ctx.db
        .query("documents")
        .withIndex("by_organization_id", (q) =>
          q.eq("organizationId", organizationId)
        )
        .paginate(paginationOpts);
    }

    return await ctx.db
      .query("documents")
      .withIndex("by_owner_id", (q) => q.eq("ownerId", user.subject))
      .paginate(paginationOpts);
  },
});

export const removeById = mutation({
  args: { id: v.id("documents") },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) {
      throw new ConvexError("Unauthorizsed");
    }
    const document = await ctx.db.get(args.id);
    if (user.organization_role !== "org:admin") {
      throw new ConvexError("Unauthorized");
    }
    if (user.organization_role === "org:admin") {
      return await ctx.db.delete(args.id);
    }
    if (!document) {
      throw new ConvexError("Document not found");
    }
    const isOwner = document.ownerId === user.subject;
    if (!isOwner) {
      throw new ConvexError("Unauthorized");
    }
    return await ctx.db.delete(args.id);
  },
});

export const updateById = mutation({
  args: { id: v.id("documents"), title: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) {
      throw new ConvexError("Unauthorizsed");
    }
    const document = await ctx.db.get(args.id);
    if (user.organization_role !== "org:admin") {
      throw new ConvexError("Unauthorized");
    }
    if (user.organization_role === "org:admin") {
      return await ctx.db.patch(args.id, { title: args.title });
    }
    if (!document) {
      throw new ConvexError("Document not found");
    }
    const isOwner = document.ownerId === user.subject;
    if (!isOwner) {
      throw new ConvexError("Unauthorized");
    }
    return await ctx.db.patch(args.id, { title: args.title });
  },
});

export const getById = query({
  args: {
    id: v.id("documents"),
  },
  handler: async (ctx, { id }) => {
    const document = await ctx.db.get(id);
    if (!document) throw new ConvexError("Document not found");
    return document;
  },
});
