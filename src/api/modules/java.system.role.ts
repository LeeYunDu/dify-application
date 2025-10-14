/**
 * java system role apis
 */
import { PromiseRo } from '@/typings/params'
import request from '../request'
import { ApiProxy } from '@/config'
const prefix = ApiProxy.java.main


// 查询角色列表
export function listRoleApi (query: any): PromiseRo<any> {
  return request({
    url: prefix + '/system/role/list',
    type: 'GET',
    params: query
  })
}

// 查询角色详细
export function getRoleApi (roleId: any): PromiseRo<any> {
  return request({
    url: prefix + '/system/role/' + roleId,
    type: 'GET',
  })
}

// 新增角色
export function addRoleApi (data: any): PromiseRo<any> {
  return request({
    url: prefix + '/system/role',
    type: 'POST',
    data: data
  })
}

// 修改角色
export function updateRoleApi (data: any): PromiseRo<any> {
  return request({
    url: prefix + '/system/role',
    type: 'PUT',
    data: data
  })
}

// 角色数据权限
export function dataScopeApi (data: any): PromiseRo<any> {
  return request({
    url: prefix + '/system/role/dataScope',
    type: 'PUT',
    data: data
  })
}

// 角色状态修改
export function changeRoleStatusApi (roleId: any, status: any): PromiseRo<any> {
  const data = {
    roleId,
    status
  }
  return request({
    url: prefix + '/system/role/changeStatus',
    type: 'PUT',
    params: data
  })
}

// 删除角色
export function delRoleApi (roleId: any): PromiseRo<any> {
  return request({
    url: prefix + '/system/role/' + roleId,
    type: 'DELETE',
  })
}

// 查询角色已授权用户列表
export function allocatedUserListApi (query: any): PromiseRo<any> {
  return request({
    url: prefix + '/system/role/authUser/allocatedList',
    type: 'GET',
    params: query
  })
}

// 查询角色未授权用户列表
export function unallocatedUserListApi (query: any): PromiseRo<any> {
  return request({
    url: prefix + '/system/role/authUser/unallocatedList',
    type: 'GET',
    params: query
  })
}

// 取消用户授权角色
export function authUserCancelApi (data: any): PromiseRo<any> {
  return request({
    url: prefix + '/system/role/authUser/cancel',
    type: 'PUT',
    data: data
  })
}

// 批量取消用户授权角色
export function authUserCancelAllApi (data: any): PromiseRo<any> {
  return request({
    url: prefix + '/system/role/authUser/cancelAll',
    type: 'PUT',
    params: data
  })
}

// 授权用户选择
export function authUserSelectAllApi (data: any): PromiseRo<any> {
  return request({
    url: prefix + '/system/role/authUser/selectAll',
    type: 'PUT',
    params: data
  })
}

// 根据角色ID查询部门树结构
export function deptTreeSelectApi (roleId: any): PromiseRo<any> {
  return request({
    url: prefix + '/system/role/deptTree/' + roleId,
    type: 'GET',
  })
}
